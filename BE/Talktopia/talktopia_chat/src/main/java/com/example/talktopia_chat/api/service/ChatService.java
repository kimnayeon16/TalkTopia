package com.example.talktopia_chat.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.talktopia_chat.api.request.ChatRoomContentRequest;
import com.example.talktopia_chat.api.response.PagingChatResponse;
import com.example.talktopia_chat.common.util.DateFormatPattern;
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

	// 1. 아이디로 채팅방 조회
	// 2. 채팅한 적 있으면 세션아이디 반환
	// 3. 채팅한 적 없으면 세션 생성 후 반환
	public String enterChat(String userId, String friendId) {
		System.out.println("user, friend: "+userId+", "+friendId);

		// 내가 participant일때 채팅방 찾아 세션 반환
		String res = findParticipantsSession(userId, friendId);
		log.info("내가 주인으로 참여한 채팅방은: "+res);
		// if (!res.equals(""))
		if (res!=null)
			return res;

		// 내가 participant_other일 수도 있음
		String res2 = findParticipantsSession(friendId, userId);
		log.info("내가 other로 참여한 채팅방은: "+res2);
		// if (!res2.equals(""))
		if(res2!=null)
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
			id2).orElseThrow(()->new RuntimeException(id1+"과 "+id2+"가 참여자인 채팅방이 없습니다."));
		// chatRoomParticipants가 가진 chatroom 엔티티에서 세션아이디 반환.
		try {
			return chatRoomParticipants.getChatRoom().getCrSession();
		}
		catch (NullPointerException e){
			return null;
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


	/**
	 * MySQL에 있는 데이터 커서 기반 페이징해서 가져오기
	 * */
	public PagingChatResponse getPagingChat(String sessionId, String sendTime) {

		// 커서 값 (sendTime) 기반으로 정렬 조건 생성
		Sort sort = Sort.by(Sort.Direction.DESC, "scrcSendTime");

		// 페이지 크기 설정
		int pageSize = 30;

		// string으로 된 시간을 LocalDateTime으로 변환

		// Pageable 객체 생성
		Pageable pageable;

		// 클라이언트로부터 커서 (sendTime)받음
		if(sendTime!=null && !sendTime.isEmpty()){
			LocalDateTime realSendTime = LocalDateTime.parse(sendTime, DateTimeFormatter.ofPattern(DateFormatPattern.get()));
			pageable = PageRequest.of(0, pageSize, sort);

			// MySQL에서 커서 값 이전의 데이터 가져오기(pageable이 sort하고 개수 지정함)
			Page<SaveChatRoomContent> pageResult = saveChatRoomContentRepository.findByScrcSendTimeBeforeAndChatRoom_CrSession(sessionId, realSendTime, pageable);
			if (pageResult==null||pageResult.getSize()==0) new RuntimeException("메세지 내역을 가져오지 못했습니다.");

			// 가져온 데이터로 리스트생성
			List<SaveChatRoomContent> chatList = pageResult.getContent();
			Boolean hasNext = pageResult.hasNext();

			return new PagingChatResponse(chatList, hasNext);
		}
		// 커서 못받음
		else{
			pageable = PageRequest.of(0, pageSize, sort);

			Page<SaveChatRoomContent> pageResult = saveChatRoomContentRepository.findByChatRoom_CrSession(sessionId, pageable);
			if (pageResult==null||pageResult.getSize()==0) new RuntimeException("메세지 내역을 가져오지 못했습니다.");

			List<SaveChatRoomContent> chatList = pageResult.getContent();
			Boolean hasNext = pageResult.hasNext();

			return new PagingChatResponse(chatList, hasNext);
		}



		// final List<SaveChatRoomContent> chats = getChats(sessionId, sendTime, page);
		// final Long lastIdOfList = chats.isEmpty() ?
		// 	null : chats.get(chats.size() - 1).getScrcNo();
		//
		// return new PagingChatResponse(chats, hasNext(lastIdOfList));
	}

	// private List<Board> getChats(String sessionId, String sendTime, Pageable page) {
	// 	return id == null ?
	// 		this.boardRepository.findAllByOrderByIdDesc(page) :
	// 		this.boardRepository.findByIdLessThanOrderByIdDesc(id, page);
	// }
	//
	// private Boolean hasNext(Long id) {
	// 	if (id == null) return false;
	// 	return saveChatRoomContentRepository.existsByIdLessThan(id);
	// }
}
