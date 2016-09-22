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

public class RetryScheduler
{
  private static final Logger LOGGER = Logger.getLogger(RetryScheduler.class.getName());
  private static final int NUM_THREADS = 24;
  private static final boolean DONT_INTERRUPT_IF_RUNNING = false;
  private final ScheduledExecutorService rScheduler = Executors.newScheduledThreadPool(NUM_THREADS);

  public void SetNewSchedule(ScheduleData retry) throws InterruptedException, IOException {
    long startTime = 0L;
    long endTime = 0L;
    long interval = Long.parseLong(retry.getInterval());
    String boxid = retry.getBoxid();

    SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    try
    {
      Date startDate = dateformat.parse(retry.getStartdatetime());
      startTime = startDate.getTime() - System.currentTimeMillis();
      Date endDate = dateformat.parse(retry.getEnddatetime());
      endTime = endDate.getTime() - System.currentTimeMillis();
    }
    catch (ParseException e) {
      e.printStackTrace();
    }

    ScheduledFuture<?> sfHandle = this.rScheduler.scheduleAtFixedRate(new SendPackettoDev(retry), startTime / 1000L, interval * 60L, TimeUnit.SECONDS);
    SendPackettoDev.setSchedule(sfHandle, retry);
    Runnable endSchedule = new EndSchedule(sfHandle);
    this.rScheduler.schedule(endSchedule, endTime / 1000L, TimeUnit.SECONDS);

    LOGGER.log(Level.INFO, "(RetryScheduler)Schedule set for BoxID: {0}", boxid);
  }
  private final class EndSchedule implements Runnable {
    private ScheduledFuture<?> rSchedFuture;
    EndSchedule(ScheduledFuture<?> aSchedFuture) { this.rSchedFuture = aSchedFuture; }
    public void run()
    {
      this.rSchedFuture.cancel(DONT_INTERRUPT_IF_RUNNING);

      SendPackettoDev.scheduleList.remove(this.rSchedFuture);

      if (SendPackettoDev.scheduleList.isEmpty()) {
        System.out.println("Shutting down Retry Scheduler due to no pending task");
        RetryScheduler.this.rScheduler.shutdown();
      }
    }
  }
}