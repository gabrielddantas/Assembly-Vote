package com.assemblyvote.models.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AssociateDTO {
  @NotBlank(message = "O nome do associado é obrigatório")
  @Size(min = 3, message = "Quantidade de caracteres inválida")
  private String name;

  @NotBlank(message = "O CPF do associado é obrigatório")
  @Size(min = 11, max = 11, message = "Quantidade de caracteres inválida")
  private String cpf;
}
