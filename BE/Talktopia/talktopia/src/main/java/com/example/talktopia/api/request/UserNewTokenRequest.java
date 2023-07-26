package com.example.talktopia.api.request;

import com.example.talktopia.db.entity.Token;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserNewTokenRequest {
	private String refreshToken;

	// public Token toEntity() {
	// 	return Token.builder()
	// 		.tFcm("")
	// 		.tRefresh(refreshToken)
	// 		.user()
	// 		.build();
	// }
}
