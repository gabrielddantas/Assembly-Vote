package com.assemblyvote.controller;

import com.assemblyvote.exception.ExistsException;
import com.assemblyvote.exception.NotExistsException;
import com.assemblyvote.models.dto.ScheduleDTO;
import com.assemblyvote.models.response.ApiResponse;
import com.assemblyvote.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/schedules")
public class ScheduleController {

  private final ScheduleService scheduleService;

  @GetMapping("/by-session/{sessionId}")
  public ResponseEntity<ApiResponse> findAll(
      @PathVariable("sessionId") Long sessionId, @PageableDefault(size = 10) Pageable pageable) {
    return ResponseEntity.ok(ApiResponse.of(scheduleService.findAll(sessionId, pageable)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse> findById(@PathVariable Long id) {
    try {
      return ResponseEntity.ok(ApiResponse.of(scheduleService.findById(id)));
    } catch (NotExistsException e) {
      return ResponseEntity.status(e.getStatus())
          .body(ApiResponse.of(e.getStatus(), e.getMessage()));
    }
  }

  @PostMapping()
  public ResponseEntity<ApiResponse> createSchedule(
      @Valid @RequestBody ScheduleDTO scheduleDTO, BindingResult result) {

    if (result.hasErrors()) {
      return ResponseEntity.badRequest().body(ApiResponse.fromBindingResult(result));
    }

    try {
      return ResponseEntity.status(HttpStatus.CREATED)
          .body(ApiResponse.of(HttpStatus.CREATED, scheduleService.createSchedule(scheduleDTO)));
    } catch (ExistsException e) {
      return ResponseEntity.badRequest().body(ApiResponse.of(e.getStatus(), e.getMessage()));
    }
  }
}
