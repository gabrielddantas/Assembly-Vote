package com.assemblyvote.models.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
  private int status = HttpStatus.OK.value();
  private String message = "";
  private Object data = null;

  public static ApiResponse of(HttpStatus status, String message, Object data) {
    return new ApiResponse(status.value(), message, data);
  }

  public static ApiResponse of(HttpStatus status, String message) {
    return new ApiResponse(status.value(), message, null);
  }

  public static ApiResponse of(HttpStatus status, Object data) {
    return new ApiResponse(status.value(), "", data);
  }

  public static ApiResponse of(HttpStatus status) {
    return new ApiResponse(status.value(), "", null);
  }

  public static ApiResponse of(Object data) {
    return new ApiResponse(HttpStatus.OK.value(), "", data);
  }

  public static ApiResponse fromBindingResult(BindingResult bindingResult) {
    List<FieldErrorResponse> errors =
        bindingResult.getFieldErrors().stream()
            .map(it -> FieldErrorResponse.of(it.getField(), it.getDefaultMessage()))
            .toList();

    return new ApiResponse(HttpStatus.BAD_REQUEST.value(), "Campos inválidos", errors);
  }
}
