package com.example.talktopia_chat.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia_chat.db.entity.SaveChatRoomContent;

public interface SaveChatRoomContentRepository extends JpaRepository<SaveChatRoomContent, Long> {
	SaveChatRoomContent findByScrcNo(long scrcNo);

	List<SaveChatRoomContent> findAll();

	// SaveChatRoomContent save
	// SaveChatRoomContent deleteByScrcNo(long scrcNo);
}

