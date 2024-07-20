package com.assemblyvote.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class NotExistsException extends Exception {
  public NotExistsException() {
    super("Resource not exists", null, false, false);
  }

  public NotExistsException(String message) {
    super(message, null, false, false);
  }

  public NotExistsException(String message, Throwable cause) {
    super(message, cause, false, false);
  }

  public HttpStatus getStatus() {
    return HttpStatus.BAD_REQUEST;
  }
}
