package com.example.talktopia.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia.db.entity.Token;

public interface TokenRepository extends JpaRepository<Token, String> {
	Optional<Token> findByUserUserNo(long userNo);
}
