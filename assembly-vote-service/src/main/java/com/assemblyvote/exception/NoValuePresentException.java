package com.assemblyvote.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class NoValuePresentException extends Exception {
  public NoValuePresentException() {
    super("The value not present", null, false, false);
  }

  public NoValuePresentException(String message) {
    super(message, null, false, false);
  }

  public NoValuePresentException(String message, Throwable cause) {
    super(message, cause, false, false);
  }

  public HttpStatus getStatus() {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
