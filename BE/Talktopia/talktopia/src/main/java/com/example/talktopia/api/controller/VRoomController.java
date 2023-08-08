package com.example.talktopia.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.vr.VRoomExitReq;
import com.example.talktopia.api.request.vr.VRoomReq;
import com.example.talktopia.api.response.vr.VRoomRes;
import com.example.talktopia.api.service.vr.ParticipantsService;
import com.example.talktopia.api.service.vr.VRoomService;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.repository.ParticipantsRepository;
import com.example.talktopia.db.repository.UserRepository;
import com.example.talktopia.db.repository.VRoomRepository;

import lombok.extern.slf4j.Slf4j;
@RestController
@Slf4j
@RequestMapping("/api/v1/room")
public class VRoomController {

	private final VRoomService vRoomService;
	private final VRoomRepository vRoomRepository;
	private final UserRepository userRepository;
	private final ParticipantsService participantsService;
	private final ParticipantsRepository participantsRepository;

	@Autowired
	public VRoomController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl,
		VRoomRepository vRoomRepository, UserRepository userRepository,
		ParticipantsService participantsService, ParticipantsRepository participantsRepository) {
		this.vRoomRepository = vRoomRepository;
		this.userRepository = userRepository;
		this.participantsService = participantsService;
		this.participantsRepository =participantsRepository;
		this.vRoomService = new VRoomService(secret, openviduUrl, vRoomRepository, userRepository, participantsService, participantsRepository);
	}

	@PostMapping("/enter")
	public VRoomRes enterRoom(@RequestBody VRoomReq vRoomReq) throws
		Exception {
		log.info(vRoomReq.getUserId());
		log.info(String.valueOf(vRoomReq.getVr_max_cnt()));
		return vRoomService.enterRoom(vRoomReq);
	}

	// @PostMapping("/exit")
	// public Message exitRoom(@RequestBody VRoomExitReq vRoomExitReq) throws Exception {
	// 	return vRoomService.exitRoom(vRoomExitReq);
	// }
}