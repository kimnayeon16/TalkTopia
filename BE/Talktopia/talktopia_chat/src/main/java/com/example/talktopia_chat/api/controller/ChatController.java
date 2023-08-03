package com.example.talktopia_chat.api.controller;// package com.example.chattest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.talktopia_chat.api.request.ChatRoomContentRequest;

/**
 * ChatController는 채팅하는 것 자체를 담당함.
 * 웹소켓 기반으로 채팅
 * */
@Controller
public class ChatController {
	// 클라이언트가 send 하는 경로
	//stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
	// /app/send/{crId}
	@MessageMapping("/send/{crId}")
	@SendTo("/topic/sub/{crId}")     // 메세지 전송하는곳
	public ChatRoomContentRequest streamText(@Payload ChatRoomContentRequest chatRoomContentRequest,
		@DestinationVariable("crId") String crId) {
		System.out.println("handle message: " + chatRoomContentRequest.toString());

	}
}
