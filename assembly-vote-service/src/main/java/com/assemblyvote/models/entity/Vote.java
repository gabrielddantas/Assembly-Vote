package com.assemblyvote.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "votes", schema = "assembly")
public class Vote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "vote", nullable = false)
  private Boolean vote;

  @OneToOne
  @JoinColumn(name = "associate_id", nullable = false)
  private Associate associate;

  @OneToOne
  @JoinColumn(name = "schedule_id", nullable = false)
  private Schedule schedule;
}
