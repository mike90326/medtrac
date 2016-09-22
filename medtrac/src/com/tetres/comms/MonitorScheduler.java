package com.tetres.comms;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MonitorScheduler
{
  private static final Logger LOGGER = Logger.getLogger(MonitorScheduler.class.getName());
  private static final int NUM_THREADS = 24;
  private static final boolean DONT_INTERRUPT_IF_RUNNING = false;
  private final ScheduledExecutorService fScheduler = Executors.newScheduledThreadPool(NUM_THREADS);

  public void SetNewSchedule(ScheduleData monitor) throws InterruptedException, IOException {
    LOGGER.entering(getClass().getName(), "SetNewSchedule");

    long startTime = 0L;
    long endTime = 0L;
    long interval = Long.parseLong(monitor.getInterval());
    String boxid = monitor.getBoxid();

    SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    try
    {
      Date startDate = dateformat.parse(monitor.getStartdatetime());
      startTime = startDate.getTime() - System.currentTimeMillis();
      Date endDate = dateformat.parse(monitor.getEnddatetime());
      endTime = endDate.getTime() - System.currentTimeMillis();
    } catch (ParseException e) {
      LOGGER.log(Level.SEVERE, "(MonitorScheduler) Parse Exception for dateformat: {0}", e);
      e.printStackTrace();
    }

    ScheduledFuture<?> sfHandle = this.fScheduler.scheduleAtFixedRate(
      new SendPackettoDev(monitor), startTime / 1000L, interval * 60L, TimeUnit.SECONDS);
    SendPackettoDev.setSchedule(sfHandle, monitor);
    Runnable endSchedule = new EndSchedule(sfHandle);
    this.fScheduler.schedule(endSchedule, endTime / 1000L, TimeUnit.SECONDS);

    LOGGER.log(Level.INFO, "(MonitorScheduler) Schedule set for BoxID: {0}", boxid);
    LOGGER.exiting(getClass().getName(), "SetNewSchedule");
  }
  private final class EndSchedule implements Runnable {
    private ScheduledFuture<?> fSchedFuture;

    EndSchedule(ScheduledFuture<?> aSchedFuture) { this.fSchedFuture = aSchedFuture; }


    public void run()
    {
      this.fSchedFuture.cancel(DONT_INTERRUPT_IF_RUNNING);

      SendPackettoDev.scheduleList.remove(this.fSchedFuture);

      if (SendPackettoDev.scheduleList.isEmpty()) {
        MonitorScheduler.LOGGER.log(Level.INFO, "(MonitorScheduler) Shutting down Scheduler due to no pending task");
        MonitorScheduler.this.fScheduler.shutdown();
      }
    }
  }
}