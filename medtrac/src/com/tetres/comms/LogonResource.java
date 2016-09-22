package com.tetres.comms;

import java.io.StringReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/logon/")
public class LogonResource
{
  private static final String DB_DRIVER = "org.h2.Driver";
  private static final String DB_CONNECTION = "jdbc:h2:c:/database/medtracdb";
  private static final String DB_USER = "admin";
  private static final String DB_PASSWORD = "medtracdbsa";

  @GET
  @Produces({"text/plain"})
  public String checkLogin()
    throws SQLException
  {
    String login = "";
    Connection connection = getDBConnection();
    PreparedStatement selectPreparedStatement = null;

    String SelectQuery = "SELECT LOGIN_STATUS FROM USER";
    try
    {
      selectPreparedStatement = connection.prepareStatement(SelectQuery);
      ResultSet rs = selectPreparedStatement.executeQuery();

      while (rs.next())
      {
        String logon = rs.getString("LOGIN_STATUS");
        if (logon.equals("LOGIN")) {
          login = "true";
        }
        else if (logon.equals("LOGOUT")) {
          login = "false";
        }

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

    return login;
  }
  @POST
  @Consumes({"application/json"})
  public String Login(String data) throws SQLException {
    JsonObject jsonObject = Json.createReader(new StringReader(data)).readObject();

    String userId = jsonObject.getString("UserId");
    String password = jsonObject.getString("Password");
    String logon = jsonObject.getString("Logon");
    String loginStatus = "";
    String login = "false";

    Connection connection = getDBConnection();
    PreparedStatement selectPreparedStatement = null;
    PreparedStatement updatePreparedStatement = null;
    String SelectQuery = "SELECT USER_ID, PASSWORD FROM USER";
    try
    {
      selectPreparedStatement = connection.prepareStatement(SelectQuery);
      ResultSet rs = selectPreparedStatement.executeQuery();
      while (rs.next()) {
        if ((rs.getString("USER_ID").equals(userId)) && (rs.getString("PASSWORD").equals(password))) {
          if (logon.equals("login")) {
            login = "true";
            loginStatus = "LOGIN";
          }
          else if (logon.equals("logout")) {
            login = "false";
            loginStatus = "LOGOUT";
          }
          String UpdateQuery = "UPDATE USER SET LOGIN_STATUS='" + loginStatus + "' WHERE USER_ID=" + userId;
          updatePreparedStatement = connection.prepareStatement(UpdateQuery);
          updatePreparedStatement.executeUpdate();
          updatePreparedStatement.close();
        }
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

    return login;
  }

  private static Connection getDBConnection() {
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