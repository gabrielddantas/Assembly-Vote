package com.assemblyvote.repository;

import com.assemblyvote.models.entity.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    boolean existsByTitleIgnoreCase(String title);

  Page<Schedule> findAllBySessionId(Long sessionId, Pageable pageable);
}
