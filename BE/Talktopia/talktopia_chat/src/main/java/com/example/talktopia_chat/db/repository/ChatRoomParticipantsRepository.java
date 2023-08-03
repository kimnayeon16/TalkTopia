package com.example.talktopia_chat.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia_chat.db.entity.ChatRoomParticipants;

public interface ChatRoomParticipantsRepository extends JpaRepository<ChatRoomParticipants, Long> {
	ChatRoomParticipants findByCrpNo(long crpNo);

	List<ChatRoomParticipants> findAll();


}

