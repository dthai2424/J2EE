package com.backend.medibook.util;

import com.backend.medibook.dto.SlotDTO;
import com.backend.medibook.entity.Slot;
import org.springframework.stereotype.Component;

@Component
public class SlotUtil {
    public Slot modelToEntity(SlotDTO slotDTO){
        Slot slot= Slot.builder().slotId(slotDTO.getSlotId()).startTime(slotDTO.getStartTime()).endTime(slotDTO.getEndTime()).build();
        return slot;
    }
    public SlotDTO entityToModel(Slot slot){
        SlotDTO slotDTO= SlotDTO.builder().slotId(slot.getSlotId()).startTime(slot.getStartTime()).endTime(slot.getEndTime()).build();
        return slotDTO;
    }
}
