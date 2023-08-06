package com.example.talktopia_chat.api.controller;// package com.example.chattest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.talktopia_chat.api.request.ChatRoomContentRequest;
import com.example.talktopia_chat.api.service.ChatService;

/**
 * ChatController는 채팅하는 것 자체를 담당함.
 * 웹소켓 기반으로 채팅
 * */
@Controller
public class WebsocketChatController {
	private ChatService chatService;

	@Autowired
	private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달


	// 클라이언트가 send 하는 경로
	//stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
	// /app/send/{crId}
	@MessageMapping("/send/{crId}")
	// @SendTo("/topic/sub/{crId}")     // 메세지 전송하는곳
	public void streamText(@Payload ChatRoomContentRequest chatRoomContentRequest,
		@DestinationVariable("crId") String id) {

		System.out.println("sender: " + chatRoomContentRequest.getSender());
		System.out.println("content: " + chatRoomContentRequest.getContent());
		System.out.println("session id: "+id);

		// 웹소켓 주소에 담긴 세션아이디를 long으로 변환
		long crId = Long.parseLong(id);

		// 채팅 내용 MySQL에 저장 (실험용)
		chatService.saveIntoMySQL(chatRoomContentRequest, crId);

		ChatRoomContentRequest res = chatRoomContentRequest;

		template.convertAndSend("/topic/sub/" + id, res);
	}
}
