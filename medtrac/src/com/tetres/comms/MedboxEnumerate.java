package com.tetres.comms;

import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class MedboxEnumerate
{
  public static void GetMedboxStatus()
    throws UnknownHostException, IOException, URISyntaxException
  {
    int port = 4020;
    int connectTimeout = 2000;
    int readTimeout = 2000;
    List<String> boxIds = new ArrayList<String>();

    String commandMessage = MessageBuilder.CommandMessage("127.0.0.1", "000000000000", "00", "0000");
    String publicIP = GetPublicIP();
    String subnet = publicIP.substring(0, publicIP.lastIndexOf("."));

    String subnet2 = "10.10.221";
    System.out.println("subnet " + subnet2);
    for (int i = 102; i < 107; i++) {
      String host = subnet2 + "." + i;
      String boxId = null;
      System.out.println("test host " + host);
      MedboxStatus medboxStatus = new MedboxStatus();

      InetAddress ipaddr = InetAddress.getByName(host);
      if (TCPConnector.tcpConnectTimeout(ipaddr, port, connectTimeout)) {
        TCPConnector.TCPSend(ipaddr, commandMessage);
        String response = TCPConnector.TCPReceiveOnce(ipaddr, readTimeout);

        medboxStatus.setsocketStatus("NC");
        if (response != null) {
          boxId = response.substring(response.indexOf("BoxID") + 6, response.indexOf("BoxID") + 18);
          String bpSensor = response.substring(response.indexOf("Status") + 7, response.indexOf("Status") + 8);
          String o2Sensor = response.substring(response.indexOf("Status") + 8, response.indexOf("Status") + 9);
          String tempSensor = response.substring(response.indexOf("Status") + 9, response.indexOf("Status") + 10);

          medboxStatus.setipaddr(host);
          medboxStatus.setsocketStatus("OK");
          if (bpSensor.equals("1")) {
            medboxStatus.setbpSensor("OK");
          }
          else {
            medboxStatus.setbpSensor("NC");
          }
          if (o2Sensor.equals("1")) {
            medboxStatus.seto2Sensor("OK");
          }
          else {
            medboxStatus.seto2Sensor("NC");
          }
          if (tempSensor.equals("1")) {
            medboxStatus.settempSensor("OK");
          }
          else {
            medboxStatus.settempSensor("NC");
          }
        }
        MedboxStatusManager.setMedboxStatus(boxId, medboxStatus);
        boxIds.add(boxId);
        TCPConnector.TCPDisconnect(ipaddr);
      }
    }

    MedboxStatusManager.MedboxList.keySet().retainAll(boxIds);
  }

  private static String GetPublicIP()
  {
    String IP_address = "";
    int count = 0;
    try {
      Enumeration<?> interfaces = NetworkInterface.getNetworkInterfaces();
      while (interfaces.hasMoreElements())
      {
        NetworkInterface current = (NetworkInterface)interfaces.nextElement();

        if ((current.isUp()) && (!current.isLoopback()) && (!current.isVirtual())) {
          Enumeration<?> addresses = current.getInetAddresses();
          while (addresses.hasMoreElements()) {
            InetAddress current_addr = (InetAddress)addresses.nextElement();
            if ((!current_addr.isLoopbackAddress()) && 
              ((current_addr instanceof Inet4Address)) && (count == 0))
            {
              IP_address = current_addr.getHostAddress();
              System.out.println(current_addr.getHostAddress());
              count++;
              break;
            }
          }
        }
      }
    }
    catch (SocketException SE) {
      SE.printStackTrace();
    }
    return IP_address;
  }
}