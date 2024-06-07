package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.entities.Reservation;
import com.group09.travelPlanner.repository.HotelRepository;
import com.group09.travelPlanner.repository.ReservationRepository;
import com.group09.travelPlanner.responses.ReservationDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> findReservationsByHotelID(Long hotelID) {
        return reservationRepository.findByHotel_HotelID(hotelID);
    }

    public Reservation createReservation(Reservation reservation, Integer hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId).orElseThrow(() -> new RuntimeException("not found"));
        reservation.setHotel(hotel);
        return reservationRepository.save(reservation);
    }

    public List<ReservationDTO> getUserReservations(Long userID) {
        List<Reservation> reservations = reservationRepository.findByUserID(userID);
        return reservations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setReservationID(reservation.getReservationID());
        reservationDTO.setStartDate(reservation.getStartDate());
        reservationDTO.setEndDate(reservation.getEndDate());
        reservationDTO.setRoom_typeID(reservation.getRoom_typeID());
        reservationDTO.setUserID(reservation.getUserID());
        reservationDTO.setHotelID(reservation.getHotel().getHotelID().longValue()); 
        return reservationDTO;
    }

    public boolean deleteReservation(Long reservationID) {
        if (reservationRepository.existsById(reservationID)) {
            reservationRepository.deleteById(reservationID);
            return true;
        } else {
            return false;
        }
    }
}