package com.example.talktopia_chat.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia_chat.db.entity.ChatRoom;
import com.example.talktopia_chat.db.entity.ChatRoomParticipants;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
	ChatRoom findByCrNo(long crNo);

	// 세션아이디로 조회
	ChatRoom findByCrSession(String crSession);

	List<ChatRoom> findAll();

	// // ChatRoom 엔티티의 id를 통해 SaveChatRoomContent 엔티티 조회
	// SaveChatRoomContentRepository findSaveChatRoomContentByCrNo(long crNo);
	//
	// // ChatRoom 엔티티의 id를 통해 ChatRoomParticipants 엔티티 조회
	// ChatRoomParticipants findChatRoomParticipantsByCrno(long crNo);

	// 외부채팅방 삭제
	ChatRoom deleteByCrNo(long crNo);


}
