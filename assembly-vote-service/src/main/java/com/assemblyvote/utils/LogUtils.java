package com.assemblyvote.utils;

import com.assemblyvote.models.general.ErrorMessage;

import java.util.logging.Logger;

public class LogUtils {
  public static void messageExceptions(ErrorMessage message, Class className) {
    Logger.getLogger(className.getSimpleName())
        .warning(
            message.getStatusCode()
                + " : "
                + message.getProtocol()
                + " : "
                + message.getApiPath()
                + " : "
                + message.getMessage());
  }
}
