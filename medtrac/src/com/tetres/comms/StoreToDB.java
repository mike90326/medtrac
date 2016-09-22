package com.tetres.comms;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class StoreToDB
{
  private static final String DB_DRIVER = "org.h2.Driver";
  private static final String DB_CONNECTION = "jdbc:h2:c:/database/medtracdb";
  private static final String DB_USER = "admin";
  private static final String DB_PASSWORD = "medtracdbsa";

  public static void insertPatient(String patientId, String patientName, String dateOfBirth, String bed, String age, String sex, String registrationDate)
    throws SQLException
  {
    Connection connection = getDBConnection();
    PreparedStatement insertPreparedStatement = null;

    String InsertQuery = "INSERT INTO PATIENT (PATIENT_ID,PATIENT_NAME,DATE_OF_BIRTH,BED,AGE,SEX,REG_DATE) VALUES(?,?,?,?,?,?,?)";
    try
    {
      connection.setAutoCommit(false);

      insertPreparedStatement = connection.prepareStatement(InsertQuery);
      insertPreparedStatement.setString(1, patientId);
      insertPreparedStatement.setString(2, patientName);
      insertPreparedStatement.setString(3, dateOfBirth);
      insertPreparedStatement.setString(4, bed);
      insertPreparedStatement.setString(5, age);
      insertPreparedStatement.setString(6, sex);
      insertPreparedStatement.setString(7, registrationDate);
      insertPreparedStatement.executeUpdate();
      insertPreparedStatement.close();

      connection.commit();
    } catch (SQLException e) {
      System.out.println("Exception Message " + e.getLocalizedMessage());
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      connection.close();
    }
  }

  public static void insertMedbox(String deviceId, String patientId, String startDate, String endDate, String interval) throws SQLException {
    Connection connection = getDBConnection();
    PreparedStatement insertPreparedStatement = null;

    String InsertQuery = "INSERT INTO MEDBOX (MED_ID,PATIENT_ID,MED_DATE_START,MED_DATE_END,INTERVAL) VALUES(?,?,?,?,?)";
    try
    {
      connection.setAutoCommit(false);

      insertPreparedStatement = connection.prepareStatement(InsertQuery);
      insertPreparedStatement.setString(1, deviceId);
      insertPreparedStatement.setString(2, patientId);
      insertPreparedStatement.setString(3, startDate);
      insertPreparedStatement.setString(4, endDate);
      insertPreparedStatement.setString(5, interval);
      insertPreparedStatement.executeUpdate();
      insertPreparedStatement.close();

      connection.commit();
    } catch (SQLException e) {
      System.out.println("Exception Message " + e.getLocalizedMessage());
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      connection.close();
    }
  }

  public static void insertRecord(String deviceId, String dateTime, String temp, String bpHigh, String bpLow, String pulse, String spo2) throws SQLException {
    Connection connection = getDBConnection();
    PreparedStatement insertPreparedStatement = null;

    String InsertQuery = "INSERT INTO RECORD (MED_ID,DATETIME,TEMP,BPHIGH,BPLOW,PULSE,SPO2) VALUES(?,?,?,?,?,?,?)";
    try
    {
      connection.setAutoCommit(false);

      insertPreparedStatement = connection.prepareStatement(InsertQuery);
      insertPreparedStatement.setString(1, deviceId);
      insertPreparedStatement.setString(2, dateTime);
      insertPreparedStatement.setString(3, temp);
      insertPreparedStatement.setString(4, bpHigh);
      insertPreparedStatement.setString(5, bpLow);
      insertPreparedStatement.setString(6, pulse);
      insertPreparedStatement.setString(7, spo2);
      insertPreparedStatement.executeUpdate();
      insertPreparedStatement.close();

      connection.commit();
    } catch (SQLException e) {
      System.out.println("Exception Message " + e.getLocalizedMessage());
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      connection.close();
    }
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