package com.example.talktopia.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FCMFailMessage {

	String senderId;

	String receiverId;

	@Builder
	public FCMFailMessage(String senderId, String receiverId) {
		this.senderId = senderId;
		this.receiverId = receiverId;
	}
}
