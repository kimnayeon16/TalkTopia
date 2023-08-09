package com.example.talktopia_chat.common.util.scheduler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.talktopia_chat.common.util.ChatSetToListUtil;
import com.example.talktopia_chat.common.util.DateFormatPattern;
import com.example.talktopia_chat.db.entity.ChatRoom;
import com.example.talktopia_chat.db.entity.SaveChatRoomContent;
import com.example.talktopia_chat.db.entity.SaveChatRoomContentRedis;
import com.example.talktopia_chat.db.repository.ChatRoomRepository;
import com.example.talktopia_chat.db.repository.SaveChatRoomContentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WriteBackRedisByKey {

	private final RedisTemplate<String, SaveChatRoomContentRedis> redisTemplate;
	private final ChatRoomRepository chatRoomRepository;
	private final SaveChatRoomContentRepository saveChatRoomContentRepository;

	@Transactional
	public void writeBackForKey(String sessionId) {
		log.info("writeBack start - {}", sessionId);

		// Redis에 저장된 키 값으로 ZSet조회 => list로 반환
		List<SaveChatRoomContentRedis> chatList = ChatSetToListUtil.convert(sessionId, redisTemplate);

		// chatList의 값들을 SaveChatRoomContent 엔티티로 변환하여 MySQL에 저장
		List<SaveChatRoomContent> chatListIntoMySQL = new ArrayList<>();
		for (SaveChatRoomContentRedis chat : chatList) {
			SaveChatRoomContent scrc = convertToSaveChatRoomContent(chat);
			chatListIntoMySQL.add(scrc);
		}

		// MySQL에 저장
		saveChatRoomContentRepository.saveAll(chatListIntoMySQL);
		redisTemplate.delete(sessionId);

		log.info("wrtieBack end - {}", sessionId);
	}

	// SaveChatRoomContentRedis -> SaveChatRoomContent
	private SaveChatRoomContent convertToSaveChatRoomContent(SaveChatRoomContentRedis scrcr) {
		SaveChatRoomContent res = SaveChatRoomContent.builder()
			.scrcSenderId(scrcr.getScrcSenderId())
			.scrcContent(scrcr.getScrcContent())
			.chatRoom(
				chatRoomRepository.findByCrSession(scrcr.getScrcSession())
					.orElseThrow(() -> new RuntimeException(scrcr.getScrcSession() + "을 세션으로하는 채팅방이 없습니다."))
			)
			// string to LocalDateTime
			.scrcSendTime(
				LocalDateTime.parse(scrcr.getScrcSendTime(), DateTimeFormatter.ofPattern(DateFormatPattern.get())))
			.build();
		return res;
	}
}

