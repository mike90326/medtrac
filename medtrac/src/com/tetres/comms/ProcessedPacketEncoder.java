package com.tetres.comms;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class ProcessedPacketEncoder
  implements Encoder.Text<ProcessedPacket>
{
  public String encode(ProcessedPacket response)
    throws EncodeException
  {
    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
    objectBuilder.add("BoxID", response.getBoxid());
    objectBuilder.add("StartDateTime", response.getStartdatetime());
    objectBuilder.add("Temperature", response.getTemperature());
    objectBuilder.add("BPhigh", response.getBPhigh());
    objectBuilder.add("BPlow", response.getBPlow());
    objectBuilder.add("Pulse", response.getPulse());
    objectBuilder.add("SpO2", response.getSpO2());
    JsonObject jsonResponse = objectBuilder.build();

    return jsonResponse.toString();
  }

  public void init(EndpointConfig ec)
  {
    System.out.println("MessageEncoder - init method called");
  }

  public void destroy()
  {
    System.out.println("MessageEncoder - destroy method called");
  }
}