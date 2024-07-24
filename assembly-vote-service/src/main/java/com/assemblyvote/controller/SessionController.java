package com.assemblyvote.controller;

import com.assemblyvote.models.dto.SessionDTO;
import com.assemblyvote.models.response.ApiResponse;
import com.assemblyvote.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sessions")
public class SessionController {

  private final SessionService sessionService;

  @GetMapping
  public ResponseEntity<ApiResponse> findAll(@PageableDefault(size = 10) Pageable pageable) {
    return ResponseEntity.ok(ApiResponse.of(sessionService.findAll(pageable)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse> findById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.of(sessionService.findById(id)));
  }
}
