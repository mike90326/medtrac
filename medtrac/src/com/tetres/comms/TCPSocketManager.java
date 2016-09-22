package com.tetres.comms;

import java.net.InetAddress;
import java.util.HashMap;

public class TCPSocketManager
{
  static HashMap<InetAddress, TCPSocket> SocketList = new HashMap<InetAddress, TCPSocket>();

  public static TCPSocket gettcpsocket(InetAddress ipaddr)
  {
    TCPSocket saved_socket = (TCPSocket)SocketList.get(ipaddr);
    return saved_socket;
  }

  public static void settcpsocket(InetAddress ipaddr, TCPSocket socket) {
    SocketList.put(ipaddr, socket);
  }
}