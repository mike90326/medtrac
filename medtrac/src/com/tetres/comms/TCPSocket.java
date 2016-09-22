package com.tetres.comms;

import java.net.Socket;

public class TCPSocket
{
  private Socket socket;
  private String connected;

  public Socket getsocket()
  {
    return this.socket;
  }

  public void setsocket(Socket new_socket) {
    this.socket = new_socket;
  }

  public String getconnected() {
    return this.connected;
  }

  public void setconnected(String new_connected) {
    this.connected = new_connected;
  }
}