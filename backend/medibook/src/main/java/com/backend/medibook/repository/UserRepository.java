package com.backend.medibook.repository;

import com.backend.medibook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    List<User> findByActive(boolean active);

    Optional<User> findByUserId(Integer userId);

    Optional<User> findByUsername(String username);

    List<User> findByUsernameContainingAndActive(String username,boolean active);

    boolean existsByUsername(String username);

    List<User> findByNameContainingAndActive(String name,boolean active);

    Optional<User> findByEmail(String email);

    List<User> findByEmailContainingAndActive(String email,boolean active);

    boolean existsByEmail(String email);

    List<User> findByPhoneNumberContainingAndActive(String phoneNumber,boolean active);

    boolean existsByPhoneNumber(String phoneNumber);


    Optional<User> getByPhoneNumber(String phoneNumber);
}
