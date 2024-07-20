package com.assemblyvote.utils.converters;

import com.assemblyvote.models.dto.AssociateDTO;
import com.assemblyvote.models.entity.Associate;

public class AssociateConverter {
  public static Associate toEntity(AssociateDTO associateDTO) {
    return Associate.builder().name(associateDTO.getName()).cpf(associateDTO.getCpf()).build();
  }
}
