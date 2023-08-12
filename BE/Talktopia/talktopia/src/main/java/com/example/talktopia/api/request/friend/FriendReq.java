package com.example.talktopia.api.request.friend;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendReq {

	String userId;
	String userStatus;
	String userName;

	@Builder
	public FriendReq(String userId, String userStatus, String userName) {
		this.userId = userId;
		this.userStatus = userStatus;
		this.userName = userName;
	}
}
