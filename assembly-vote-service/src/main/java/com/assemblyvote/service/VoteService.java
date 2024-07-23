package com.assemblyvote.service;

import com.assemblyvote.exception.BadRequestException;
import com.assemblyvote.exception.ExistsException;
import com.assemblyvote.exception.NoValuePresentException;
import com.assemblyvote.exception.NotExistsException;
import com.assemblyvote.http.ValidateCPF;
import com.assemblyvote.http.ValidateCPFService;
import com.assemblyvote.models.dto.VoteDTO;
import com.assemblyvote.models.entity.Associate;
import com.assemblyvote.models.entity.Schedule;
import com.assemblyvote.models.entity.Vote;
import com.assemblyvote.models.enums.VoteMap;
import com.assemblyvote.models.response.PaginatedData;
import com.assemblyvote.models.specification.VoteSpecification;
import com.assemblyvote.repository.ScheduleRepository;
import com.assemblyvote.repository.VoteRepository;
import com.assemblyvote.utils.DateUtils;
import com.assemblyvote.utils.converters.PaginationConverter;
import com.assemblyvote.utils.converters.VoteConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class VoteService {

  private final VoteRepository voteRepository;
  private final ScheduleRepository scheduleRepository;
  private final AssociateService associateService;
  private final ValidateCPFService validateCPFService;
  private final ValidateCPF validateCPF;

  public PaginatedData<Vote> getAllVotesBySchedule(
      VoteSpecification specification, Pageable pageable)
      throws NotExistsException, NoValuePresentException {

    if (Objects.isNull(specification.getScheduleId())) {
      throw new NoValuePresentException("Alguma coisa deu errado, tente novamente.");
    }

    return PaginationConverter.toPaginatedData(
        voteRepository.findAll(VoteSpecification.createSpecification(specification), pageable),
        pageable);
  }

  public boolean hasVoted(Long associateId, Long scheduleId) throws NoValuePresentException {
    if (Objects.isNull(associateId) || Objects.isNull(scheduleId)) {
      throw new NoValuePresentException("Alguma coisa deu errado, tente novamente.");
    }

    return voteRepository.existsByAssociateIdAndScheduleId(associateId, scheduleId);
  }

  public Vote createVote(VoteDTO vote)
      throws NotExistsException, ExistsException, NoValuePresentException, BadRequestException {
    if (Objects.isNull(vote.getAssociateId()) || Objects.isNull(vote.getScheduleId())) {
      throw new NoValuePresentException("Alguma coisa deu errado, tente novamente.");
    }

    Associate associate =
        associateService
            .findById(vote.getAssociateId())
            .orElseThrow(() -> new NotExistsException("Associado não encontrado."));

    if (hasVoted(associate.getId(), vote.getScheduleId())) {
      throw new ExistsException("Associado já votou nesta pauta.");
    }

    Schedule schedule =
        scheduleRepository
            .findById(vote.getScheduleId())
            .orElseThrow(() -> new NotExistsException("Pauta não encontrada."));

    if (verifyIfScheduleIsExpires(schedule)) {
      throw new BadRequestException("Sessão de votação encerrada.");
    }

    try {
      validateCPFService.checkCPF(associate.getCpf());
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println(e.getMessage());
      throw new NotExistsException("CPF inválido.");
    }

    return voteRepository.save(VoteConverter.toEntity(vote, associate, schedule));
  }

  public Map<String, Long> countVotesBySchedule(Long scheduleId) {
    Long approved = voteRepository.countAllByScheduleIdAndVoteTrue(scheduleId);
    Long disapproved = voteRepository.countAllByScheduleIdAndVoteFalse(scheduleId);

    return Map.of(
        VoteMap.APPROVED.name(),
        approved,
        VoteMap.DISAPPROVED.name(),
        disapproved,
        VoteMap.TOTAL.name(),
        approved + disapproved);
  }

  private boolean verifyIfScheduleIsExpires(Schedule schedule) {
    return schedule.getSession().getExpiresIn().isBefore(DateUtils.nowLocalDateTime());
  }
}
