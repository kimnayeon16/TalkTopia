package com.example.talktopia_chat.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "chat_room_participants")
public class ChatRoomParticipants {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="crp_no")
	private long crpNo;

	@Column(name="crp_participant", length = 50)
	private String crpParticipant;

	@Column(name="crp_particpant_other", length = 50)
	private String crpParticipantOther;

	@OneToOne
	@JoinColumn(name="crp_cr_no")
	private ChatRoom chatRoom;
}