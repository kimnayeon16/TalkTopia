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
import com.example.talktopia_chat.api.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {
	private final ChatService chatService;

	/**
	 * 참여자와 상대방의 채팅방 입장.
	 * 채팅한 적 없을 시 채팅방 만들고 입장함.
	 * @param enterChatRequest	userId, friendId
	 * @return 		session 값
	 * */
	@PostMapping("/enter")
	public ResponseEntity<String> enterChat(@RequestBody EnterChatRequest enterChatRequest) {
		System.out.println("/enter call");
		String userId = enterChatRequest.getUserId();
		String friendId = enterChatRequest.getFriendId();
		System.out.println("user, friend: "+userId+", "+friendId);
		return ResponseEntity.ok().body(chatService.enterChat(userId, friendId));
	}

	//굳이...?있어야되나
	@GetMapping("/exit/{chatRoomNo}")
	public void exitChat(@PathVariable("chatRoomNo") long chatRoomNo){
	}
}
