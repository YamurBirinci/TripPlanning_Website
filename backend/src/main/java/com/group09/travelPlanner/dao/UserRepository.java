package com.group09.travelPlanner.dao;

import com.group09.travelPlanner.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMailAndPassword(String mail, String password);
}
