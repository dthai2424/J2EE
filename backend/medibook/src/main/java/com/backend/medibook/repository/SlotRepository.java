package com.backend.medibook.repository;


import com.backend.medibook.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
@Repository
public interface SlotRepository extends JpaRepository<Slot,Integer> {
    Optional<Slot> findBySlotId(Integer slotId);

    Optional<Slot> findByStartTimeAndEndTimeAndActive(LocalTime startTime, LocalTime endTime,boolean active);

    List<Slot> findByStartTimeGreaterThanEqualAndEndTimeLessThanEqualAndActive(LocalTime startTime, LocalTime endTime, boolean active);

    List<Slot> findByActive(boolean active);

    boolean existsByStartTimeAndEndTimeAndActive(LocalTime startTime, LocalTime endTime,boolean active);
}
