package com.assemblyvote.utils.converters;

import com.assemblyvote.models.dto.SessionDTO;
import com.assemblyvote.models.entity.Session;
import com.assemblyvote.utils.DateUtils;

public class SessionConverter {

  public static Session toEntity(SessionDTO sessionDTO) {
    return Session.builder()
        .createAt(DateUtils.nowLocalDateTime())
        .expiresIn(DateUtils.nowPlusMinutesLocalDateTime(sessionDTO.getExpiresIn()))
        .build();
  }
}
