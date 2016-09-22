package com.tetres.comms;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TCPConnector
{
  private static final Logger LOGGER = Logger.getLogger(TCPConnector.class.getName());

  public static void TCPConnect(InetAddress ipaddr, int port) throws UnknownHostException, IOException {
    int serverPort = port;
    Socket socket = new Socket(ipaddr, serverPort);
    TCPSocket tcpsocket = new TCPSocket();
    tcpsocket.setsocket(socket);
    tcpsocket.setconnected("true");
    TCPSocketManager.settcpsocket(ipaddr, tcpsocket);
    LOGGER.log(Level.INFO, "(TCPConnector) IP Address: " + ipaddr.toString() + " connected with socket: " + socket.toString());
  }

  public static void TCPDisconnect(InetAddress ipaddr) throws IOException
  {
    Socket socket = TCPSocketManager.gettcpsocket(ipaddr).getsocket();
    socket.close();
    TCPSocketManager.gettcpsocket(ipaddr).setconnected("false");
    LOGGER.log(Level.INFO, "(TCPConnector) IP Address: " + ipaddr.toString() + " disconnected with socket: " + socket.toString());
  }

  public static void TCPSend(InetAddress ipaddr, String message) throws IOException {
    Socket socket = TCPSocketManager.gettcpsocket(ipaddr).getsocket();
    PrintWriter send = new PrintWriter(socket.getOutputStream(), true);
    send.println(message);
    LOGGER.log(Level.INFO, "(TCPConnector) IP Address: " + ipaddr.toString() + " sending to socket: " + socket.toString() + "/n" + message);
  }

  public static void TCPReceive(InetAddress ipaddr) throws IOException
  {
    TCPListener listener = new TCPListener();
    Socket socket = TCPSocketManager.gettcpsocket(ipaddr).getsocket();
    TCPListener.setSocket(socket);
    Thread thread = new Thread(listener);
    thread.start();
    LOGGER.log(Level.INFO, "(TCPConnector) IP Address: " + ipaddr.toString() + " listening to socket" + socket.toString());
  }

  public static boolean tcpConnectTimeout(InetAddress ipaddr, int port, int timeout) throws IOException {
    int serverPort = port;
    Socket socket = null;
    TCPSocket tcpsocket = null;
    try
    {
      socket = new Socket();
      tcpsocket = new TCPSocket();
      socket.connect(new InetSocketAddress(ipaddr, serverPort), timeout);
    } catch (SocketTimeoutException ste) {
      System.out.println("SocketTimeoutException");
      socket.close();
      return false;
    } catch (IOException e) {
      System.out.println("IOException");
      socket.close();
      return false;
    }

    tcpsocket.setsocket(socket);
    tcpsocket.setconnected("true");
    TCPSocketManager.settcpsocket(ipaddr, tcpsocket);
    LOGGER.log(Level.INFO, "(TCPConnector) Connect Once IP Address: " + ipaddr.toString() + " connected with socket: " + socket.toString());
    return true;
  }

  public static String TCPReceiveOnce(InetAddress ipaddr, int timeout) throws IOException, URISyntaxException {
    Socket socket = TCPSocketManager.gettcpsocket(ipaddr).getsocket();
    TCPListener.setSocket(socket);
    socket.setSoTimeout(timeout);
    String result = TCPListener.runOnce(timeout);
    LOGGER.log(Level.INFO, "(TCPConnector) Receive Once IP Address: " + ipaddr.toString() + " listening once to socket: " + socket.toString());
    return result;
  }
}