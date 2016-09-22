package com.tetres.comms;

import java.io.IOException;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/schedule/")
public class ScheduleResource
{
  private static final String DB_DRIVER = "org.h2.Driver";
  private static final String DB_CONNECTION = "jdbc:h2:c:/database/medtracdb";
  private static final String DB_USER = "admin";
  private static final String DB_PASSWORD = "medtracdbsa";

  @GET
  @Produces({"application/xml"})
  public String getPatient()
    throws SQLException
  {
    Connection connection = getDBConnection();
    PreparedStatement selectPreparedStatement = null;

    StringBuilder sb = new StringBuilder();
    sb.append("<PATIENT>");

    String SelectQuery = "SELECT DISTINCT PATIENT_ID FROM PATIENT";
    try
    {
      selectPreparedStatement = connection.prepareStatement(SelectQuery);
      ResultSet rs = selectPreparedStatement.executeQuery();
      while (rs.next()) {
        sb.append("<PATIENT_ID>");
        sb.append(rs.getString("PATIENT_ID"));
        sb.append("</PATIENT_ID>");
      }
      selectPreparedStatement.close();

      connection.commit();
    }
    catch (SQLException e) {
      System.out.println("Exception Message " + e.getLocalizedMessage());
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      connection.close();
    }

    sb.append("</PATIENT>");
    System.out.println(sb.toString());
    return sb.toString();
  }
  @GET
  @Path("/active")
  @Produces({"application/xml"})
  public String getActiveSchedule() throws SQLException {
    Connection connection = getDBConnection();
    PreparedStatement selectPreparedStatement = null;

    SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    Date currentdate = new Date();
    String date = dateformat.format(currentdate);

    StringBuilder sb = new StringBuilder();
    sb.append("<ACTIVE>");

    String SelectQuery = "SELECT * FROM MEDBOX WHERE MED_DATE_END>='" + date + "'";
    try
    {
      selectPreparedStatement = connection.prepareStatement(SelectQuery);
      ResultSet rs = selectPreparedStatement.executeQuery();
      while (rs.next()) {
        sb.append("<MED_ID>");
        sb.append(rs.getString("MED_ID"));
        sb.append("</MED_ID>");
        sb.append("<PATIENT_ID>");
        sb.append(rs.getString("PATIENT_ID"));
        sb.append("</PATIENT_ID>");
        sb.append("<MED_DATE_START>");
        sb.append(rs.getString("MED_DATE_START"));
        sb.append("</MED_DATE_START>");
        sb.append("<MED_DATE_END>");
        sb.append(rs.getString("MED_DATE_END"));
        sb.append("</MED_DATE_END>");
        sb.append("<INTERVAL>");
        sb.append(rs.getString("INTERVAL"));
        sb.append("</INTERVAL>");
      }
      selectPreparedStatement.close();

      connection.commit();
    }
    catch (SQLException e) {
      System.out.println("Exception Message " + e.getLocalizedMessage());
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      connection.close();
    }

    sb.append("</ACTIVE>");
    System.out.println(sb.toString());
    return sb.toString();
  }

  @GET
  @Path("/dashboard/")
  @Produces({"application/xml"})
  public String getDashboardPatient() throws SQLException {
    Connection connection = getDBConnection();
    PreparedStatement selectPreparedStatement = null;

    SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    Date currentdate = new Date();
    String date = dateformat.format(currentdate);

    StringBuilder sb = new StringBuilder();
    sb.append("<DASHBOARD>");

    String SelectQuery = "SELECT MED_ID, PATIENT_ID, MED_DATE_START, MED_DATE_END FROM MEDBOX WHERE  MED_DATE_START<='" + date + "' AND MED_DATE_END>='" + date + "'";
    try
    {
      selectPreparedStatement = connection.prepareStatement(SelectQuery);
      ResultSet rs = selectPreparedStatement.executeQuery();

      while (rs.next()) {
        sb.append("<MED_ID>");
        sb.append(rs.getString("MED_ID"));
        sb.append("</MED_ID>");
        sb.append("<PATIENT_ID>");
        sb.append(rs.getString("PATIENT_ID"));
        sb.append("</PATIENT_ID>");
        sb.append("<MED_DATE_START>");
        sb.append(rs.getString("MED_DATE_START"));
        sb.append("</MED_DATE_START>");
        sb.append("<MED_DATE_END>");
        sb.append(rs.getString("MED_DATE_END"));
        sb.append("</MED_DATE_END>");
      }
      selectPreparedStatement.close();

      connection.commit();
    }
    catch (SQLException e) {
      System.out.println("Exception Message " + e.getLocalizedMessage());
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      connection.close();
    }

    sb.append("</DASHBOARD>");
    System.out.println(sb.toString());
    return sb.toString();
  }

  @POST
  @Consumes({"application/json"})
  public void storeMedbox(String data)
  {
    JsonObject jsonObject = Json.createReader(new StringReader(data)).readObject();

    String deviceId = jsonObject.getString("MedboxId");
    String patientId = jsonObject.getString("PatientId");
    String startDate = jsonObject.getString("StartDateTime");
    String endDate = jsonObject.getString("EndDateTime");
    String interval = jsonObject.getString("Interval");
    try
    {
      StoreToDB.insertMedbox(deviceId, patientId, startDate, endDate, interval);
    }
    catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @POST
  @Path("/set/")
  @Consumes({"application/json"})
  public void setSchedule(String data) { JsonObject jsonObject = Json.createReader(new StringReader(data)).readObject();

    ScheduleData monitor = new ScheduleData();
    monitor.setBoxid(jsonObject.getString("BoxID"));
    monitor.setStartdatetime(jsonObject.getString("StartDateTime"));
    monitor.setEnddatetime(jsonObject.getString("EndDateTime"));
    monitor.setInterval(jsonObject.getString("Interval"));
    monitor.setTemperature(jsonObject.getString("Temperature"));
    monitor.setBP(jsonObject.getString("BP"));
    monitor.setSpO2(jsonObject.getString("SpO2"));

    ReceivefromDev.scheduled.add(monitor);
    MonitorScheduler monitorSchedule = new MonitorScheduler();
    try {
      monitorSchedule.SetNewSchedule(monitor);
    }
    catch (InterruptedException e) {
      e.printStackTrace();
    }
    catch (IOException e) {
      e.printStackTrace();
    } }

  private static Connection getDBConnection()
  {
    Connection dbConnection = null;
    try {
      Class.forName(DB_DRIVER);
    } catch (ClassNotFoundException e) {
      System.out.println(e.getMessage());
    }
    try {
      return DriverManager.getConnection(DB_CONNECTION, DB_USER, DB_PASSWORD);
    }
    catch (SQLException e) {
      System.out.println(e.getMessage());
    }
    return dbConnection;
  }
}