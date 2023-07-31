package com.example.talktopia.api.request;

import com.example.talktopia.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserJoinRequest {

	private String userId;
	private String userPw;
	private String userName;
	private String userEmail;

	public User toEntity() {
		return User.builder()
			.userId(userId)
			.userPw(userPw)
			.userName(userName)
			.userEmail(userEmail)
			.build();
	}
}
