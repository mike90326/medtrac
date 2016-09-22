package com.tetres.comms;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/threshold/")
public class ThresholdResource
{
  private static final Logger LOGGER = Logger.getLogger(ThresholdResource.class.getName());
  private static final String DB_DRIVER = "org.h2.Driver";
  private static final String DB_CONNECTION = "jdbc:h2:c:/database/medtracdb";
  private static final String DB_USER = "admin";
  private static final String DB_PASSWORD = "medtracdbsa";

  @GET
  @Produces({"application/xml"})
  public String getDashboardPatient()
    throws SQLException
  {
    LOGGER.entering(getClass().getName(), "getDashboardPatient");

    Connection connection = getDBConnection();
    PreparedStatement selectPreparedStatement = null;

    StringBuilder sb = new StringBuilder();
    sb.append("<THRESHOLD>");

    String SelectQuery = "SELECT * FROM THRESHOLD";
    try
    {
      selectPreparedStatement = connection.prepareStatement(SelectQuery);
      ResultSet rs = selectPreparedStatement.executeQuery();

      while (rs.next()) {
        sb.append("<ALERT>");
        sb.append(rs.getString("ALERT"));
        sb.append("</ALERT>");
        sb.append("<VALUE>");
        sb.append(rs.getString("VALUE"));
        sb.append("</VALUE>");
        sb.append("<CHECKED>");
        sb.append(rs.getString("CHECKED"));
        sb.append("</CHECKED>");
      }

      selectPreparedStatement.close();

      connection.commit();
    }
    catch (SQLException e) {
      LOGGER.log(Level.SEVERE, "(getDashboardPatient) SQL Exception: {0}", e);
    }
    catch (Exception e) {
      LOGGER.log(Level.SEVERE, "(getDashboardPatient) Exception: {0}", e);
      e.printStackTrace();
    } finally {
      connection.close();
    }

    sb.append("</THRESHOLD>");
    LOGGER.log(Level.INFO, "(getDashboardPatient) Returning threshold: {0}", sb.toString());
    System.out.println(sb.toString());

    LOGGER.exiting(getClass().getName(), "getDashboardPatient");
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