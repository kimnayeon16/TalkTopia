package com.example.talktopia.api.response.VRoom;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VRoomRes {
	private String vr_session;
	private boolean vr_enter;
	private LocalDateTime vr_create_time;
}
