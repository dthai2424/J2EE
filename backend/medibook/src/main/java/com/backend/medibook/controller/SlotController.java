package com.backend.medibook.controller;

import com.backend.medibook.dto.SlotDTO;
import com.backend.medibook.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/slot")
public class SlotController {
    @Autowired
    private SlotService slotService;

    @PostMapping("/create")
    private ResponseEntity<SlotDTO> createSlot(@RequestBody SlotDTO slotDTO){
        SlotDTO createdSlot=slotService.create(slotDTO);
        return ResponseEntity.ok(createdSlot);
    }

    @GetMapping("/all")
    private ResponseEntity<List<SlotDTO>> getAllActiveSlot(){
        List<SlotDTO> allSlots=slotService.getAllActiveSlot();
        return ResponseEntity.ok(allSlots);
    }

    @GetMapping("/morning")
    private ResponseEntity<List<SlotDTO>> getMorningActiveSlot(){
        List<SlotDTO> morningSlots=slotService.getMorningSlot();
        return ResponseEntity.ok(morningSlots);
    }

    @GetMapping("/afternoon")
    private ResponseEntity<List<SlotDTO>> getAfternoonActiveSlot() {
        List<SlotDTO> afternoonSlots = slotService.getAfternoonSlot();
        return ResponseEntity.ok(afternoonSlots);
    }

    @GetMapping("/get")
    private ResponseEntity<SlotDTO> getSlotById(@RequestBody Integer slotId) {
        SlotDTO slotDTO = slotService.getById(slotId);
        return ResponseEntity.ok(slotDTO);
    }

    @GetMapping ResponseEntity<List<SlotDTO>> getSlotByTimeBetween(@RequestBody SlotDTO slotDTO){
        LocalTime startTime=slotDTO.getStartTime();
        LocalTime endTime=slotDTO.getEndTime();
        boolean active=slotDTO.isActive();
        List<SlotDTO> slotDTOS=slotService.getTimeBetweenActiveSlot(startTime,endTime,active);
        return ResponseEntity.ok(slotDTOS);
    }

}
