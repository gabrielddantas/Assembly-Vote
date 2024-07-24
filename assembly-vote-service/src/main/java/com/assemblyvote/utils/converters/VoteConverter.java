package com.assemblyvote.utils.converters;

import com.assemblyvote.models.dto.VoteDTO;
import com.assemblyvote.models.entity.Associate;
import com.assemblyvote.models.entity.Schedule;
import com.assemblyvote.models.entity.Vote;

public class VoteConverter {
  public static Vote toEntity(VoteDTO voteDTO, Associate associate, Schedule schedule) {
    return Vote.builder().vote(voteDTO.getVote()).associate(associate).schedule(schedule).build();
  }
}
