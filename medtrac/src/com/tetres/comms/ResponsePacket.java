package com.tetres.comms;

import java.util.ArrayList;
import java.util.List;

public class ResponsePacket
{
  private String boxid;
  private String terminal;
  private String response;
  private String status;
  List<MeasurementData> measurement = new ArrayList<MeasurementData>();

  public String getBoxid() {
    return this.boxid;
  }

  public void setBoxid(String boxid) {
    this.boxid = boxid;
  }

  public String getTerminal() {
    return this.terminal;
  }

  public void setTerminal(String terminal) {
    this.terminal = terminal;
  }

  public String getResponse() {
    return this.response;
  }

  public void setResponse(String response) {
    this.response = response;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}