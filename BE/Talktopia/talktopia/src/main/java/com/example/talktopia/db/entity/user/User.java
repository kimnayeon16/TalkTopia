package com.example.talktopia.db.entity.user;

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

import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.talktopia.db.entity.friend.Friend;
import com.example.talktopia.db.entity.vr.Participants;

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

	@OneToOne
	@JoinColumn(name = "user_img_no")
	private ProfileImg profileImg;

	@OneToOne
	@JoinColumn(name = "user_lang_no")
	private Language language;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Participants> participantsList = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Reminder> reminderList = new ArrayList<>();

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private ReportedUser reportedUser;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Friend> friends = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Friend> friendOf = new ArrayList<>();

	@Builder
	public User(long userNo, String userId, String userPw, String userName, String userEmail) {
		this.userNo = userNo;
		this.userId = userId;
		this.userPw = userPw;
		this.userName = userName;
		this.userEmail = userEmail;
	}

	public User hashPassword(PasswordEncoder passwordEncoder) {
		this.userPw = passwordEncoder.encode(this.userPw);
		return this;
	}
}
