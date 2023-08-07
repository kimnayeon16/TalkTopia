package com.example.talktopia_chat.api.service;

import org.springframework.stereotype.Service;

import com.example.talktopia_chat.api.request.ChatRoomContentRequest;
import com.example.talktopia_chat.common.util.RandomNumberUtil;
import com.example.talktopia_chat.db.entity.ChatRoom;
import com.example.talktopia_chat.db.entity.ChatRoomParticipants;
import com.example.talktopia_chat.db.entity.SaveChatRoomContent;
import com.example.talktopia_chat.db.repository.ChatRoomParticipantsRepository;
import com.example.talktopia_chat.db.repository.ChatRoomRepository;
import com.example.talktopia_chat.db.repository.SaveChatRoomContentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor  // 의존성 주입
public class ChatService {

	private final ChatRoomRepository chatRoomRepository;
	private final SaveChatRoomContentRepository saveChatRoomContentRepository;
	private final ChatRoomParticipantsRepository chatRoomParticipantsRepository;

	/**
	 * 대화내용 저장
	 * @param chatRoomContentRequest    보낸사람, 내용
	 * @param crId                        채팅방 세션아이디
	 * */
	public void saveIntoMySQL(ChatRoomContentRequest chatRoomContentRequest, long crId) {

		// saveChatRoomContent 생성
		SaveChatRoomContent saveChatRoomContent = SaveChatRoomContent.builder()
			.scrcSenderId(chatRoomContentRequest.getSender())
			.scrcContent(chatRoomContentRequest.getContent())
			.chatRoom(chatRoomRepository.findByCrId(crId))
			.build();

		SaveChatRoomContent saved = saveChatRoomContentRepository.save(saveChatRoomContent);
	}

	// 1. 아이디로 채팅방 조회
	// 2. 채팅한 적 있으면 세션아이디 반환
	// 3. 채팅한 적 없으면 세션 생성 후 반환
	public String enterChat(String userId, String friendId) {
		System.out.println("user, friend: "+userId+", "+friendId);

		// 내가 participant일때 채팅방 찾아 세션 반환
		String res = findParticipantsSession(userId, friendId);
		log.info("내가 주인으로 참여한 채팅방은: "+res);
		if (!res.equals(""))
			return res;

		// 내가 participant_other일 수도 있음
		String res2 = findParticipantsSession(friendId, userId);
		log.info("내가 other로 참여한 채팅방은: "+res2);
		if (!res2.equals(""))
			return res2;

		// 채팅한 적이 없음
		// 세션 생성 후 입장. participant:나, participant other: 친구
		String newSession = makeChatRoom(userId, friendId);
		log.info("새로운 채팅방 세션은: "+newSession);
		return newSession;
		// return makeChatRoom(userId, friendId);
	}



	// 사용자 아이디로 채팅방 조회
	public String findParticipantsSession(String id1, String id2) {
		// 내가 participant일때 채팅방 찾음
		ChatRoomParticipants chatRoomParticipants = chatRoomParticipantsRepository.findByCrpParticipantAndAndCrpParticipantOther(
			id1,
			id2);
		// chatRoomParticipants가 가진 chatroom 엔티티에서 세션아이디 반환.
		try {
			return chatRoomParticipants.getChatRoom().getCrSession();
		}
		catch (NullPointerException e){
			return "";
		}
	}



	// 세션 만들기
	// 1. ChatRoom 만들기
	// 2, ChatRoom에 새로운 세션 넣기
	// 3. ChatRoomParticipant만들기
	// 4. ChatRoomParticipant가 ChatRoom참조하도록 하기
	public String makeChatRoom(String userId, String friendId) {

		// 고유한 세션아이디가 있는 채팅방 생성
		String sessionId = RandomNumberUtil.getRandomNumber();
		ChatRoom newChatRoom = ChatRoom.builder()
			.crSession(sessionId)
			.build();
		newChatRoom = chatRoomRepository.save(newChatRoom);

		// newChatRoom을 참조하는 새로운 chatRoomParticipant생성
		ChatRoomParticipants newChatRoomParticipants = ChatRoomParticipants
			.builder()
			.chatRoom(newChatRoom)
			.crpParticipant(userId)
			.crpParticipantOther(friendId)
			.build();
		newChatRoomParticipants = chatRoomParticipantsRepository.save(newChatRoomParticipants);

		// 세션아이디 반환
		return sessionId;
	}
}
