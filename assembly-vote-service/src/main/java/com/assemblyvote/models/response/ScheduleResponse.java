package com.assemblyvote.models.response;

import com.assemblyvote.models.entity.Session;
import com.assemblyvote.models.entity.Vote;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
public class ScheduleResponse {
  private Long id;
  private String title;
  private String description;
  private Session session;
  private Long totalVotes;
  private Long approvedVotes;
  private Long disapprovedVotes;
}
