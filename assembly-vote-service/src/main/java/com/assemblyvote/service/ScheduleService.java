package com.assemblyvote.service;

import com.assemblyvote.exception.ExistsException;
import com.assemblyvote.exception.NotExistsException;
import com.assemblyvote.models.dto.ScheduleDTO;
import com.assemblyvote.models.entity.Associate;
import com.assemblyvote.models.entity.Schedule;
import com.assemblyvote.models.entity.Session;
import com.assemblyvote.models.response.PaginatedData;
import com.assemblyvote.models.response.ScheduleResponse;
import com.assemblyvote.repository.ScheduleRepository;
import com.assemblyvote.utils.converters.PaginationConverter;
import com.assemblyvote.utils.converters.ScheduleConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {

  private final ScheduleRepository scheduleRepository;
  private final SessionService sessionService;
  private final VoteService voteService;

  public PaginatedData<ScheduleResponse> findAll(Pageable pageable) {
    Page<Schedule> schedules = scheduleRepository.findAll(pageable);

    return PaginationConverter.toPaginatedData(
        schedules.map(
            schedule ->
                ScheduleConverter.toResponse(
                    schedule, voteService.countVotesBySchedule(schedule.getId()))),
        pageable);
  }

  public ScheduleResponse findById(Long id) throws NotExistsException {
    return scheduleRepository
        .findById(id)
        .map(
            schedule ->
                ScheduleConverter.toResponse(
                    schedule, voteService.countVotesBySchedule(schedule.getId())))
        .orElseThrow(() -> new NotExistsException("Pauta não encontrada"));
  }

  public Schedule createSchedule(ScheduleDTO scheduleDTO) throws ExistsException {
    if (scheduleRepository.existsByTitleIgnoreCase(scheduleDTO.getTitle())) {
      throw new ExistsException("Pauta já cadastrada");
    }

    Schedule schedule = ScheduleConverter.toEntity(scheduleDTO);

    Session session = sessionService.createOrGetCurrentSession(scheduleDTO.getSession());
    schedule.setSession(session);

    return scheduleRepository.save(schedule);
  }
}
