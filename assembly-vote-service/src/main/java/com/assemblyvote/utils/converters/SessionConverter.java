package com.assemblyvote.utils.converters;

import com.assemblyvote.models.dto.SessionDTO;
import com.assemblyvote.models.entity.Session;
import com.assemblyvote.utils.DateUtils;

import java.util.Objects;

public class SessionConverter {

  public static Session toEntity(SessionDTO sessionDTO) {
    if (Objects.isNull(sessionDTO) || Objects.isNull(sessionDTO.getExpiresIn())) {
      return new Session();
    }

    return Session.builder()
        .createAt(DateUtils.nowLocalDateTime())
        .expiresIn(DateUtils.nowPlusMinutesLocalDateTime(sessionDTO.getExpiresIn()))
        .build();
  }
}
