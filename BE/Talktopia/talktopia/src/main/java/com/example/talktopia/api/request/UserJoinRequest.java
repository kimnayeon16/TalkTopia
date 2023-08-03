package com.example.talktopia.api.request;

import com.example.talktopia.db.entity.user.Language;
import com.example.talktopia.db.entity.user.ProfileImg;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.entity.user.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserJoinRequest {

	private String userIdJoin;
	private String userPwJoin;
	private String userName;
	private String userEmail;
	private String userLan;

	public User toEntity(Language language) {
		return User.builder()
			.userId(userIdJoin)
			.userPw(userPwJoin)
			.userName(userName)
			.userEmail(userEmail)
			.userRole(UserRole.USER)
			.language(language)
			.build();
	}
}
