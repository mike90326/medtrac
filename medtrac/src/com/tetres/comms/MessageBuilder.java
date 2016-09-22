package com.tetres.comms;

import java.io.StringWriter;
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

public class MessageBuilder
{
  public static String CommandMessage(String terminal, String boxid, String command, String option)
  {
    String xmlString = "";
    try
    {
      DocumentBuilderFactory icFactory = DocumentBuilderFactory.newInstance();

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

      xmlString = console.getWriter().toString();
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

    return xmlString;
  }

  private static Node getMessageElements(Document doc, Element element, String name, String value)
  {
    Element node = doc.createElement(name);
    node.appendChild(doc.createTextNode(value));
    return node;
  }
}