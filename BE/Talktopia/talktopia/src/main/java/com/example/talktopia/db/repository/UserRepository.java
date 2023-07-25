package com.example.talktopia.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.talktopia.db.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUserId(String userId); // 유저 아이디로 user 조회

	List<User> findAll(); // 전체 조회
}
