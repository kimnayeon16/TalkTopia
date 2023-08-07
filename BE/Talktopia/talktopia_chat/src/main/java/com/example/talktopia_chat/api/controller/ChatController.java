package com.example.talktopia_chat.api.controller;// package com.example.chattest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia_chat.api.request.ChatRoomContentRequest;
import com.example.talktopia_chat.api.request.EnterChatRequest;
import com.example.talktopia_chat.api.response.EnterChatResponse;
import com.example.talktopia_chat.api.service.ChatService;
import com.example.talktopia_chat.api.service.SaveChatRoomContentRedisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {
	private final ChatService chatService;
	private final SaveChatRoomContentRedisService saveChatRoomContentRedisService;

	/**
	 * 참여자와 상대방의 채팅방 입장.
	 * 채팅한 적 없을 시 채팅방 만들고 입장함.
	 * @param enterChatRequest    userId, friendId
	 * @return session + 대화내역
	 * */
	@PostMapping("/enter")
	public ResponseEntity<EnterChatResponse> enterChat(@RequestBody EnterChatRequest enterChatRequest) {
		System.out.println("/enter call");
		String userId = enterChatRequest.getUserId();
		String friendId = enterChatRequest.getFriendId();
		System.out.println("user, friend: " + userId + ", " + friendId);

		// userId와 friendId로 세션아이디 가져옴
		String sessionId = chatService.enterChat(userId, friendId);

		// 세션아이디로 대화내역 불러오기
		EnterChatResponse enterChatResponse = saveChatRoomContentRedisService.getAllChat(sessionId);

		return ResponseEntity.ok().body(enterChatResponse);
	}

	//굳이...?있어야되나
	@GetMapping("/exit/{chatRoomNo}")
	public void exitChat(@PathVariable("chatRoomNo") long chatRoomNo) {
	}
}
