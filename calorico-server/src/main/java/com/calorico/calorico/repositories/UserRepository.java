package com.calorico.calorico.repositories;

import com.calorico.calorico.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
