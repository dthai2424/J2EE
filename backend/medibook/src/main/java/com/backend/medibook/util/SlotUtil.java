package com.backend.medibook.util;

import com.backend.medibook.dto.SlotDTO;
import com.backend.medibook.entity.Slot;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Builder
@Component
public class SlotUtil {
    public Slot modelToEntity(SlotDTO slotDTO){
        var slot= Slot.builder().startTime(slotDTO.getStartTime()).endTime(slotDTO.getEndTime()).active(slotDTO.isActive());
        if(slotDTO.getSlotId()>0){
            slot.slotId(slotDTO.getSlotId());
        }
        return slot.build();
    }
    public SlotDTO entityToModel(Slot slot){
        SlotDTO slotDTO= SlotDTO.builder().slotId(slot.getSlotId()).startTime(slot.getStartTime()).endTime(slot.getEndTime()).active(slot.isActive()).build();
        return slotDTO;
    }
}
