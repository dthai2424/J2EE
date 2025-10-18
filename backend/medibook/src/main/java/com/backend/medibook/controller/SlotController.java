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
    public ResponseEntity<SlotDTO> createSlot(@RequestBody SlotDTO slotDTO){
        // Không cần try-catch, GlobalExceptionHandler sẽ bắt SlotInvalidException (400)
        SlotDTO createdSlot=slotService.create(slotDTO);
        return ResponseEntity.ok(createdSlot);
    }

    @GetMapping("/all")
    public ResponseEntity<List<SlotDTO>> getAllActiveSlot(){
        List<SlotDTO> allSlots=slotService.getAllActiveSlot();
        return ResponseEntity.ok(allSlots);
    }

    @GetMapping("/morning")
    public ResponseEntity<List<SlotDTO>> getMorningActiveSlot(){
        List<SlotDTO> morningSlots=slotService.getMorningSlot();
        return ResponseEntity.ok(morningSlots);
    }

    @GetMapping("/afternoon")
    public ResponseEntity<List<SlotDTO>> getAfternoonActiveSlot() {
        List<SlotDTO> afternoonSlots = slotService.getAfternoonSlot();
        return ResponseEntity.ok(afternoonSlots);
    }

    /**
     * Sửa lại: Dùng @PathVariable để lấy ID từ đường dẫn (ví dụ: /api/slot/1)
     * thay vì @RequestBody.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SlotDTO> getSlotById(@PathVariable("id") Integer slotId) {
        // Không cần try-catch, GlobalExceptionHandler sẽ bắt SlotNotFoundException (404)
        SlotDTO slotDTO = slotService.getById(slotId);
        return ResponseEntity.ok(slotDTO);
    }

    /**
     * Sửa lại: Dùng @RequestParam để lấy tham số từ query URL
     * (ví dụ: /api/slot/search?startTime=08:00&endTime=12:00)
     * thay vì @RequestBody.
     */
    @GetMapping("/search")
    public ResponseEntity<List<SlotDTO>> getSlotByTimeBetween(
            @RequestParam LocalTime startTime,
            @RequestParam LocalTime endTime,
            @RequestParam(defaultValue = "true") boolean active){

        List<SlotDTO> slotDTOS = slotService.getTimeBetweenActiveSlot(startTime, endTime, active);
        return ResponseEntity.ok(slotDTOS);
    }
}