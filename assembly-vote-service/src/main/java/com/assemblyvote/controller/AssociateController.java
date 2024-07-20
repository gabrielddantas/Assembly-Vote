package com.assemblyvote.controller;

import com.assemblyvote.exception.ExistsException;
import com.assemblyvote.utils.converters.AssociateConverter;
import com.assemblyvote.models.dto.AssociateDTO;
import com.assemblyvote.models.entity.Associate;
import com.assemblyvote.models.response.ApiResponse;
import com.assemblyvote.service.AssociateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/associates")
public class AssociateController {

  private final AssociateService associateService;

  @GetMapping("/exists/{cpf}")
  public ResponseEntity<ApiResponse> associateExists(@PathVariable String cpf) {
    ApiResponse response =
        associateService
            .findByCpf(cpf)
            .map(ApiResponse::of)
            .orElse(ApiResponse.of(HttpStatus.NOT_FOUND, "Associado não encontrado"));

    return ResponseEntity.ok(response);
  }

  @PostMapping()
  public ResponseEntity<ApiResponse> createAssociate(
      @Valid @RequestBody AssociateDTO associate, BindingResult result) {

    if (result.hasErrors()) {
      return ResponseEntity.badRequest().body(ApiResponse.fromBindingResult(result));
    }

    try {
      return ResponseEntity.status(HttpStatus.CREATED)
          .body(
              ApiResponse.of(
                  HttpStatus.CREATED,
                  associateService.save(AssociateConverter.toEntity(associate))));
    } catch (ExistsException e) {
      return ResponseEntity.badRequest().body(ApiResponse.of(e.getStatus(), e.getMessage()));
    }
  }
}
