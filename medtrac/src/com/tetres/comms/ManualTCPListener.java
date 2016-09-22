package com.tetres.comms;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ManualTCPListener
  implements Runnable
{
  private static final Logger LOGGER = Logger.getLogger(ManualTCPListener.class.getName());
  private static Socket mysocket;
  private BufferedInputStream TCPReader;
  private static boolean socketClosed = false;
  private static String TCPResponse1;
  private static String TCPResponse2;

  public void run()
  {
    InputStream is = null;
    String TCPResponse = null;

    String mTCPResponse = null;

    long starttime = System.currentTimeMillis();
    long endtime = starttime + 240000L;
    try
    {
      is = mysocket.getInputStream();
      this.TCPReader = new BufferedInputStream(is);

      if (mysocket.isClosed()) {
        socketClosed = true;
      }
      do
      {
        try
        {
          TCPResponse = readInputStream(this.TCPReader);

          if ((TCPResponse.startsWith("<Message>")) && (TCPResponse.endsWith("</Message>"))) {
            LOGGER.log(Level.INFO, "(ManualTCPListener) TCP Response: " + TCPResponse);
            if (countStringOccurrences(TCPResponse, "<Message>") == 1) {
              InternalWSClient clientEndPoint = new InternalWSClient(new URI("ws://localhost:8080/medtrac/manualreceive"));
              clientEndPoint.sendMessage(TCPResponse);
              TCPResponse = null;
              clientEndPoint.userSession.close();
            }
            else
            {
              mTCPResponse = TCPResponse;
              InternalWSClient clientEndPoint = new InternalWSClient(new URI("ws://localhost:8080/medtrac/manualreceive"));
              for (int i = 0; i < countStringOccurrences(TCPResponse, "<Message>"); i++) {
                int firstIndex = mTCPResponse.indexOf("</Message>");
                String firstMessage = mTCPResponse.substring(0, firstIndex + 10);
                mTCPResponse = mTCPResponse.substring(firstIndex + 10);
                LOGGER.log(Level.INFO, "(ManualTCPListener) mTCP Response[" + i + "]: " + firstMessage);
                clientEndPoint.sendMessage(firstMessage);
              }
              mTCPResponse = null;
              clientEndPoint.userSession.close();
            }

          }
          else if (!TCPResponse.endsWith("</Message>")) {
            TCPResponse1 = TCPResponse;
            LOGGER.log(Level.INFO, "(ManualTCPListener) TCP Response (1): " + TCPResponse1);
          }
          else
          {
            TCPResponse2 = TCPResponse;
            LOGGER.log(Level.INFO, "(ManualTCPListener) TCP Response (2): " + TCPResponse2);

            InternalWSClient clientEndPoint = new InternalWSClient(new URI("ws://localhost:8080/medtrac/manualreceive"));
            for (int i = 0; i < countStringOccurrences(TCPResponse2, "</Message>"); i++)
            {
              int firstIndex = TCPResponse2.indexOf("</Message>");
              String firstMessage = TCPResponse2.substring(0, firstIndex + 10);
              mTCPResponse = TCPResponse1 + firstMessage;
              LOGGER.log(Level.INFO, "(ManualTCPListener) mTCP Response[" + i + "]: " + mTCPResponse);
              clientEndPoint.sendMessage(mTCPResponse);
              TCPResponse2 = TCPResponse2.substring(firstIndex + 10);
              TCPResponse1 = "";
              mTCPResponse = null;
            }

            TCPResponse1 = null;
            TCPResponse2 = null;

            clientEndPoint.userSession.close();
          }
        }
        catch (URISyntaxException e)
        {
          e.printStackTrace();
        }
        if (socketClosed) break;  } while (System.currentTimeMillis() < endtime);
    }
    catch (Exception localException)
    {
    }
  }

  public static void setSocket(Socket socket)
  {
    mysocket = socket;
  }

  public static String runOnce(int timeout)
    throws URISyntaxException
  {
    InputStream is = null;
    String TCPResponse = null;
    long starttime = System.currentTimeMillis();
    long endtime = starttime + timeout;
    try
    {
      is = mysocket.getInputStream();
      BufferedInputStream TCPReadOnce = new BufferedInputStream(is);

      while (System.currentTimeMillis() < endtime) {
        try {
          TCPResponse = readInputStream(TCPReadOnce);
        }
        catch (Exception e)
        {
          System.out.println("TCPListener read exception: " + e);
        }

        System.out.println("TCP Response: " + TCPResponse);
        if (TCPResponse.contains("Response")) {
          break;
        }
      }
      TCPReadOnce.close();
      is.close();
    }
    catch (Exception localException1)
    {
    }

    return TCPResponse;
  }

  private static String readInputStream(BufferedInputStream bis) throws IOException, InterruptedException {
    String data = "";
    int s = bis.read();
    if (s == -1)
      return null;
    data = data + (char)s;
    int len = bis.available();

    System.out.println("Len got : " + len);
    if (len > 0) {
      byte[] byteData = new byte[len];
      bis.read(byteData);
      data = data + new String(byteData);
    }
    return data;
  }

  private static int countStringOccurrences(String text, String pattern)
  {
    int count = 0;
    int i = 0;

    while ((i = text.indexOf(pattern, i)) != -1)
    {
      i += pattern.length();

      count++;
    }
    System.out.println("TCP Message count:" + count);
    return count;
  }
}