package com.example.talktopia.db.entity.vr;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
	@GeneratedValue
	private long svrc_id;

	@Column(length = 500)
	private String svrc_sender;

	@Column
	private String svrc_messag;

	@CreatedDate
	private LocalDateTime svrc_send_time;

	@ManyToOne
	@JoinColumn(name = "saveVroom_id") // user_id는 User 엔티티의 기본 키를 참조하는 외래 키
	private SaveVRoom saveVRoom;
}