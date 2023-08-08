package com.example.talktopia_chat.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia_chat.db.entity.SaveChatRoomContent;

public interface SaveChatRoomContentRepository extends JpaRepository<SaveChatRoomContent, Long> {
	Optional<SaveChatRoomContent> findByScrcNo(long scrcNo);

	List<SaveChatRoomContent> findAll();

	List<SaveChatRoomContent> findByChatRoom_crNo(long crNo);

	// SaveChatRoomContent save
	// SaveChatRoomContent deleteByScrcNo(long scrcNo);
}

