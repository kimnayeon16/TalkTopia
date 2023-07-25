package com.example.talktopia.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia.db.entity.Token;

public interface TokenRepository extends JpaRepository<Token, String> {
	// Optional<Token> findByToken(String refreshToken);
}
