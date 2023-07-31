package com.example.talktopia.api.request;

import com.example.talktopia.db.entity.user.Language;
import com.example.talktopia.db.entity.user.ProfileImg;
import com.example.talktopia.db.entity.user.User;

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
	private String userLan;

	public User toEntity(Language language) {
		return User.builder()
			.userId(userId)
			.userPw(userPw)
			.userName(userName)
			.userEmail(userEmail)
			.language(language)
			.build();
	}
}
