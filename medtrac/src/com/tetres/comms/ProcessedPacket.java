package com.tetres.comms;

public class ProcessedPacket
{
  private String boxid;
  private String startdatetime;
  private String temperature;
  private String bphigh;
  private String bplow;
  private String pulse;
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

  public String getTemperature() {
    return this.temperature;
  }

  public void setTemperature(String temperature) {
    this.temperature = temperature;
  }

  public String getBPhigh() {
    return this.bphigh;
  }

  public void setBPhigh(String bphigh) {
    this.bphigh = bphigh;
  }

  public String getBPlow() {
    return this.bplow;
  }

  public void setBPlow(String bplow) {
    this.bplow = bplow;
  }

  public String getPulse() {
    return this.pulse;
  }

  public void setPulse(String pulse) {
    this.pulse = pulse;
  }

  public String getSpO2() {
    return this.spo2;
  }

  public void setSpO2(String spo2) {
    this.spo2 = spo2;
  }
}