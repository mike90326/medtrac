package com.tetres.comms;


import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import java.sql.Connection;

@Path("/chart/")
public class ChartResource
{
  private static final String DB_DRIVER = "org.h2.Driver";
  private static final String DB_CONNECTION = "jdbc:h2:c:/database/medtracdb";
  private static final String DB_USER = "admin";
  private static final String DB_PASSWORD = "medtracdbsa";

  @GET
  @Produces({"application/xml"})
  public String getChartData(@QueryParam("id") String id, @QueryParam("from") String from, @QueryParam("to") String to, @QueryParam("clinical") String clinical)
    throws SQLException
  {
    Connection connection = getDBConnection();
    PreparedStatement selectPreparedStatement = null;

    System.out.println("from " + from + " to " + to);

    StringBuilder sb = new StringBuilder();
    sb.append("<ID>");

    String measurement = "MR.DATETIME, MR.TEMP, MR.BPHIGH, MR.BPLOW, MR.PULSE, MR.SPO2";
    String SelectQuery = null;
    if (clinical.equals("yes")) {
      SelectQuery = "SELECT DISTINCT " + measurement + " FROM RECORD MR JOIN MEDBOX MB ON MR.MED_ID = MB.MED_ID WHERE MB.PATIENT_ID = '" + id + "' AND MR.DATETIME BETWEEN '" + from + "' AND '" + to + "' AND MR.DATETIME>=MB.MED_DATE_START AND MR.DATETIME<=MB.MED_DATE_END AND MB.INTERVAL = '240' ORDER BY MR.DATETIME";
    }
    else if (clinical.equals("no")) {
      SelectQuery = "SELECT DISTINCT " + measurement + " FROM RECORD MR JOIN MEDBOX MB ON MR.MED_ID = MB.MED_ID WHERE MB.PATIENT_ID = '" + id + "' AND MR.DATETIME BETWEEN '" + from + "' AND '" + to + "' AND MR.DATETIME>=MB.MED_DATE_START AND MR.DATETIME<=MB.MED_DATE_END ORDER BY MR.DATETIME";
    }

    try
    {
      selectPreparedStatement = connection.prepareStatement(SelectQuery);
      ResultSet rs = selectPreparedStatement.executeQuery();

      while (rs.next()) {
        sb.append("<MEASUREMENT>");
        sb.append("<DATETIME>");
        sb.append(rs.getString("DATETIME"));
        sb.append("</DATETIME>");

        sb.append("<TEMP>");
        if ((!rs.getString("TEMP").equals("NC")) && (!rs.getString("TEMP").equals("NA")) && (!rs.getString("TEMP").equals("Error"))) {
          sb.append(rs.getString("TEMP"));
        }
        else if (clinical.equals("no")) {
          sb.append("null");
        }
        sb.append("</TEMP>");
        sb.append("<BPHIGH>");
        if ((!rs.getString("BPHIGH").equals("NC")) && (!rs.getString("BPHIGH").equals("NA")) && (!rs.getString("BPHIGH").equals("Error"))) {
          sb.append(rs.getString("BPHIGH"));
        }
        else if (clinical.equals("no")) {
          sb.append("null");
        }
        sb.append("</BPHIGH>");
        sb.append("<BPLOW>");
        if ((!rs.getString("BPLOW").equals("NC")) && (!rs.getString("BPLOW").equals("NA")) && (!rs.getString("BPLOW").equals("Error"))) {
          sb.append(rs.getString("BPLOW"));
        }
        else if (clinical.equals("no")) {
          sb.append("null");
        }
        sb.append("</BPLOW>");
        sb.append("<PULSE>");
        if ((!rs.getString("PULSE").equals("NC")) && (!rs.getString("PULSE").equals("NA")) && (!rs.getString("PULSE").equals("Error"))) {
          sb.append(rs.getString("PULSE"));
        }
        else if (clinical.equals("no")) {
          sb.append("null");
        }
        sb.append("</PULSE>");
        sb.append("<SPO2>");
        if ((!rs.getString("SPO2").equals("NC")) && (!rs.getString("SPO2").equals("NA")) && (!rs.getString("SPO2").equals("Error"))) {
          sb.append(rs.getString("SPO2"));
        }
        else if (clinical.equals("no")) {
          sb.append("null");
        }
        sb.append("</SPO2>");
        sb.append("</MEASUREMENT>");
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

    sb.append("</ID>");
    System.out.println(sb.toString());
    return sb.toString();
  }

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