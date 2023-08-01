package com.example.talktopia_chat.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "save_chat_room_content")
public class SaveChatRoomContent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "scrc_no")
	private long scrcNo;

	@Column(name = "scrc_content", length = 255)
	private String scrcContent;

	@Column(name = "scrc_sender_id", length = 50)
	private String scrcSenderId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="scrc_cr_no")
	private ChatRoom chatRoom;

	private  void setChatRoom(ChatRoom chatRoom){
		this.chatRoom = chatRoom;
		if(chatRoom != null){
			chatRoom.getSaveChatRoomContentsList().add(this);
		}
	}
}
