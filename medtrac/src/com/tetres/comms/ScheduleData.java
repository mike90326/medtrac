package com.tetres.comms;

public class ScheduleData
{
  private String boxid;
  private String startdatetime;
  private String enddatetime;
  private String interval;
  private String temperature;
  private String bp;
  private String spo2;

  public String getBoxid()
  {
    return this.boxid;
  }

  public void setBoxid(String boxid) {
    this.boxid = boxid;
  }

  public String getStartdatetime() {
    return this.startdatetime;
  }

  public void setStartdatetime(String startdatetime) {
    this.startdatetime = startdatetime;
  }

  public String getEnddatetime() {
    return this.enddatetime;
  }

  public void setEnddatetime(String enddatetime) {
    this.enddatetime = enddatetime;
  }

  public String getInterval() {
    return this.interval;
  }

  public void setInterval(String interval) {
    this.interval = interval;
  }

  public String getTemperature() {
    return this.temperature;
  }

  public void setTemperature(String temperature) {
    this.temperature = temperature;
  }

  public String getBP() {
    return this.bp;
  }

  public void setBP(String bp) {
    this.bp = bp;
  }

  public String getSpO2() {
    return this.spo2;
  }

  public void setSpO2(String spo2) {
    this.spo2 = spo2;
  }
}