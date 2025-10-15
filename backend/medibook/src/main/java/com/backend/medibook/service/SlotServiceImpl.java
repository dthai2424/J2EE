package com.backend.medibook.service;

import com.backend.medibook.dto.SlotDTO;
import com.backend.medibook.entity.Slot;
import com.backend.medibook.exception.SlotInvalidException;
import com.backend.medibook.exception.SlotNotFoundException;
import com.backend.medibook.repository.SlotRepository;
import com.backend.medibook.util.SlotUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SlotServiceImpl implements SlotService {
    @Autowired
    public SlotUtil slotUtil;

    @Autowired
    public SlotRepository slotRepository;
    @Override
    public Slot create(SlotDTO slotDTO) {
        if(slotDTO.getStartTime()==null||slotDTO.getEndTime()==null){
            throw new SlotInvalidException("Thời gian bắt đầu và kết thúc không hợp lệ");
        }
        if (!slotDTO.getEndTime().isAfter(slotDTO.getStartTime())) {
            throw new SlotInvalidException("Thời gian kết thúc phải sau thời gian bắt đầu");
        }
        Slot slot= slotUtil.modelToEntity(slotDTO);
        Slot savedSlot= slotRepository.save(slot);
        return savedSlot;
    }

    @Override
    public Slot update(SlotDTO slotDTO) {
        if(slotDTO.getStartTime()==null||slotDTO.getEndTime()==null){
            throw new SlotInvalidException("Thời gian bắt đầu và kết thúc không hợp lệ");
        }
        if (!slotDTO.getEndTime().isAfter(slotDTO.getStartTime())) {
            throw new SlotInvalidException("Thời gian kết thúc phải sau thời gian bắt đầu");
        }
        Slot slot= slotUtil.modelToEntity(slotDTO);
        Slot updatedSlot= slotRepository.save(slot);
        return updatedSlot;
    }

    @Override
    public SlotDTO getById(Integer slotId) {
        Optional<Slot> slot= slotRepository.findById(slotId);
        if(slot.isPresent()){
            return slotUtil.entityToModel(slot.get());
        }else throw new SlotNotFoundException("Không tìm thấy slot với mã ID này");

    }

    @Override
    public List<SlotDTO> getAllActiveSlot() {
        List<Slot> slots= slotRepository.findByActive(true);
        List<SlotDTO> slotDTOS=new ArrayList<>();
        for(Slot slot:slots){
            slotDTOS.add(slotUtil.entityToModel(slot));
        }
        return slotDTOS;
    }

    @Override
    public List<SlotDTO> getTimeBetweenActiveSlot(LocalTime startTime, LocalTime endTime,boolean active){
        List<Slot> slots= slotRepository.findByStartTimeGreaterThanEqualAndEndTimeLessThanEqualAndActive(startTime,endTime,active);
        List<SlotDTO> slotDTOS=new ArrayList<>();
        for(Slot slot:slots){
            slotDTOS.add(slotUtil.entityToModel(slot));
        }
        return slotDTOS;
    }
    @Override
    public List<SlotDTO> getMorningSlot() {
        return getTimeBetweenActiveSlot(LocalTime.of(3,0),LocalTime.of(12,0),true);
    }

    @Override
    public List<SlotDTO> getAfternoonSlot() {
        return getTimeBetweenActiveSlot(LocalTime.of(12,1),LocalTime.of(19,0),true);
    }
}
