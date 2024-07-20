package com.assemblyvote.models.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FieldErrorResponse {
  String field;
  String defaultMessage;

  public static FieldErrorResponse of(String field, String defaultMessage) {
    return new FieldErrorResponse(field, defaultMessage);
  }
}
