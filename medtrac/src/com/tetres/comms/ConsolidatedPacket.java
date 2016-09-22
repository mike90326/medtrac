package com.tetres.comms;

public class ConsolidatedPacket extends ProcessedPacket
{
  private int RetryCount = 0;
  private boolean tempRetry = false;
  private boolean bpRetry = false;
  private boolean spo2Retry = false;
  private boolean isFinal = false;
  private String orgDateTime;

  public int getRetryCount()
  {
    return this.RetryCount;
  }

  public void setRetryCount(int RetryCount) {
    this.RetryCount = RetryCount;
  }

  public boolean getTempRetry() {
    return this.tempRetry;
  }

  public void setTempRetry(boolean tempRetry) {
    this.tempRetry = tempRetry;
  }

  public boolean getBPRetry() {
    return this.bpRetry;
  }

  public void setBPRetry(boolean bpRetry) {
    this.bpRetry = bpRetry;
  }

  public boolean getSPO2Retry() {
    return this.spo2Retry;
  }

  public void setSPO2Retry(boolean spo2Retry) {
    this.spo2Retry = spo2Retry;
  }

  public boolean getIsFinal() {
    return this.isFinal;
  }

  public void setIsFinal(boolean isFinal) {
    this.isFinal = isFinal;
  }

  public String getOrgDateTime() {
    return this.orgDateTime;
  }

  public void setOrgDateTime(String orgDateTime) {
    this.orgDateTime = orgDateTime;
  }
}