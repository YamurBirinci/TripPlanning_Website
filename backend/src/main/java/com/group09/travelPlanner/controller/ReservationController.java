package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.Reservation;
import com.group09.travelPlanner.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/hotel/{hotelID}")
    public ResponseEntity<List<Reservation>> getReservationsByHotelID(@PathVariable Long hotelID) {
        List<Reservation> reservations = reservationService.findReservationsByHotelID(hotelID);
        return ResponseEntity.ok(reservations);
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation, @RequestParam Integer hotelId) {
        return reservationService.createReservation(reservation, hotelId);
    }

    @DeleteMapping("/{reservationID}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long reservationID) {
        boolean isDeleted = reservationService.deleteReservation(reservationID);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}