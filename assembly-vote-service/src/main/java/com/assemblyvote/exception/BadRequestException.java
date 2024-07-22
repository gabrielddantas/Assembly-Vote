package com.assemblyvote.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BadRequestException extends Exception {
  public BadRequestException() {
    super("Resource already exists", null, false, false);
  }

  public BadRequestException(String message) {
    super(message, null, false, false);
  }

  public BadRequestException(String message, Throwable cause) {
    super(message, cause, false, false);
  }

  public HttpStatus getStatus() {
    return HttpStatus.BAD_REQUEST;
  }
}
