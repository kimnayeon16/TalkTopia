package com.example.talktopia_chat.api.service;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.talktopia_chat.api.request.EnterChatRequest;
import com.example.talktopia_chat.api.response.EnterChatResponse;
import com.example.talktopia_chat.db.entity.SaveChatRoomContentRedis;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SaveChatRoomContentRedisService {

	private final RedisTemplate<String, SaveChatRoomContentRedis> redisTemplate;

	// public SaveChatRoomContentRedis(RedisTemplate<Long, SaveChatRoomContentRedis> redisTemplate) {
	// 	this.redisTemplate = redisTemplate;
	// }

	// insert과정은 캐싱하지 않음으로서 새로운 메세지가 가면 select다시 하게 함(??)
	public void saveChat(SaveChatRoomContentRedis saveChatRoomContentRedis) {
		String scrcSession = saveChatRoomContentRedis.getScrcSession();

		// scrcSession을 key로 하는 채팅 내역이 리스트로 저장됨
		redisTemplate.opsForList().leftPush(scrcSession, saveChatRoomContentRedis);
	}

	// public List<SaveChatRoomContentRedis> getAllChat(String scrcSession){

	// 채팅 메세지를 캐싱하여 동일한 쿼리를 redis에 계속 실행할 필요 없음
	@Cacheable(value="chatRoomContent", key="#scrcSession", cacheManager = "rcm")
	public EnterChatResponse getAllChat(String scrcSession) {
		Long size = redisTemplate.opsForList().size(scrcSession);

		// scrcSession을 key로 하는 모든 리스트의 내역 가져옴
		List<SaveChatRoomContentRedis> chatList = redisTemplate.opsForList().range(scrcSession, 0, size - 1);
		// scrcSession과 함께 반환
		return new EnterChatResponse(scrcSession, chatList);
	}

}
