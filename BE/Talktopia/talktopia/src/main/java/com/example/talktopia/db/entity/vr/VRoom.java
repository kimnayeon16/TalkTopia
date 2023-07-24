package com.example.talktopia.db.entity.vr;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
	@GeneratedValue
	private long vr_session;

	@Column(length = 50)
	private int vr_max_cnt;

	@Column
	private boolean vr_enter;

	@Column
	private boolean vr_type;

	@CreatedDate
	private LocalDateTime vr_create_time;

	@Column
	private int vr_curr_cnt;

	@LastModifiedDate
	private LocalDateTime vr_close_time;

	@OneToMany(mappedBy = "vRoom")
	List<User> user = new ArrayList<>();
	//... getter, setter

	@OneToMany(mappedBy = "vRoom")
	List<SaveVRoom> saveVRooms = new ArrayList<>();
	//... getter, setter

}
