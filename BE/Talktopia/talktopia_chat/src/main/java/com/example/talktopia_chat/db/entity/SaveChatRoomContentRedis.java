package com.example.talktopia_chat.db.entity;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.redis.core.RedisHash;

import lombok.Builder;
import lombok.Getter;

@Getter
// value는 redis의 keyspace
// timeToLive는 만료시간이고 -1L은 만료시간 없음
@RedisHash(value="save_chat_room_content", timeToLive = -1L)
public class SaveChatRoomContentRedis {
	@Id // keyspace:id
	private long scrcNo; // scrcNp가 redis key.

	private String scrcContent;
	private String scrcSenderId;
	private LocalDateTime scrcSendTime;
	private ChatRoom chatRoom;

	@Builder
	public SaveChatRoomContentRedis(long scrcNo, String scrcContent, String scrcSenderId,
		LocalDateTime scrcSendTime, ChatRoom chatRoom) {
		this.scrcNo = scrcNo;
		this.scrcContent = scrcContent;
		this.scrcSenderId = scrcSenderId;
		this.scrcSendTime = scrcSendTime;
		this.chatRoom = chatRoom;
	}
}
