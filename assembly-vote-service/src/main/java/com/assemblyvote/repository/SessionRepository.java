package com.assemblyvote.repository;

import com.assemblyvote.models.entity.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

  @Query("FROM Session AS s ORDER BY s.createAt DESC")
  Page<Session> findAllOrderByCreateAtDesc(Pageable pageable);

  @Query("FROM Session AS s WHERE s.expiresIn > :now ORDER BY s.createAt DESC LIMIT 1")
  Optional<Session> findOpenedSessionNow(LocalDateTime now);
}
