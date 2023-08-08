package com.example.talktopia.db.repository;

import java.util.List;
import java.util.Optional;

import org.hibernate.sql.ordering.antlr.ColumnMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talktopia.db.entity.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUserId(String userId); // 유저 아이디로 user 조회

	boolean existsByByUserId(String userId); // 유저 아이디로 user 조회

	List<User> findAll(); // 전체 조회

	Optional<User> deleteByUserId(String userId); // 유저 삭제

	Optional<User> findByUserNameAndUserEmail(String userName, String userEmail); // 유저 이름과 이메일로 아이디 찾기

	Optional<User> findByUserIdAndUserEmail(String userId, String userEmail);

	Optional<User> findByUserNameAndUserEmailAndUserId(String userName, String userEmail, String userId);

	Optional<User> findByUserEmail(String email);

	User findByUserNo(Long tmp);
}
