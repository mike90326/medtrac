package com.tetres.comms;

import java.io.IOException;
import java.io.StringWriter;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.ScheduledFuture;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class SendPackettoDev
  implements Runnable
{
  private InetAddress myipaddr;
  private int myport;
  private CommandPacket mypacket;
  private String boxid;
  private ScheduleData schedule_data;
  static HashMap<ScheduledFuture<?>, ScheduleData> scheduleList = new HashMap<ScheduledFuture<?>, ScheduleData>();

  private static SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

  public SendPackettoDev(ScheduleData schedule) {
	this.schedule_data = schedule;
    int option = 0;
    this.boxid = this.schedule_data.getBoxid();
    CommandPacket packet = new CommandPacket();
    packet.setTerminal("127.0.0.1");
    packet.setBoxID(this.boxid);
    packet.setCommand("01");
    if (this.schedule_data.getBP().equals("true")) {
      option += 1000;
    }
    if (this.schedule_data.getSpO2().equals("true")) {
      option += 100;
    }
    if (this.schedule_data.getTemperature().equals("true")) {
      option += 10;
    }
    String setoption = String.format("%04d", new Object[] { Integer.valueOf(option) });
    packet.setOption(setoption);
    try
    {
       this.myipaddr = InetAddress.getByName(((MedboxStatus)MedboxStatusManager.MedboxList.get(packet.getBoxID())).getipaddr());
    }
    catch (UnknownHostException e) {
      e.printStackTrace();
    }

    this.myport = 4020;
    this.mypacket = packet;
    System.out.println("Schedule set for " + this.boxid + " at " + this.myipaddr);
  }

  public void run()
  {
    try
    {
       if (!TCPSocketManager.gettcpsocket(this.myipaddr).getconnected().equals("true")) {
       TCPConnector.TCPConnect(this.myipaddr, this.myport);
      }
    }
    catch (IOException e1)
    {
      e1.printStackTrace();
    }

    try
    {
      DocumentBuilderFactory icFactory = DocumentBuilderFactory.newInstance();

      DocumentBuilder icBuilder = icFactory.newDocumentBuilder();

      Document doc = icBuilder.newDocument();
      Element RootElement = doc.createElement("Message");
      doc.appendChild(RootElement);

      RootElement.appendChild(getMessageElements(doc, RootElement, "Terminal", this.mypacket.getTerminal()));
      RootElement.appendChild(getMessageElements(doc, RootElement, "BoxID", this.mypacket.getBoxID()));
      RootElement.appendChild(getMessageElements(doc, RootElement, "Command", this.mypacket.getCommand()));
      RootElement.appendChild(getMessageElements(doc, RootElement, "Option", this.mypacket.getOption()));

      Transformer transformer = TransformerFactory.newInstance().newTransformer();
      transformer.setOutputProperty("indent", "yes");
      transformer.setOutputProperty("omit-xml-declaration", "yes");
      DOMSource source = new DOMSource(doc);
      StreamResult console = new StreamResult(new StringWriter());
      System.out.println(console);
      transformer.transform(source, console);

      System.out.println("\nXML DOM Created Successfully..");

      String xmlString = console.getWriter().toString();
      System.out.println("TCP Sending to " + this.myipaddr.toString() + System.lineSeparator() + xmlString);

      Date currentDatetime = new Date(System.currentTimeMillis() + 10000L);
      ReceivefromDev.setDatetime(dateformat.format(currentDatetime));
      TCPConnector.TCPSend(this.myipaddr, xmlString);

      TCPConnector.TCPReceive(this.myipaddr);
    }
    catch (ParserConfigurationException e)
    {
      e.printStackTrace();
    }
    catch (TransformerConfigurationException e) {
      e.printStackTrace();
    }
    catch (TransformerFactoryConfigurationError e) {
      e.printStackTrace();
    }
    catch (TransformerException e) {
      e.printStackTrace();
    }
    catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void setSchedule(ScheduledFuture<?> sfHandle, ScheduleData schedule)
  {
	    scheduleList.put(sfHandle, schedule);
  }

  public static void SendPacket(CommandPacket packet, InetAddress ipaddr, int port) throws UnknownHostException, IOException
  {
	    int timeout = 3000;

  if (TCPConnector.tcpConnectTimeout(ipaddr, port, timeout))
  {
      try
      {
        DocumentBuilderFactory icFactory = DocumentBuilderFactory.newInstance();

        DocumentBuilder icBuilder = icFactory.newDocumentBuilder();

        Document doc = icBuilder.newDocument();
        Element RootElement = doc.createElement("Message");
        doc.appendChild(RootElement);

        RootElement.appendChild(getMessageElements(doc, RootElement, "Terminal", packet.getTerminal()));
        RootElement.appendChild(getMessageElements(doc, RootElement, "BoxID", packet.getBoxID()));
        RootElement.appendChild(getMessageElements(doc, RootElement, "Command", packet.getCommand()));
        RootElement.appendChild(getMessageElements(doc, RootElement, "Option", packet.getOption()));

        Transformer transformer = TransformerFactory.newInstance().newTransformer();
        transformer.setOutputProperty("indent", "yes");
        transformer.setOutputProperty("omit-xml-declaration", "yes");
        DOMSource source = new DOMSource(doc);
        StreamResult console = new StreamResult(new StringWriter());
        System.out.println(console);
        transformer.transform(source, console);

        System.out.println("\nXML DOM Created Successfully..");

        String xmlString = console.getWriter().toString();
        System.out.println("TCP Sending to " + ipaddr.toString() + System.lineSeparator() + xmlString);

        Date currentDatetime = new Date(System.currentTimeMillis() + 10000L);

        ReceivefromDev.setDatetime(dateformat.format(currentDatetime));
        TCPConnector.TCPSend(ipaddr, xmlString);

        TCPConnector.TCPReceive(ipaddr);
      }
      catch (ParserConfigurationException e)
      {
        e.printStackTrace();
      }
      catch (TransformerConfigurationException e) {
        e.printStackTrace();
      }
      catch (TransformerFactoryConfigurationError e) {
        e.printStackTrace();
      }
      catch (TransformerException e) {
        e.printStackTrace();
      }
    }
  }

  private static Node getMessageElements(Document doc, Element element, String name, String value)
  {
    Element node = doc.createElement(name);
    node.appendChild(doc.createTextNode(value));
    return node;
  }
}