package com.assemblyvote.service;

import com.assemblyvote.models.dto.SessionDTO;
import com.assemblyvote.models.entity.Session;
import com.assemblyvote.models.response.PaginatedData;
import com.assemblyvote.repository.SessionRepository;
import com.assemblyvote.utils.DateUtils;
import com.assemblyvote.utils.converters.PaginationConverter;
import com.assemblyvote.utils.converters.SessionConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService {

  private final SessionRepository sessionRepository;

  public PaginatedData<Session> findAll(Pageable pageable) {
    return PaginationConverter.toPaginatedData(
        sessionRepository.findAllOrderByCreateAtDesc(pageable), pageable);
  }

  public Optional<Session> findById(Long id) {
    return sessionRepository.findById(id);
  }

  public Session createOrGetCurrentSession(SessionDTO sessionDTO) {
    return sessionRepository
        .findOpenedSessionNow(DateUtils.nowLocalDateTime())
        .orElseGet(() -> sessionRepository.save(SessionConverter.toEntity(sessionDTO)));
  }
}
