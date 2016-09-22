package com.tetres.comms;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;
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

public class ManualSendtoDev
  implements Runnable
{
  private InetAddress myipaddr;
  private int myport;
  private CommandPacket mypacket;
  private String boxid;
  private ScheduleData schedule_data;
  static HashMap<ScheduledFuture<?>, ScheduleData> scheduleList = new HashMap<ScheduledFuture<?>, ScheduleData>();
  private static final Logger LOGGER = Logger.getLogger(ManualSendtoDev.class.getName());
  private static SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

  public ManualSendtoDev(ScheduleData schedule) {
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
      if (this.boxid.equals("40a36bc10566")) {
        this.myipaddr = InetAddress.getByName("10.10.221.102");
      }
      else if (this.boxid.equals("40a36bc1055b")) {
        this.myipaddr = InetAddress.getByName("10.10.221.103");
      }
      else if (this.boxid.equals("40a36bc10567")) {
        this.myipaddr = InetAddress.getByName("10.10.221.104");
      }
      else if (this.boxid.equals("40a36bc10568")) {
        this.myipaddr = InetAddress.getByName("10.10.221.105");
      }
      else if (this.boxid.equals("40a36bc1055a")) {
        this.myipaddr = InetAddress.getByName("10.10.221.106");
      }
    }
    catch (UnknownHostException e)
    {
      LOGGER.log(Level.INFO, "(ManualSendtoDev) InetAddress for " + this.boxid + " not found!");
    }

    this.myport = 4020;
    this.mypacket = packet;
    LOGGER.log(Level.INFO, "(ManualSendtoDev) Schedule set for " + this.boxid + " at " + this.myipaddr);
  }

  public void run()
  {
    try
    {
      if (!TCPSocketManager.gettcpsocket(this.myipaddr).getconnected().equals("true")) {
        manualTCPConnect(this.myipaddr, this.myport);
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

      transformer.transform(source, console);

      String xmlString = console.getWriter().toString();

      Date currentDatetime = new Date(System.currentTimeMillis() + 10000L);
      ManualReceivefromDev.setDatetime(dateformat.format(currentDatetime));
      manualTCPSend(this.myipaddr, xmlString);

      manualTCPReceive(this.myipaddr);
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
    manualTCPConnect(ipaddr, port);
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

      transformer.transform(source, console);

      String xmlString = console.getWriter().toString();
      LOGGER.log(Level.INFO, "(ManualSendtoDev) TCP Sending to " + ipaddr.toString() + System.lineSeparator() + xmlString);

      Date currentDatetime = new Date(System.currentTimeMillis() + 10000L);

      ManualReceivefromDev.setDatetime(dateformat.format(currentDatetime));
      manualTCPSend(ipaddr, xmlString);

      manualTCPReceive(ipaddr);
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

  private static Node getMessageElements(Document doc, Element element, String name, String value)
  {
    Element node = doc.createElement(name);
    node.appendChild(doc.createTextNode(value));
    return node;
  }

  public static void manualTCPConnect(InetAddress ipaddr, int port) throws UnknownHostException, IOException {
    int timeout = 3000;

    Socket socket = null;
    TCPSocket tcpsocket = null;

    socket = new Socket();
    tcpsocket = new TCPSocket();
    socket.connect(new InetSocketAddress(ipaddr, port), timeout);

    tcpsocket.setsocket(socket);
    tcpsocket.setconnected("true");
    TCPSocketManager.settcpsocket(ipaddr, tcpsocket);
    LOGGER.log(Level.INFO, "(ManualSendtoDev) IP Address: " + ipaddr.toString() + " connected with socket: " + socket.toString());
  }

  public static void manualTCPSend(InetAddress ipaddr, String message) throws IOException {
    Socket socket = TCPSocketManager.gettcpsocket(ipaddr).getsocket();
    PrintWriter send = new PrintWriter(socket.getOutputStream(), true);
    send.println(message);
    LOGGER.log(Level.INFO, "(ManualSendtoDev) IP Address: " + ipaddr.toString() + " sending to socket: " + socket.toString() + "/n" + message);
  }

  public static void manualTCPReceive(InetAddress ipaddr) throws IOException
  {
    ManualTCPListener listener = new ManualTCPListener();
    Socket socket = TCPSocketManager.gettcpsocket(ipaddr).getsocket();
    ManualTCPListener.setSocket(socket);
    Thread thread = new Thread(listener);
    thread.start();
    LOGGER.log(Level.INFO, "(ManualSendtoDev) IP Address: " + ipaddr.toString() + " listening to socket" + socket.toString());
  }

  public static void manualTCPDisconnect(InetAddress ipaddr) throws IOException
  {
    Socket socket = TCPSocketManager.gettcpsocket(ipaddr).getsocket();
    socket.close();
    TCPSocketManager.gettcpsocket(ipaddr).setconnected("false");
    LOGGER.log(Level.INFO, "(ManualSendtoDev) IP Address: " + ipaddr.toString() + " disconnected with socket: " + socket.toString());
  }
}