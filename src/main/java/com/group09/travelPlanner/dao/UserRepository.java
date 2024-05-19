package com.group09.travelPlanner.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//import com.group09.travelPlanner.dao.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
