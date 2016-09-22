package com.tetres.comms;

import java.io.IOException;
import java.net.URI;
import javax.websocket.ClientEndpoint;
import javax.websocket.CloseReason;
import javax.websocket.ContainerProvider;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;

@ClientEndpoint
public class InternalWSClient
{
  Session userSession = null;
  private MessageHandler messageHandler;

  public InternalWSClient(URI endpointURI)
  {
    try
    {
      WebSocketContainer container = ContainerProvider.getWebSocketContainer();
      container.connectToServer(this, endpointURI);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @OnOpen
  public void onOpen(Session userSession) {
    System.out.println("opening websocket");
    this.userSession = userSession;
  }

  @OnClose
  public void onClose(Session userSession, CloseReason reason) {
    System.out.println("closing websocket");
    this.userSession = null;
  }

  @OnMessage
  public void onMessage(String message) {
    System.out.println("InternalWSClient onMessage");
    if (this.messageHandler != null)
      this.messageHandler.handleMessage(message);
  }

  public void addMessageHandler(MessageHandler msgHandler)
  {
    this.messageHandler = msgHandler;
  }

  public void sendMessage(String message) throws IOException
  {
    this.userSession.getBasicRemote().sendText(message);
  }

  public static abstract interface MessageHandler
  {
    public abstract void handleMessage(String paramString);
  }
}