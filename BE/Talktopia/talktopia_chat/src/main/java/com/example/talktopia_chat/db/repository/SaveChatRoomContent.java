package com.example.talktopia_chat.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia_chat.db.entity.ChatRoom;

public interface SaveChatRoomContent extends JpaRepository<SaveChatRoomContent, Long> {
	SaveChatRoomContent findByScrcNo(long scrcNo);

	List<SaveChatRoomContent> findAll();

	// SaveChatRoomContent deleteByScrcNo(long scrcNo);
}

