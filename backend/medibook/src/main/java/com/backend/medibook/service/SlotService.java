package com.backend.medibook.service;

import com.backend.medibook.dto.SlotDTO;
import com.backend.medibook.entity.Slot;

import java.time.LocalTime;
import java.util.List;

public interface SlotService {
    SlotDTO create(SlotDTO slotDTO);

    SlotDTO update(SlotDTO slotDTO);

    SlotDTO getById(Integer slotId);

    List<SlotDTO> getAllActiveSlot();

    List<SlotDTO> getTimeBetweenActiveSlot(LocalTime startTime, LocalTime endTime, boolean active);

    List<SlotDTO> getMorningSlot();

    List<SlotDTO> getAfternoonSlot();





}
