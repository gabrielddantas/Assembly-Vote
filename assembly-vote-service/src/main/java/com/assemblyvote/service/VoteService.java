package com.assemblyvote.service;

import com.assemblyvote.models.entity.Vote;
import com.assemblyvote.models.enums.VoteMap;
import com.assemblyvote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VoteService {

  private final VoteRepository voteRepository;

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
}
