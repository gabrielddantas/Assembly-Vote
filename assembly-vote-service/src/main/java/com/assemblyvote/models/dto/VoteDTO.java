package com.assemblyvote.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteDTO {
  @NotNull(message = "Campo voto é obrigatório")
  private Boolean vote;

  private Long associateId;
  private Long scheduleId;
}
