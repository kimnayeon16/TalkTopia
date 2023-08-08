package com.example.talktopia.api.request.user;

import com.example.talktopia.db.entity.user.ProviderType;
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
public class GoogleReq {
	private String userEmail;
	private String userName;
	private String userId;

	public User toEntity() {
		return User.builder()
			.userName(userName)
			.userEmail(userEmail)
			.userId("google" + userId)
			.providerType(ProviderType.GOOGLE)
			.userRole(UserRole.USER)
			.build();
	}
}
