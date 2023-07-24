package com.example.talktopia.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserJoinRequest {

	private String userId;
	private String userPw;
	private String userName;
	private String userEmail;

}
