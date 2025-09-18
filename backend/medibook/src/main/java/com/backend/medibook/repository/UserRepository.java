package com.backend.medibook.repository;

import com.backend.medibook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUserId(Integer userId);

    Optional<User> findByUsername(String username);

    boolean existsByUsernameA(String username);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    List<User> findByActive(boolean active);

    List<User> findByNameContainingAndActive(String name,boolean active);
}
