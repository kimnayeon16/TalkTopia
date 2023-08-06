package com.example.talktopia_chat.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.example.talktopia_chat.db.entity.SaveChatRoomContent;

@Configuration
public class RedisConfig {

	@Value("${spring.redis.host}")
	private String host;

	@Value("${spring.redis.port}")
	private int port;

	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		return new LettuceConnectionFactory(host, port);
	}

	@Bean
	public RedisTemplate<Long, SaveChatRoomContent> redisTemplate() {
		RedisTemplate<Long, SaveChatRoomContent> redisTemplate = new RedisTemplate<>();

		redisTemplate.setConnectionFactory(redisConnectionFactory());

		// Long 타입 serizlize
		redisTemplate.setKeySerializer(new GenericToStringSerializer<>(Long.class));
		// SaveChatRoomContent를 Value Serializer로 설정
		redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(SaveChatRoomContent.class));
		
		//
		// // Hash를 사용할 경우 시리얼라이저
		// redisTemplate.setHashKeySerializer(new StringRedisSerializer());
		// redisTemplate.setHashValueSerializer(new StringRedisSerializer());
		//
		// // 모든 경우
		// redisTemplate.setDefaultSerializer(new StringRedisSerializer());

		return redisTemplate;
	}
}
