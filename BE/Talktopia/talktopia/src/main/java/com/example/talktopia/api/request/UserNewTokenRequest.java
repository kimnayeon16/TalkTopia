package com.example.talktopia.api.request;

import com.example.talktopia.db.entity.Token;
import com.example.talktopia.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserNewTokenRequest {
	private String userId;
	private String refreshToken;

	public Token toEntity(User user) {
		return Token.builder()
			.tRefresh(refreshToken)
			.user(user)
			.build();
	}
}