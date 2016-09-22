package com.tetres.comms;

import java.io.StringReader;
import java.sql.SQLException;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

@Path("/register/")
public class RegisterPatientResource
{
  @POST
  @Consumes({"application/json"})
  public void storePatient(String data)
  {
    JsonObject jsonObject = Json.createReader(new StringReader(data)).readObject();

    String patientId = jsonObject.getString("PatientId");
    String patientName = jsonObject.getString("PatientName");
    String dateOfBirth = jsonObject.getString("DateOfBirth");
    String bed = jsonObject.getString("Bed");
    String age = jsonObject.getString("Age");
    String sex = jsonObject.getString("Sex");
    String registrationDate = jsonObject.getString("RegistrationDate");
    try
    {
      System.out.println("Inserting into PATIENT PATIENT_ID:" + patientId + ", PATIENT_NAME:" + patientName + ", DATE_OF_BIRTH:" + dateOfBirth + ", BED:" + bed + ", AGE:" + age + ", SEX:" + sex + ", REG_DATE:" + registrationDate);
      StoreToDB.insertPatient(patientId, patientName, dateOfBirth, bed, age, sex, registrationDate);
    }
    catch (SQLException e) {
      e.printStackTrace();
    }
  }
}