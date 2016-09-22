package com.tetres.comms;

import java.util.HashMap;

public class MedboxStatusManager
{
  static HashMap<String, MedboxStatus> MedboxList = new HashMap<String, MedboxStatus>();

  public static MedboxStatus getMedboxStatus(String boxid) {
    MedboxStatus medboxStatus = (MedboxStatus)MedboxList.get(boxid);
    return medboxStatus;
  }

  public static void setMedboxStatus(String boxid, MedboxStatus medboxStatus) {
    MedboxList.put(boxid, medboxStatus);
  }
}