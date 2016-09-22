package com.tetres.comms;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.InetAddress;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
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

@ServerEndpoint("/send")
public class SendtoDev
{
  private static final Logger LOGGER = Logger.getLogger(SendtoDev.class.getName());

  @OnOpen
  public void onOpen(Session session) {
    LOGGER.log(Level.INFO, "(SendtoDev)New connection with client: {0}", session.getId());
  }

  @OnMessage
  public void onMessage(String message, Session session) throws IOException, EncodeException
  {
    LOGGER.log(Level.INFO, "(SendtoDev)New message from Client [{0}]: {1}", new Object[] { session.getId(), message });

    System.out.println("SendtoDev: Incoming Message" + message);

    JsonObject jsonObject = Json.createReader(new StringReader(message)).readObject();

    if ("connect".equals(jsonObject.getString("TCPState"))) {
      InetAddress deviceIP = InetAddress.getByName(jsonObject.getString("BoxIPAddr"));
      int devicePort = Integer.parseInt(jsonObject.getString("BoxPort"));
      TCPConnector.TCPConnect(deviceIP, devicePort);
    }
    else if ("disconnect".equals(jsonObject.getString("TCPState"))) {
      InetAddress deviceIP = InetAddress.getByName(jsonObject.getString("BoxIPAddr"));
      TCPConnector.TCPDisconnect(deviceIP);
    }
    else if ("send".equals(jsonObject.getString("TCPState"))) {
      InetAddress deviceIP = InetAddress.getByName(jsonObject.getString("BoxIPAddr"));
      try
      {
        DocumentBuilderFactory icFactory = DocumentBuilderFactory.newInstance();

        String terminal = jsonObject.getString("Terminal");
        String boxid = jsonObject.getString("BoxID");
        String command = jsonObject.getString("Command");
        String option = jsonObject.getString("Option");
        DocumentBuilder icBuilder = icFactory.newDocumentBuilder();

        Document doc = icBuilder.newDocument();
        Element RootElement = doc.createElement("Message");
        doc.appendChild(RootElement);

        RootElement.appendChild(getMessageElements(doc, RootElement, "Terminal", terminal));
        RootElement.appendChild(getMessageElements(doc, RootElement, "BoxID", boxid));
        RootElement.appendChild(getMessageElements(doc, RootElement, "Command", command));
        RootElement.appendChild(getMessageElements(doc, RootElement, "Option", option));

        Transformer transformer = TransformerFactory.newInstance().newTransformer();
        transformer.setOutputProperty("indent", "yes");
        transformer.setOutputProperty("omit-xml-declaration", "yes");
        DOMSource source = new DOMSource(doc);
        StreamResult console = new StreamResult(new StringWriter());
        System.out.println(console);
        transformer.transform(source, console);

        System.out.println("\nXML DOM Created Successfully..");

        String xmlString = console.getWriter().toString();
        System.out.println("TCP Sending to " + deviceIP.toString() + System.lineSeparator() + xmlString);
        TCPConnector.TCPSend(deviceIP, xmlString);

        TCPConnector.TCPReceive(deviceIP);
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

  @OnClose
  public void onClose(Session session) {
    LOGGER.log(Level.INFO, "(SendtoDev)Close connection for client: {0}", 
      session.getId());
  }

  @OnError
  public void onError(Throwable exception, Session session) {
    LOGGER.log(Level.INFO, "(SendtoDev)Error for client: {0}", session.getId());
  }

  private static Node getMessageElements(Document doc, Element element, String name, String value)
  {
    Element node = doc.createElement(name);
    node.appendChild(doc.createTextNode(value));
    return node;
  }
}