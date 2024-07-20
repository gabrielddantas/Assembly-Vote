package com.assemblyvote.utils.converters;

import com.assemblyvote.models.dto.ScheduleDTO;
import com.assemblyvote.models.entity.Schedule;
import com.assemblyvote.models.entity.Vote;
import com.assemblyvote.models.enums.VoteMap;
import com.assemblyvote.models.response.ScheduleResponse;

import java.util.List;
import java.util.Map;

public class ScheduleConverter {

  public static Schedule toEntity(ScheduleDTO scheduleDTO) {
    return Schedule.builder()
        .title(scheduleDTO.getTitle())
        .description(scheduleDTO.getDescription())
        .build();
  }

  public static ScheduleResponse toResponse(Schedule schedule, Map<String, Long> votes) {
    return ScheduleResponse.builder()
        .id(schedule.getId())
        .title(schedule.getTitle())
        .description(schedule.getDescription())
        .session(schedule.getSession())
        .approvedVotes(votes.get(VoteMap.APPROVED.name()))
        .disapprovedVotes(votes.get(VoteMap.DISAPPROVED.name()))
        .totalVotes(votes.get(VoteMap.TOTAL.name()))
        .build();
  }
}
