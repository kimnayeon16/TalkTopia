package com.example.talktopia.api.request.fcm;

import lombok.Getter;

@Getter
public class FCMSendMessageReq {

	String friendId;

	String vrSession;

	String userId;

}
