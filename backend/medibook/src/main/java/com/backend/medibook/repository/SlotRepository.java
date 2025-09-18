package com.backend.medibook.repository;


import com.backend.medibook.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface SlotRepository extends JpaRepository<Slot,Integer> {
    Optional<Slot> findBySlotId(Integer slotId);

    Optional<Slot> findByStartTimeAndEndTimeAndActive(LocalTime startTime, LocalTime endTime,boolean active);

    List<Slot> findByActive(boolean active);

    boolean existsByStartTimeAndEndTime(LocalTime startTime, LocalTime endTime);
}
