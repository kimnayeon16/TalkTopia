package com.example.talktopia.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.talktopia.api.request.UserJoinRequest;
import com.example.talktopia.db.entity.vr.VRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_no")
	private long userNo;

	@Column(length = 50, name = "user_id")
	private String userId;

	@Column(length = 100, name = "user_pw")
	private String userPw;

	@Column(length = 30, name = "user_name")
	private String userName;

	@Column(length = 45, name = "user_email")
	private String userEmail;

	@ManyToOne
	@JoinColumn(name = "vr_session")
	private VRoom vRoom;

	@Builder
	public User(UserJoinRequest userJoinRequest) {
		this.userId = userJoinRequest.getUserId();
		this.userPw = userJoinRequest.getUserPw();
		this.userName = userJoinRequest.getUserName();
		this.userEmail = userJoinRequest.getUserEmail();
	}

}
