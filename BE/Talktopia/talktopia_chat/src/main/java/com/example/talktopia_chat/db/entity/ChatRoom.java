package com.example.talktopia_chat.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "chat_room")
public class ChatRoom {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cr_no")
	private long crNo;

	@Column(name = "cr_id", length = 100, unique = true)
	private String crId;

	@OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
	private List<SaveChatRoomContent> saveChatRoomContentsList = new ArrayList<SaveChatRoomContent>();

	@OneToOne(mappedBy = "chatRoom", cascade = CascadeType.ALL)
	private ChatRoomParticipants chatRoomParticipants;
}
