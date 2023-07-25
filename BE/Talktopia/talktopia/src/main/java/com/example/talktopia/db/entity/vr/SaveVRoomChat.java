package com.example.talktopia.db.entity.vr;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "save_video_room_chat")
public class SaveVRoomChat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "svrc_id")
	private long svrcId;

	@Column(length = 500, name = "svrc_sender")
	private String svrcSender;

	@Column(name = "svrc_messag")
	private String svrcMessag;

	@CreatedDate
	@Column(name = "svrc_send_time")
	private LocalDateTime svrcSendTime;

	@ManyToOne
	private SaveVRoom saveVRoom;
}