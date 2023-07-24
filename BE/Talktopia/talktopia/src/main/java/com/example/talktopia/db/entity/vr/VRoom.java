package com.example.talktopia.db.entity.vr;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.example.talktopia.db.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "video_room")
public class VRoom {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "vr_session")
	private long vrSession;

	@Column(length = 50, name = "vr_max_cnt")
	private int vrMaxCnt;

	@Column(name = "vr_enter")
	private boolean vrEnter;

	@Column(name = "vr_type")
	private boolean vrType;

	@CreatedDate
	@Column(name = "vr_create_time")
	private LocalDateTime vrCreateTime;

	@Column(name = "vr_curr_cnt")
	private int vrCurrCnt;

	@LastModifiedDate
	@Column(name = "vr_close_time")
	private LocalDateTime vrCloseTime;

	@OneToMany(mappedBy = "vRoom")
	List<User> user = new ArrayList<>();
	//... getter, setter

	@OneToMany(mappedBy = "vRoom")
	List<SaveVRoom> saveVRooms = new ArrayList<>();
	//... getter, setter

}
