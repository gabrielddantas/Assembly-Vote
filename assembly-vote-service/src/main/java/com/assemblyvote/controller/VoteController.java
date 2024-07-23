package com.assemblyvote.controller;

import com.assemblyvote.exception.BadRequestException;
import com.assemblyvote.exception.ExistsException;
import com.assemblyvote.exception.NoValuePresentException;
import com.assemblyvote.exception.NotExistsException;
import com.assemblyvote.models.dto.VoteDTO;
import com.assemblyvote.models.general.ErrorMessage;
import com.assemblyvote.models.response.ApiResponse;
import com.assemblyvote.models.specification.VoteSpecification;
import com.assemblyvote.service.VoteService;
import com.assemblyvote.utils.LogUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/votes")
public class VoteController {

  private final VoteService voteService;

  @GetMapping("/schedule")
  public ResponseEntity<ApiResponse> getVotesBySchedule(
      VoteSpecification specification, @PageableDefault(size = 10) Pageable pageable) {

    try {
      return ResponseEntity.ok(
          ApiResponse.of(voteService.getAllVotesBySchedule(specification, pageable)));
    } catch (NotExistsException e) {
      LogUtils.messageExceptions(
          ErrorMessage.from("GET", e.getStatus().value(), e.getMessage(), "/votes/schedule"),
          this.getClass());
      return ResponseEntity.status(e.getStatus())
          .body(ApiResponse.of(e.getStatus(), e.getMessage()));
    } catch (Exception e) {
      LogUtils.messageExceptions(
          ErrorMessage.from(
              "GET", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), "/votes/schedule"),
          this.getClass());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(
              ApiResponse.of(
                  HttpStatus.INTERNAL_SERVER_ERROR, "Alguma coisa deu errado, tente novamente."));
    }
  }

  @GetMapping("/has-voted")
  public ResponseEntity<ApiResponse> hasVoted(Long associateId, Long scheduleId) {
    try {
      return ResponseEntity.ok(ApiResponse.of(voteService.hasVoted(associateId, scheduleId)));
    } catch (Exception e) {
      LogUtils.messageExceptions(
          ErrorMessage.from(
              "GET", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), "/votes/has-voted"),
          this.getClass());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(
              ApiResponse.of(
                  HttpStatus.INTERNAL_SERVER_ERROR, "Alguma coisa deu errado, tente novamente."));
    }
  }

  @PostMapping()
  public ResponseEntity<ApiResponse> createVote(@RequestBody VoteDTO vote) {
    try {
      return ResponseEntity.ok(ApiResponse.of(voteService.createVote(vote)));
    } catch (NotExistsException e) {
      LogUtils.messageExceptions(
          ErrorMessage.from("POST", e.getStatus().value(), e.getMessage(), "/votes"),
          this.getClass());
      return ResponseEntity.status(e.getStatus())
          .body(ApiResponse.of(e.getStatus(), e.getMessage()));
    } catch (ExistsException e) {
      LogUtils.messageExceptions(
          ErrorMessage.from("POST", e.getStatus().value(), e.getMessage(), "/votes"),
          this.getClass());
      return ResponseEntity.status(e.getStatus())
          .body(ApiResponse.of(e.getStatus(), e.getMessage()));
    } catch (BadRequestException e) {
      LogUtils.messageExceptions(
          ErrorMessage.from("POST", e.getStatus().value(), e.getMessage(), "/votes"),
          this.getClass());
      return ResponseEntity.status(e.getStatus())
          .body(ApiResponse.of(e.getStatus(), e.getMessage()));
    } catch (Exception e) {
      LogUtils.messageExceptions(
          ErrorMessage.from(
              "POST", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), "/votes"),
          this.getClass());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(
              ApiResponse.of(
                  HttpStatus.INTERNAL_SERVER_ERROR, "Alguma coisa deu errado, tente novamente."));
    }
  }
}
