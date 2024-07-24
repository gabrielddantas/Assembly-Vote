package com.assemblyvote.repository;

import com.assemblyvote.models.entity.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

  Page<Vote> findAll(Specification<Vote> specification, Pageable pageable);

  Long countAllByScheduleIdAndVoteTrue(Long scheduleId);

  Long countAllByScheduleIdAndVoteFalse(Long scheduleId);

  boolean existsByAssociateIdAndScheduleId(Long associateId, Long scheduleId);
}
