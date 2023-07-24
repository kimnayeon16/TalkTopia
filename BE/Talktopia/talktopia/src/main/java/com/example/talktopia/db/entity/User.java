package com.example.talktopia.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.talktopia.db.entity.vr.VRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue
	private long user_no;

	@Column(length = 50)
	private String user_id;

	@Column(length = 100)
	private String user_pw;

	@Column(length = 30)
	private String user_name;

	@Column(length = 45)
	private String user_email;

	@ManyToOne
	@JoinColumn(name = "vr_session")
	private VRoom vRoom;

	@Builder
	public User(long user_no, String user_id, String user_pw, String user_name, String user_email) {
		this.user_no = user_no;
		this.user_id = user_id;
		this.user_pw = user_pw;
		this.user_name = user_name;
		this.user_email = user_email;
	}
}
