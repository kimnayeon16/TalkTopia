package com.example.talktopia.api.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VRoomRes {
	private String vr_session;
	private String token;
}
