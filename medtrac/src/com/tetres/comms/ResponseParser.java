package com.tetres.comms;

import java.io.IOException;
import java.io.StringReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class ResponseParser
{
  private static final Logger LOGGER = Logger.getLogger(ResponseParser.class.getName());

  public static ResponsePacket parseResponse(String tcppacket)
  {
    ResponsePacket parsedpacket = new ResponsePacket();
    try
    {
      DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();

      DocumentBuilder builder = builderFactory.newDocumentBuilder();

      Document xmlDocument = builder.parse(new InputSource(new StringReader(tcppacket)));

      XPath xPath = XPathFactory.newInstance().newXPath();

      String expression = "/Message/BoxID";
      String boxid = xPath.compile(expression).evaluate(xmlDocument);
      parsedpacket.setBoxid(boxid);

      expression = "/Message/Terminal";
      String terminal = xPath.compile(expression).evaluate(xmlDocument);
      parsedpacket.setTerminal(terminal);

      expression = "/Message/Response";
      String response = xPath.compile(expression).evaluate(xmlDocument);
      parsedpacket.setResponse(response);

      expression = "/Message/Status";
      String status = xPath.compile(expression).evaluate(xmlDocument);
      parsedpacket.setStatus(status);

      expression = "/Message/Measurement";

      NodeList nodeList = (NodeList)xPath.compile(expression).evaluate(xmlDocument, XPathConstants.NODESET);

      for (int i = 0; i < nodeList.getLength(); i++)
      {
        MeasurementData mdata = new MeasurementData();
        parsedpacket.measurement.add(i, mdata);

        int k = i + 1;

        String compose = "/Message/Measurement[" + k + "]";

        expression = compose + "/Type";
        String type = xPath.compile(expression).evaluate(xmlDocument);
        ((MeasurementData)parsedpacket.measurement.get(i)).setType(type);

        expression = compose + "/Count";
        String count = xPath.compile(expression).evaluate(xmlDocument);
        ((MeasurementData)parsedpacket.measurement.get(i)).setCount(count);

        expression = compose + "/Data";
        String data = xPath.compile(expression).evaluate(xmlDocument);
        ((MeasurementData)parsedpacket.measurement.get(i)).setData(data);
      }

    }
    catch (SAXException|IOException e)
    {
      e.printStackTrace();
    }
    catch (ParserConfigurationException e) {
      e.printStackTrace();
    }
    catch (XPathExpressionException e) {
      e.printStackTrace();
    }
    LOGGER.log(Level.INFO, "Return parsed packet");
    return parsedpacket;
  }
}