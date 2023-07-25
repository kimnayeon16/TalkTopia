package com.example.talktopia.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "token")
public class Token {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "t_no")
	private long tNo;

	@Column(name = "t_fcm")
	private String tFcm;

	@Column(name = "t_refresh")
	private String tRefresh;

	// @OneToOne
	// @JoinColumn(name = "user_id", referencedColumnName = "userId")
	// private User user;
}
