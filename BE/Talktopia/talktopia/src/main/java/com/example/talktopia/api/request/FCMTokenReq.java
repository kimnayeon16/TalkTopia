package com.example.talktopia.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FCMTokenReq {

	String userId;
	String token;

}
