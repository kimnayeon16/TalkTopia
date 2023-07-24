package com.example.talktopia.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginResponse {
	private String msg;
	private String userId;
	private String accessToken;
}

