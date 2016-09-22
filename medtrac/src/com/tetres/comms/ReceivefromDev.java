package com.tetres.comms;

import java.io.IOException;
import java.net.InetAddress;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.BitSet;
import java.util.Collections;
import java.util.Date;
import java.util.DoubleSummaryStatistics;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/receive", encoders={ProcessedPacketEncoder.class})
public class ReceivefromDev
{
  private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
  private static final Logger LOGGER = Logger.getLogger(ReceivefromDev.class.getName());
  private static final int bitsInOneCharValue = 4;
  private static final int HEX_RADIX = 16;
  private static final double tempOffset = 0;
  private static final String retryInterval = "5";
  private static final int numOfRetries = 1;
  private static final int retryDelay = 2;
  private static SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
  private InetAddress ipaddr;
  private static String mydatetime;
public static List<ScheduleData> scheduled = new ArrayList<ScheduleData>();
  private static List<ConsolidatedPacket> consolidated = new ArrayList<ConsolidatedPacket>();

  @OnOpen
  public void onOpen(Session session) {
    LOGGER.log(Level.INFO, "(ReceivefromDev) New connection with client: {0}", session.getId());
    clients.add(session);
  }

  @OnMessage
  public void onMessage(String message, Session session) throws IOException {
    LOGGER.log(Level.INFO, "(ReceivefromDev)New message from Client [{0}]: {1}", new Object[] { session.getId(), message });

    if ((message.startsWith("<Message>")) && (message.endsWith("</Message>")) && (countStringOccurrences(message, "<Message>") == numOfRetries)) {
      ResponsePacket response = ResponseParser.parseResponse(message);
      ConsolidatedPacket newproc = new ConsolidatedPacket();
      String medboxId = response.getBoxid();
      int cindex = 0;
      boolean match = false;

      if (consolidated.size() == 0) {
        consolidated.add(newproc);
        newproc.setBoxid(medboxId);
        newproc.setStartdatetime(mydatetime);
        newproc.setOrgDateTime(mydatetime);
      }
      else
      {
        for (int m = 0; m < consolidated.size(); m++)
        {
          if ((((ConsolidatedPacket)consolidated.get(m)).getBoxid().equals(medboxId)) && (((ConsolidatedPacket)consolidated.get(m)).getRetryCount() > 0)) {
            System.out.println("Retry found in consolidated list");

            mydatetime = ((ConsolidatedPacket)consolidated.get(m)).getStartdatetime();
          }

          if ((((ConsolidatedPacket)consolidated.get(m)).getBoxid().equals(medboxId)) && (((ConsolidatedPacket)consolidated.get(m)).getStartdatetime().equals(mydatetime)))
          {
            System.out.println("Found a match!");
            cindex = m;
            match = true;
          }
        }

        if (!match)
        {
          System.out.println("No match! Adding new entry");
          consolidated.add(newproc);
          newproc.setBoxid(medboxId);
          newproc.setStartdatetime(mydatetime);
          newproc.setOrgDateTime(mydatetime);
        }
      }

      ProcessedPacket processed = new ProcessedPacket();
      processed.setBoxid(medboxId);
      processed.setStartdatetime(mydatetime);
      processed.setBPhigh("waiting");
      processed.setBPlow("waiting");
      processed.setPulse("waiting");
      processed.setSpO2("waiting");
      processed.setTemperature("waiting");

      for (int k = 0; k < scheduled.size(); k++) {
        if (((ScheduleData)scheduled.get(k)).getBoxid().equals(medboxId)) {
          if (((ScheduleData)scheduled.get(k)).getBP().equals("false")) {
            System.out.println("BP is false");
            processed.setBPhigh("NA");
            processed.setBPlow("NA");
          }
          if (((ScheduleData)scheduled.get(k)).getSpO2().equals("false")) {
            System.out.println("SpO2 is false");
            processed.setPulse("NA");
            processed.setSpO2("NA");
          }
          if (((ScheduleData)scheduled.get(k)).getTemperature().equals("false")) {
            System.out.println("Temperature is false");
            processed.setTemperature("NA");
          }
        }

      }

      if (response.measurement.size() < 1) {
        if (!match) {
          System.out.println("Not matching from command loaded");

          if ((!processed.getBPhigh().equals("NA")) || (!processed.getBPlow().equals("NA"))) {
            if (response.getStatus().substring(0, 1).equals("2")) {
              System.out.println("BP not connected!");
              processed.setBPlow("Error");
              processed.setBPhigh("Error");
            }
            else {
              processed.setBPhigh("starting");
              processed.setBPlow("starting");
            }
          }
          if ((!processed.getPulse().equals("NA")) || (!processed.getSpO2().equals("NA"))) {
            if (response.getStatus().substring(1, 2).equals("2")) {
              System.out.println("O2 not connected!");
              processed.setPulse("Error");
              processed.setSpO2("Error");
            }
            else {
              processed.setPulse("starting");
              processed.setSpO2("starting");
            }
          }
          if (!processed.getTemperature().equals("NA")) {
            if (response.getStatus().substring(2, 3).equals("2")) {
              System.out.println("Temperature not connected!");
              processed.setTemperature("Error");
            }
            else {
              processed.setTemperature("starting");
            }
          }
        }
        else
        {
          System.out.println("Matching from command loaded");
          if (!((ConsolidatedPacket)consolidated.get(cindex)).getBPRetry()) {
            processed.setBPhigh(((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh());
            processed.setBPlow(((ConsolidatedPacket)consolidated.get(cindex)).getBPlow());
          }
          else {
            processed.setBPhigh("starting");
            processed.setBPlow("starting");
          }
          if (!((ConsolidatedPacket)consolidated.get(cindex)).getSPO2Retry()) {
            processed.setPulse(((ConsolidatedPacket)consolidated.get(cindex)).getPulse());
            processed.setSpO2(((ConsolidatedPacket)consolidated.get(cindex)).getSpO2());
          }
          else {
            processed.setPulse("starting");
            processed.setSpO2("starting");
          }
          if (!((ConsolidatedPacket)consolidated.get(cindex)).getTempRetry()) {
            processed.setTemperature(((ConsolidatedPacket)consolidated.get(cindex)).getTemperature());
          }
          else {
            processed.setTemperature("starting");
          }
        }
      }
      else {
        for (int i = 0; i < response.measurement.size(); i++)
        {
          int count = Integer.parseInt(((MeasurementData)response.measurement.get(i)).getCount(), HEX_RADIX);
          int dataLength = ((MeasurementData)response.measurement.get(i)).getData().length();
          LOGGER.log(Level.INFO, "(ReceivefromDev) Count in Measurement: {0}", String.valueOf(count));
          LOGGER.log(Level.INFO, "(ReceivefromDev) Data Length of Measurement: {0}", String.valueOf(dataLength));
          if (count != dataLength)
          {
            LOGGER.log(Level.WARNING, "(ReceivefromDev) Count and Data Length Mismatch!");
          }

          if (((MeasurementData)response.measurement.get(i)).getType().equals("0")) {
            String bpData = ((MeasurementData)response.measurement.get(i)).getData();

            if (dataLength == retryDelay) {
              if (bpData == "00") {
                System.out.println("Invalid Pulse");
              }
              else if (bpData == "01") {
                System.out.println("Not secured properly");
              }
              else if (bpData == "02") {
                System.out.println("Data collection error");
              }
              else if (bpData == "03") {
                System.out.println("Overload Protection");
              }
              else if (bpData == "04") {
                System.out.println("Interrupted Measurement");
              }
              processed.setBPlow("Error");
              processed.setBPhigh("Error");
            }
            else if (dataLength == 10) {
              String bpHigh = String.valueOf(Integer.parseInt(bpData.substring(2, 4), HEX_RADIX));
              String bpLow = String.valueOf(Integer.parseInt(bpData.substring(6, 8), HEX_RADIX));
              String bpBeat = String.valueOf(Integer.parseInt(bpData.substring(8), HEX_RADIX));
              LOGGER.log(Level.FINE, "(ReceivefromDev) BP Systolic: {0}", bpHigh);
              LOGGER.log(Level.FINE, "(ReceivefromDev) BP Diastolic: {0}", bpLow);
              LOGGER.log(Level.FINE, "(ReceivefromDev) BP Heart Rate: {0}", bpBeat);
              processed.setBPlow(bpLow);
              processed.setBPhigh(bpHigh);
            }

          }
          else if (((MeasurementData)response.measurement.get(i)).getType().equals("1"))
          {
            String spo2Data = ((MeasurementData)response.measurement.get(i)).getData();
            int tempPulse;
            int pulse = 1000;
            int tempO2;
            int o2 =0;

              for (int index = 0; index < spo2Data.length()-10; index += 10)
              { 
            	BitSet pulse0 = hexToBitSet(spo2Data.substring(index, index + 1));
            	BitSet pulse1 = hexToBitSet(spo2Data.substring(index + 14, index + 16));
            	BitSet pulse2 = hexToBitSet(spo2Data.substring(index + 16, index + 18));
            	if (pulse0.get(6)){
            		if (pulse1.get(6)){
            			pulse2.set(7);
            		}
            		tempPulse = Integer.parseInt(toString(pulse2));
            		if (tempPulse < pulse){
            			pulse = tempPulse;
            		}
            		tempO2 = Integer.parseInt(spo2Data.substring(index + 18, index + 20), HEX_RADIX);
            		if (tempO2 > o2){
            			o2 = tempO2;
            		}
            	} 
              }
              
              LOGGER.log(Level.FINE, "(ReceivefromDev) Pulse: {0}", String.format("%d", new Object[] {pulse}));
              processed.setPulse(String.format("%d", new Object[] {pulse}));
              LOGGER.log(Level.FINE, "(ReceivefromDev) SPO2: {0}", String.format("%d", new Object[] {o2}));
              processed.setSpO2(String.format("%d", new Object[] {o2}));
              
              if (pulse == 0){
            	  processed.setPulse("Error");
              }
              if (o2 == 0){
            	  processed.setSpO2("Error");
              }
              
              
            }

          else if (((MeasurementData)response.measurement.get(i)).getType().equals("2")) {
            String tempData = ((MeasurementData)response.measurement.get(i)).getData();
            int size = tempData.length() / bitsInOneCharValue;
            double[] tempArray = new double[size];
            int j = 0;
            double temp = 0.0D;
            for (int index = 0; index < tempData.length(); index += bitsInOneCharValue) {
              temp = Integer.parseInt(tempData.substring(index, index + bitsInOneCharValue), HEX_RADIX);
              tempArray[j] = (temp / 10.0D);
              j++;
            }
            LOGGER.log(Level.FINER, "(ReceivefromDev) Temperature Array: {0}", Arrays.toString(tempArray));
            DoubleSummaryStatistics tempStats = Arrays.stream(tempArray).summaryStatistics();
            LOGGER.log(Level.FINE, "(ReceivefromDev) Average Temperature: {0}", String.format("%.1f", new Object[] { Double.valueOf(tempStats.getAverage()) }));
            double offsetTemp = tempStats.getAverage() + tempOffset;
            LOGGER.log(Level.FINE, "(ReceivefromDev) Temperature after offset: {0}", String.format("%.1f", new Object[] { Double.valueOf(offsetTemp) }));
            processed.setTemperature(String.format("%.1f", new Object[] { Double.valueOf(offsetTemp) }));
          }
        }
      }

      LOGGER.log(Level.FINE, "(ReceivefromDev) Setting Processed Packet Temperature: {0}", processed.getTemperature());
      LOGGER.log(Level.FINE, "(ReceivefromDev) Setting Processed Packet BP Systolic: {0}", processed.getBPhigh());
      LOGGER.log(Level.FINE, "(ReceivefromDev) Setting Processed Packet BP Diastolic: {0}", processed.getBPlow());
      LOGGER.log(Level.FINE, "(ReceivefromDev) Setting Processed Packet Pulse: {0}", processed.getPulse());
      LOGGER.log(Level.FINE, "(ReceivefromDev) Setting Processed Packet SPO2: {0}", processed.getSpO2());

      if (match) {
        System.out.println("Match so try to set final values");

        if (((ConsolidatedPacket)consolidated.get(cindex)).getRetryCount() == 0) {
          if ((((ConsolidatedPacket)consolidated.get(cindex)).getTemperature().equals("starting")) || 
            (((ConsolidatedPacket)consolidated.get(cindex)).getTemperature().equals("waiting"))) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setTemperature(processed.getTemperature());
          }
          if ((((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh().equals("starting")) || 
            (((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh().equals("waiting"))) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setBPhigh(processed.getBPhigh());
          }
          if ((((ConsolidatedPacket)consolidated.get(cindex)).getBPlow().equals("starting")) || 
            (((ConsolidatedPacket)consolidated.get(cindex)).getBPlow().equals("waiting"))) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setBPlow(processed.getBPlow());
          }
          if ((((ConsolidatedPacket)consolidated.get(cindex)).getPulse().equals("starting")) || 
            (((ConsolidatedPacket)consolidated.get(cindex)).getPulse().equals("waiting"))) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setPulse(processed.getPulse());
          }
          if ((((ConsolidatedPacket)consolidated.get(cindex)).getSpO2().equals("starting")) || 
            (((ConsolidatedPacket)consolidated.get(cindex)).getSpO2().equals("waiting"))) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setSpO2(processed.getSpO2());
          }

        }
        else
        {
          if (((ConsolidatedPacket)consolidated.get(cindex)).getTempRetry()) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setTemperature(processed.getTemperature());
          }
          else {
            processed.setTemperature(((ConsolidatedPacket)consolidated.get(cindex)).getTemperature());
          }
          if (((ConsolidatedPacket)consolidated.get(cindex)).getBPRetry()) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setBPhigh(processed.getBPhigh());
            ((ConsolidatedPacket)consolidated.get(cindex)).setBPlow(processed.getBPlow());
          }
          else {
            processed.setBPhigh(((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh());
            processed.setBPlow(((ConsolidatedPacket)consolidated.get(cindex)).getBPlow());
          }
          if (((ConsolidatedPacket)consolidated.get(cindex)).getSPO2Retry()) {
            ((ConsolidatedPacket)consolidated.get(cindex)).setPulse(processed.getPulse());
            ((ConsolidatedPacket)consolidated.get(cindex)).setSpO2(processed.getSpO2());
          }
          else {
            processed.setPulse(((ConsolidatedPacket)consolidated.get(cindex)).getPulse());
            processed.setSpO2(((ConsolidatedPacket)consolidated.get(cindex)).getSpO2());
          }
        }

        System.out.println(((ConsolidatedPacket)consolidated.get(cindex)).getBoxid());
        System.out.println(((ConsolidatedPacket)consolidated.get(cindex)).getStartdatetime());
        System.out.println(((ConsolidatedPacket)consolidated.get(cindex)).getTemperature());
        System.out.println(((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh());
        System.out.println(((ConsolidatedPacket)consolidated.get(cindex)).getBPlow());
        System.out.println(((ConsolidatedPacket)consolidated.get(cindex)).getPulse());
        System.out.println(((ConsolidatedPacket)consolidated.get(cindex)).getSpO2());

        if ((!((ConsolidatedPacket)consolidated.get(cindex)).getTemperature().equals("starting")) && (!((ConsolidatedPacket)consolidated.get(cindex)).getTemperature().equals("waiting")) && 
          (!((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh().equals("starting")) && (!((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh().equals("waiting")) && 
          (!((ConsolidatedPacket)consolidated.get(cindex)).getBPlow().equals("starting")) && (!((ConsolidatedPacket)consolidated.get(cindex)).getBPlow().equals("waiting")) && 
          (!((ConsolidatedPacket)consolidated.get(cindex)).getPulse().equals("starting")) && (!((ConsolidatedPacket)consolidated.get(cindex)).getPulse().equals("waiting")) && 
          (!((ConsolidatedPacket)consolidated.get(cindex)).getSpO2().equals("starting")) && (!((ConsolidatedPacket)consolidated.get(cindex)).getSpO2().equals("waiting")))
        {
          String deviceId = ((ConsolidatedPacket)consolidated.get(cindex)).getBoxid();
          String dateTime = ((ConsolidatedPacket)consolidated.get(cindex)).getStartdatetime();
          String temp = ((ConsolidatedPacket)consolidated.get(cindex)).getTemperature();
          String bpHigh = ((ConsolidatedPacket)consolidated.get(cindex)).getBPhigh();
          String bpLow = ((ConsolidatedPacket)consolidated.get(cindex)).getBPlow();
          String pulse = ((ConsolidatedPacket)consolidated.get(cindex)).getPulse();
          String spo2 = ((ConsolidatedPacket)consolidated.get(cindex)).getSpO2();

          System.out.println("Final Values before retry block");

          if ((temp.equals("Error")) || (bpHigh.equals("Error")) || (bpLow.equals("Error")) || 
            (pulse.equals("Error")) || (spo2.equals("Error")))
          {
            System.out.println("Retry Count (after checking sensor error): " + ((ConsolidatedPacket)consolidated.get(cindex)).getRetryCount());

            if (((ConsolidatedPacket)consolidated.get(cindex)).getRetryCount() < 1)
            {
              ScheduleData retry = new ScheduleData();

              retry.setBoxid(deviceId);
              Date now = new Date();
              Date startRetry = addMinutesToDate(2, now);
              String startdatetime = dateformat.format(startRetry);
              retry.setStartdatetime(startdatetime);

              retry.setInterval(retryInterval);
              Date endRetry = addMinutesToDate(4, now);
              String enddatetime = dateformat.format(endRetry);
              retry.setEnddatetime(enddatetime);
              if ((bpHigh.equals("Error")) || (bpLow.equals("Error"))) {
                retry.setBP("true");
                ((ConsolidatedPacket)consolidated.get(cindex)).setBPRetry(true);
              }
              else {
                retry.setBP("false");
              }
              if ((pulse.equals("Error")) || (spo2.equals("Error"))) {
                retry.setSpO2("true");
                ((ConsolidatedPacket)consolidated.get(cindex)).setSPO2Retry(true);
              }
              else {
                retry.setSpO2("false");
              }
              if ((temp.equals("Error")) || (temp.equals(""))) {
                retry.setTemperature("true");
                ((ConsolidatedPacket)consolidated.get(cindex)).setTempRetry(true);
              }
              else {
                retry.setTemperature("false");
              }
              System.out.println("Setting Retry Schedule");
              RetryScheduler retrySchedule = new RetryScheduler();
              try {
                retrySchedule.SetNewSchedule(retry);
              }
              catch (InterruptedException e) {
                e.printStackTrace();
              }
              ((ConsolidatedPacket)consolidated.get(cindex)).setRetryCount(((ConsolidatedPacket)consolidated.get(cindex)).getRetryCount() + 1);
              System.out.println("Retry Count: " + ((ConsolidatedPacket)consolidated.get(cindex)).getRetryCount());
            }
            else {
              System.out.println("Final after retry");
              ((ConsolidatedPacket)consolidated.get(cindex)).setIsFinal(true);
            }
          }
          else
          {
            ((ConsolidatedPacket)consolidated.get(cindex)).setIsFinal(true);
          }
          
          if (((ConsolidatedPacket)consolidated.get(cindex)).getIsFinal()) {
            try {
              if (temp == "" || temp == "waiting"){
            	  temp = "N.A";
              }
              System.out.println("Inserting into RECORD MED_ID:" + deviceId + ", DATETIME:" + dateTime + ", TEMP:" + temp + ", BPHIGH:" + bpHigh + ", BPLOW:" + bpLow + ", PULSE:" + pulse + ", SPO2:" + spo2);
              StoreToDB.insertRecord(deviceId, dateTime, temp, bpHigh, bpLow, pulse, spo2);
              consolidated.remove(cindex);

              this.ipaddr = InetAddress.getByName(MedboxStatusManager.getMedboxStatus(medboxId).getipaddr());
              TCPConnector.TCPDisconnect(this.ipaddr);
            }
            catch (SQLException e) {
              e.printStackTrace();
            }

          }

        }

      }
      else
      {
        newproc.setTemperature(processed.getTemperature());
        newproc.setBPhigh(processed.getBPhigh());
        newproc.setBPlow(processed.getBPlow());
        newproc.setPulse(processed.getPulse());
        newproc.setSpO2(processed.getSpO2());
      }

      sendMessageToAll(processed);
    }
    else
    {
      LOGGER.log(Level.WARNING, "Malformed packet received and discarded!");
    }
  }

  @OnClose
  public void onClose(Session session) {
    LOGGER.log(Level.INFO, "(ReceivefromDev) Close connection for client: {0}", session.getId());
    clients.remove(session);
  }

  @OnError
  public void onError(Throwable exception, Session session) {
    LOGGER.log(Level.INFO, "(ReceivefromDev) Error for client: {0}", session.getId());
  }

  private void sendMessageToAll(ProcessedPacket message) {
    for (Session client : clients)
      try {
        client.getBasicRemote().sendObject(message);
      } catch (IOException ex) {
        ex.printStackTrace();
      } catch (EncodeException ex) {
        ex.printStackTrace();
      }
  }

  private static BitSet hexToBitSet(String hex)
  {
    int hexBitSize = hex.length() * bitsInOneCharValue;
    BitSet hexBitSet = new BitSet(hexBitSize);

    for (int i = 0; i < hex.length(); i++) {
      Character hexChar = Character.valueOf(hex.charAt(i));
      BitSet charBitSet = hexCharToBitSet(hexChar);
      for (int j = 0; j < bitsInOneCharValue; j++) {
        if (charBitSet.get(j)) {
          hexBitSet.set(j + (hex.length() - i - 1) * bitsInOneCharValue);
        }
      }
    }

    return hexBitSet;
  }

  private static BitSet hexCharToBitSet(Character hexChar)
  {
    BitSet charBitSet = new BitSet(bitsInOneCharValue);
    int hex = Integer.parseInt(hexChar.toString(), HEX_RADIX);

    for (int i = 0; i < bitsInOneCharValue; i++) {
      int bit = Integer.lowestOneBit(hex >> i);
      if (bit == 1) {
        charBitSet.set(i);
      }
    }
    return charBitSet;
  }

  private static String toString(BitSet bs)
  {
    return Long.toString(bs.toLongArray()[0], 2);
  }

  public static void setDatetime(String datetime)
  {
    mydatetime = datetime;
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
    LOGGER.log(Level.FINE, "(ReceivefromDev) TCP Message count: {0}", Integer.valueOf(count));
    return count;
  }

  private static Date addMinutesToDate(int minutes, Date beforeTime)
  {
    long ONE_MINUTE_IN_MILLIS = 60000L;

    long curTimeInMs = beforeTime.getTime();
    Date afterAddingMins = new Date(curTimeInMs + minutes * ONE_MINUTE_IN_MILLIS);
    return afterAddingMins;
  }
}