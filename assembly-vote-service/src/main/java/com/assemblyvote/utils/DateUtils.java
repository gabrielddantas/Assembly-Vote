package com.assemblyvote.utils;

import java.time.Clock;
import java.time.LocalDateTime;

public class DateUtils {

  private static final Clock clock = Clock.systemDefaultZone();

  public static LocalDateTime nowLocalDateTime() {
    return LocalDateTime.now(clock);
  }

  public static LocalDateTime nowPlusMinutesLocalDateTime(Long minutes) {
    return LocalDateTime.now(clock).plusMinutes(minutes);
  }
}
