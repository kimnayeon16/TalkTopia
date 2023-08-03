package com.example.talktopia_chat.api.service;

import org.springframework.stereotype.Service;

import com.example.talktopia_chat.api.request.ChatRoomContentRequest;
import com.example.talktopia_chat.db.entity.SaveChatRoomContent;
import com.example.talktopia_chat.db.repository.ChatRoomRepository;
import com.example.talktopia_chat.db.repository.SaveChatRoomContentRepository;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@Service
@Slf4j
public class ChatService {

	private SaveChatRoomContentRepository saveChatRoomContentRepository;
	private ChatRoomRepository chatRoomRepository;

	/**
	 * 대화내용 저장
	 * @param chatRoomContentRequest	보낸사람, 내용
	 * @param crId 						채팅방 세션아이디
	 * */
	public void saveIntoMySQL(ChatRoomContentRequest chatRoomContentRequest, long crId){

		// saveChatRoomContent 생성
		SaveChatRoomContent saveChatRoomContent = SaveChatRoomContent.builder()
			.scrcSenderId(chatRoomContentRequest.getSender())
			.scrcContent(chatRoomContentRequest.getContent())
			.chatRoom(chatRoomRepository.findByCrId(crId))
			.build();

		SaveChatRoomContent saved = saveChatRoomContentRepository.save(saveChatRoomContent);
	}
}
