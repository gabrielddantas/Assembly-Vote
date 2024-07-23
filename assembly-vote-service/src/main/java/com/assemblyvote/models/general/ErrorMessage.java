package com.assemblyvote.models.general;

import com.assemblyvote.utils.DateUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorMessage {
  private LocalDateTime timestamp;
  private String protocol;
  private int statusCode;
  private String message;
  private String apiPath;

  public static ErrorMessage from(String protocol, int statusCode, String message, String apiPath) {
    return ErrorMessage.builder()
        .timestamp(DateUtils.nowLocalDateTime())
        .protocol(protocol)
        .statusCode(statusCode)
        .message(message)
        .apiPath(apiPath)
        .build();
  }
}
