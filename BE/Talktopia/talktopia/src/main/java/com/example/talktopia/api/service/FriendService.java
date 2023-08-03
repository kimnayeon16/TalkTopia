package com.example.talktopia.api.service;

import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.FriendAddRequest;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.friend.Friend;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.repository.FriendRepository;
import com.example.talktopia.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FriendService {

	private final FriendRepository friendRepository;
	private final UserRepository userRepository;

	// 친구 추가
	public Message addFriend(FriendAddRequest friendAddRequest) {
		// userId 기준으로 추가
		User user = userRepository.findByUserId((friendAddRequest.getUserId()))
			.orElseThrow(() -> new RuntimeException("해당 유저가 존재하지 않습니다."));

		// partId 기준으로 추가
		User part = userRepository.findByUserId(friendAddRequest.getPartId())
			.orElseThrow(() -> new RuntimeException("해당 유저가 존재하지 않습니다."));

		Friend addFriends = Friend.builder()
			.user(user)
			.build();

		friendRepository.save(addFriends);
		return new Message("친구 등록이 완료되었습니다.");
	}
}
