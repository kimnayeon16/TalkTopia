package com.example.talktopia.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VRoomExitReq {

	String userId;
	String token;
	String vrSession;
}
