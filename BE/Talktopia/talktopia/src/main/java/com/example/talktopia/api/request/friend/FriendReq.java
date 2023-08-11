package com.example.talktopia.api.request.friend;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendReq {

	String userId;
	String userStatus;

	@Builder
	public FriendReq(String userId, String userStatus) {
		this.userId = userId;
		this.userStatus = userStatus;
	}
}
