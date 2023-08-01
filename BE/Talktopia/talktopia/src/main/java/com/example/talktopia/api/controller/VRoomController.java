package com.example.talktopia.api.controller;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.VRoomReq;
import com.example.talktopia.api.response.VRoomRes;
import com.example.talktopia.api.service.ParticipantsService;
import com.example.talktopia.api.service.VRoomService;
import com.example.talktopia.db.repository.UserRepository;
import com.example.talktopia.db.repository.VRoomRepository;

import lombok.extern.slf4j.Slf4j;
<<<<<<< Updated upstream
=======

import com.example.talktopia.api.request.VRoom.VRoomReq;

>>>>>>> Stashed changes
@RestController
@Slf4j
@RequestMapping("/api/v1/room")
public class VRoomController {

	private final VRoomService vRoomService;
	private final VRoomRepository vRoomRepository;
	private final UserRepository userRepository;
	private final ParticipantsService participantsService;

	public VRoomController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl,
		VRoomRepository vRoomRepository, UserRepository userRepository,
		ParticipantsService participantsService) {
		this.vRoomRepository = vRoomRepository;
		this.userRepository = userRepository;
		this.participantsService = participantsService;
		this.vRoomService = new VRoomService(secret, openviduUrl, vRoomRepository, userRepository, participantsService);
	}

	@PostMapping("/enter")
	public VRoomRes enterRoom(@RequestBody VRoomReq vRoomReq) throws
		Exception {
		log.info(vRoomReq.getUserId());
		log.info(String.valueOf(vRoomReq.getVr_max_cnt()));
		return vRoomService.enterRoom(vRoomReq);
	}

}

//
// // private OpenVidu openvidu;
//
// private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();
//
// // 오픈비두 서버 관련 변수
// private String OPENVIDU_URL = "https://localhost:4443";
//
// private String OPENVIDU_SECRET = "MY_SECRET";
//
// private final VRoomService vRoomService;
// private final VRoomRepository vRoomRepository;
// private final UserRepository userRepository;
// private final ParticipantsRepository participantsRepository;
//
// // @PostConstruct
// // public void init() {
// // 	this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
// // }
//
// @PostMapping("/random")
// public ResponseEntity<VRoomRes> quickRoom(@RequestBody VRoomReq vRoomReq) throws
// 	Exception {
// 	List<String> roomIds = vRoomService.quickRoom();
// 	User user = userRepository.findByUserId(vRoomReq.getUserId()).orElseThrow(() -> new Exception("유저가 없엉"));
//
// 	/*********************참가해있다면 들어가질말아야함 ******************************/
// 	if (participantsRepository.existsByUser_UserNo(user.getUserNo())) {
// 		throw new Exception("이미 해당 방에 참가 중입니다.");
// 	}
//
// 	int LIMIT = vRoomReq.getVr_max_cnt();
// 	/************ 참가할 방이 존재한다면 ************/
// 	if (!roomIds.isEmpty()) {
// 		int min = vRoomReq.getVr_max_cnt();
// 		String minConnRoomId = null;
//
// 		// 해당 종목의 방마다 참가할 수 있는지 확인
// 		for (String roomId : roomIds) {
// 			// 검색하는 방이 존재하지 않거나 인원초과일 경우
// 			log.info(String.valueOf(this.mapSessions.get(roomId)));
// 			VRoom vRoom = vRoomRepository.findByVrSession(roomId);
//
// 			if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) >= LIMIT
// 				|| !vRoom.isVrEnter() || (vRoom.getVrMaxCnt() != vRoomReq.getVr_max_cnt()))
// 				continue;
//
// 			if (min > mapSessions.get(roomId)) {
// 				min = mapSessions.get(roomId);
// 				minConnRoomId = roomId;
// 			}
// 		}
//
// 		// 참가할 수 있다면
// 		if (minConnRoomId != null) {
// 			// 방 관리 map에 저장
// 			this.mapSessions.put(minConnRoomId, this.mapSessions.get(minConnRoomId) + 1);
//
// 			return ResponseEntity.ok(vRoomService.getRoomRes(minConnRoomId, vRoomReq.getUserId()));
// 		}
// 	}
// 	/************ 참가할 방이 존재하지 않다면 ************/
// 	// 방 번호 난수 생성
// 	String roomId = RandomNumberUtil.getRandomNumber();
//
// 	// 방 관리 map에 저장
// 	this.mapSessions.put(roomId, 1);
//
// 	// DB 저장
// 	vRoomService.makeRoom(roomId, vRoomReq);
//
// 	return ResponseEntity.ok(vRoomService.getRoomRes(roomId, vRoomReq.getUserId()));
// }
