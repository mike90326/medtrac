package com.tetres.comms;

public class CommandPacket
{
  private String Terminal;
  private String BoxID;
  private String Command;
  private String Option;

  public String getTerminal()
  {
    return this.Terminal;
  }

  public void setTerminal(String Terminal) {
    this.Terminal = Terminal;
  }

  public String getBoxID() {
    return this.BoxID;
  }

  public void setBoxID(String BoxID) {
    this.BoxID = BoxID;
  }

  public String getCommand() {
    return this.Command;
  }

  public void setCommand(String Command) {
    this.Command = Command;
  }

  public String getOption() {
    return this.Option;
  }

  public void setOption(String Option) {
    this.Option = Option;
  }
}