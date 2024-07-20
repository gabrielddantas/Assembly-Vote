package com.assemblyvote.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {

  @NotBlank(message = "O Titulo é obrigatório")
  @Size(min = 5, max = 100, message = "O Titulo deve ter entre 5 e 100 caracteres")
  private String title;

  @NotBlank(message = "A descrição é obrigatória")
  @Size(min = 5, message = "A descrição deve ter no mínimo 5 caracteres")
  private String description;

  private SessionDTO session;
}
