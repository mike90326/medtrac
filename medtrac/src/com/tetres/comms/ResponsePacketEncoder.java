package com.tetres.comms;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class ResponsePacketEncoder
implements Encoder.Text<ResponsePacket>
{
  private static final Logger LOGGER = Logger.getLogger(ResponsePacketEncoder.class.getName());

  public String encode(ResponsePacket response) throws EncodeException
  {
    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
    objectBuilder.add("BoxID", response.getBoxid());
    objectBuilder.add("Terminal", response.getTerminal());
    objectBuilder.add("Response", response.getResponse());
    objectBuilder.add("Status", response.getStatus());
    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
    for (int i = 0; i < response.measurement.size(); i++) {
      arrayBuilder.add(Json.createObjectBuilder()
        .add("Type", ((MeasurementData)response.measurement.get(i)).getType())
        .add("Count", ((MeasurementData)response.measurement.get(i)).getCount())
        .add("Data", ((MeasurementData)response.measurement.get(i)).getData())
        .build());
    }

    JsonArray jsonArray = arrayBuilder.build();
    objectBuilder.add("Measurement", jsonArray);
    JsonObject jsonResponse = objectBuilder.build();
    LOGGER.log(Level.FINER, "(ResponsePacketEncoder) Json Response: {0}", jsonResponse.toString());

    return jsonResponse.toString();
  }

  public void init(EndpointConfig ec)
  {
    LOGGER.log(Level.INFO, "(ResponsePacketEncoder) MessageEncoder - init method called");
  }

  public void destroy()
  {
    LOGGER.log(Level.INFO, "(ResponsePacketEncoder) MessageEncoder - destroy method called");
  }
}