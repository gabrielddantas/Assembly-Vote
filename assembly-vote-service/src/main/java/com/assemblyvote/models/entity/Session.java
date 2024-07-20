package com.assemblyvote.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sessions", schema = "assembly")
public class Session {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "create_at")
  private LocalDateTime createAt = LocalDateTime.now();

  @Column(name = "expires_in")
  private Integer expiresIn = 1;

  @OneToMany
  @JoinColumn(name = "session_id", nullable = false)
  private List<Schedule> schedules;
}
