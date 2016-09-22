	package com.tetres.comms;

import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Path("/manualmonitor/")
public class ManualMonitorResource
{
  private static final Logger LOGGER = Logger.getLogger(ManualMonitorResource.class.getName());

  @GET
  @Produces({"text/html"})
  public String setManualMonitor(@QueryParam("room") String room)
  {
    String terminal = GetPublicIP();
    int port = 4020;
    StringBuilder sb = new StringBuilder();

    if (room.equals("1")) {
      CommandPacket rm1_985 = new CommandPacket();
      rm1_985.setTerminal(terminal);
      rm1_985.setBoxID("40a36bc10566");
      rm1_985.setCommand("01");
      rm1_985.setOption("1110");
      try {
        InetAddress ipaddr_985 = InetAddress.getByName("10.10.221.102");
        ManualSendtoDev.SendPacket(rm1_985, ipaddr_985, port);
      } catch (UnknownHostException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) 10.10.221.102 not found!");
      }
      catch (IOException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) Cannot send command to 10.10.221.102!");
        sb.append("(10.10.221.102) Bed 985 Comms Error!\r\n");
      }

      CommandPacket rm1_990 = new CommandPacket();
      rm1_990.setTerminal(terminal);
      rm1_990.setBoxID("40a36bc1055b");
      rm1_990.setCommand("01");
      rm1_990.setOption("1110");
      try {
        InetAddress ipaddr_990 = InetAddress.getByName("10.10.221.103");
        ManualSendtoDev.SendPacket(rm1_990, ipaddr_990, port);
      } catch (UnknownHostException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) 10.10.221.103 not found!");
      }
      catch (IOException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) Cannot send command to 10.10.221.103!");
        sb.append("(10.10.221.103) Bed 990 Comms Error!\r\n");
      }

      CommandPacket rm1_977 = new CommandPacket();
      rm1_977.setTerminal(terminal);
      rm1_977.setBoxID("40a36bc10567");
      rm1_977.setCommand("01");
      rm1_977.setOption("1110");
      try {
        InetAddress ipaddr_977 = InetAddress.getByName("10.10.221.104");
        ManualSendtoDev.SendPacket(rm1_977, ipaddr_977, port);
      } catch (UnknownHostException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) 10.10.221.104 not found!");
      }
      catch (IOException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) Cannot send command to 10.10.221.104!");
        sb.append("(10.10.221.104) Bed 977 Comms Error!\r\n");
      }

      CommandPacket rm1_980 = new CommandPacket();
      rm1_980.setTerminal(terminal);
      rm1_980.setBoxID("40a36bc10568");
      rm1_980.setCommand("01");
      rm1_980.setOption("1110");
      try {
        InetAddress ipaddr_980 = InetAddress.getByName("10.10.221.105");
        ManualSendtoDev.SendPacket(rm1_980, ipaddr_980, port);
      } catch (UnknownHostException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) 10.10.221.105 not found!");
      }
      catch (IOException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) Cannot send command to 10.10.221.105!");
        sb.append("(10.10.221.105) Bed 980 Comms Error!\r\n");
      }

      CommandPacket rm1_988 = new CommandPacket();
      rm1_988.setTerminal(terminal);
      rm1_988.setBoxID("40a36bc10568");
      rm1_988.setCommand("01");
      rm1_988.setOption("1110");
      try {
        InetAddress ipaddr_988 = InetAddress.getByName("10.10.221.106");
        ManualSendtoDev.SendPacket(rm1_988, ipaddr_988, port);
      } catch (UnknownHostException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) 10.10.221.106 not found!");
      }
      catch (IOException e) {
        LOGGER.log(Level.INFO, "(ManualMonitorResource) Cannot send command to 10.10.221.106!");
        sb.append("(10.10.221.106) Bed 988 Comms Error!\r\n");
      }
    }
    if (sb.length() > 0) {
      return sb.toString();
    }

    return "Room " + room + " All Commands Sent";
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