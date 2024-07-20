package com.assemblyvote.repository;

import com.assemblyvote.models.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
  Long countAllByScheduleIdAndVoteTrue(Long scheduleId);

  Long countAllByScheduleIdAndVoteFalse(Long scheduleId);
}
