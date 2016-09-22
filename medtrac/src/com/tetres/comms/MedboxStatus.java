package com.tetres.comms;

public class MedboxStatus
{
  private String ipaddr;
  private String socketStatus;
  private String bpSensor;
  private String o2Sensor;
  private String tempSensor;

  public String getipaddr()
  {
    return this.ipaddr;
  }

  public void setipaddr(String new_ipaddr) {
    this.ipaddr = new_ipaddr;
  }

  public String getsocketStatus() {
    return this.socketStatus;
  }

  public void setsocketStatus(String new_socketStatus) {
    this.socketStatus = new_socketStatus;
  }

  public String getbpSensor() {
    return this.bpSensor;
  }

  public void setbpSensor(String new_bpSensor) {
    this.bpSensor = new_bpSensor;
  }

  public String geto2Sensor() {
    return this.o2Sensor;
  }

  public void seto2Sensor(String new_o2Sensor) {
    this.o2Sensor = new_o2Sensor;
  }

  public String gettempSensor() {
    return this.tempSensor;
  }

  public void settempSensor(String new_tempSensor) {
    this.tempSensor = new_tempSensor;
  }
}