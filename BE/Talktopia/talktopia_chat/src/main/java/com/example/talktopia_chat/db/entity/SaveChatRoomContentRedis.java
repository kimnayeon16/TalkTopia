package com.example.talktopia_chat.db.entity;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;

import org.springframework.data.redis.core.RedisHash;

import lombok.Builder;
import lombok.Getter;

@Getter
// value는 redis의 keyspace
// timeToLive는 만료시간이고 -1L은 만료시간 없음
// @RedisHash(value="save_chat_room_content", timeToLive = -1L) <- redis repository안쓰면 필요X
public class SaveChatRoomContentRedis {
	// @Id // keyspace:id
	private String scrcSession; // scrcSession(세션아이디)가 redis key.

	private String scrcSenderId;
	private String scrcContent;
	private String scrcSendTime;

	@Builder
	public SaveChatRoomContentRedis(String scrcSession, String scrcContent, String scrcSenderId,
		String scrcSendTime) {
		this.scrcSession = scrcSession;
		this.scrcContent = scrcContent;
		this.scrcSenderId = scrcSenderId;
		this.scrcSendTime = scrcSendTime;
	}
}
