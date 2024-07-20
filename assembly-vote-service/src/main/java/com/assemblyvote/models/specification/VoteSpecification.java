package com.assemblyvote.models.specification;

import com.assemblyvote.models.entity.Vote;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import java.util.Objects;

@Data
public class VoteSpecification {
  private Boolean vote;
  private Long scheduleId;

  public static Specification<Vote> createSpecification(VoteSpecification criteria) {
    Specification<Vote> specification = Specification.where(null);

    if (Objects.nonNull(criteria.getScheduleId())) {
      specification = specification.and(scheduleIdEquals(criteria.getScheduleId()));
    }

    if (Objects.nonNull(criteria.getVote())) {
      specification = specification.and(voteEquals(criteria.getVote()));
    }

    return specification;
  }

  private static Specification<Vote> scheduleIdEquals(Long scheduleId) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("schedule").get("id"), scheduleId);
  }

  private static Specification<Vote> voteEquals(Boolean vote) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("vote"), vote);
  }
}
