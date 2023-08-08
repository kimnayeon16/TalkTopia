package com.example.talktopia_chat.common.util.scheduler;

import java.util.List;
import java.util.Set;


import org.springframework.data.redis.core.BoundZSetOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.talktopia_chat.api.service.SaveChatRoomContentRedisService;
import com.example.talktopia_chat.db.entity.SaveChatRoomContent;
import com.example.talktopia_chat.db.entity.SaveChatRoomContentRedis;
import com.example.talktopia_chat.db.repository.ChatRoomRepository;
import com.example.talktopia_chat.db.repository.SaveChatRoomContentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class WriteBackByRedisCapacityScheduler {

	private final RedisTemplate<String, SaveChatRoomContentRedis> redisTemplate;
	private final WriteBackRedisByKey writeBackRedisByKey;

	// 1시간 마다 200사이즈 넘는 Redis -> MySQL
	@Scheduled(cron = "0 0 0/1 * * *") // 1시간마다 실행
	public void writeBack() {
		log.info("writeBack 시작");

		Set<String> allKeys = redisTemplate.keys("*");
		for(String key : allKeys){
			Long zSetSize = redisTemplate.opsForZSet().size(key);
			if(zSetSize!=null && zSetSize>=200){
				log.info("'{}'키의 사이즈는 {}. 백업함.", key, zSetSize);
				writeBackRedisByKey.writeBackForKey(key);
			}
		}
	}

}
