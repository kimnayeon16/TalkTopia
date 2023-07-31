package com.example.talktopia.db.entity.vr;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "save_video_room")
public class SaveVRoom {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "svr_no")
	private long svrNo;

	@CreatedDate
	@Column(name = "svr_create_time")
	private LocalDateTime svrCreateTime;

	@LastModifiedDate
	@Column(name = "svr_close_time")
	private LocalDateTime svrCloseTime;

	@ManyToOne
	@JoinColumn(name = "vroom_id") // user_id는 User 엔티티의 기본 키를 참조하는 외래 키
	private VRoom vRoom;

	@OneToMany(mappedBy = "saveVRoom")
	List<ReportList> reportLists = new ArrayList<>();
	//... getter, setter

	@OneToMany(mappedBy = "saveVRoom")
	List<SaveVRoomChat> saveVRoomChats = new ArrayList<>();
	//... getter, setter
}
