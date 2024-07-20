package com.assemblyvote.models.entity;

import com.assemblyvote.utils.DateUtils;
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
  private LocalDateTime createAt = DateUtils.nowLocalDateTime();

  @Column(name = "expires_in")
  private LocalDateTime expiresIn = DateUtils.nowPlusMinutesLocalDateTime(1L);
}
