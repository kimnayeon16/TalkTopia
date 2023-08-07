package com.example.talktopia_chat.db.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.talktopia_chat.db.entity.ChatRoom;
import com.example.talktopia_chat.db.entity.SaveChatRoomContentRedis;

public interface SaveChatRoomContentRedisRepository extends CrudRepository<SaveChatRoomContentRedis, Long> {

	SaveChatRoomContentRepository findByScrcSession(String scrcSession);
}
