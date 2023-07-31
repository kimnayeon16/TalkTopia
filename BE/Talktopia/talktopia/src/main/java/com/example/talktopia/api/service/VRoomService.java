package com.example.talktopia.api.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.VRoom.VRoomReq;
import com.example.talktopia.api.response.VRoom.VRoomRes;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.entity.vr.VRoom;
import com.example.talktopia.db.repository.UserRepository;
import com.example.talktopia.db.repository.VRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class VRoomService {

	private final VRoomRepository vroomrepsitory;
	private final UserRepository userRepository;
	private final ParticipantsService participantsService;

	public List<String> quickRoom() {
		return vroomrepsitory.findAllIds();
	}

	public VRoomRes getRoomRes(String minConnRoomId, String userId) throws Exception {

		VRoom vRoom1 = vroomrepsitory.findByVrSession(minConnRoomId);

		vRoom1.setVrCurrCnt(vRoom1.getVrCurrCnt() + 1);
		if (vRoom1.getVrCurrCnt() == vRoom1.getVrMaxCnt()) {
			vRoom1.setVrEnter(false);
		}

		User user = userRepository.findByUserId(userId).orElseThrow(() -> new Exception("유저가없엉 ㅋ"));
		participantsService.joinRoom(user, vRoom1);

		VRoomRes vRoom = new VRoomRes();
		vRoom.setVr_session(minConnRoomId);
		vRoom.setVr_enter(true);
		vRoom.setVr_create_time(LocalDateTime.now());

		return vRoom;
	}

	@Transactional
	public void makeRoom(String roomId, final VRoomReq VRoomReq) throws Exception {
		log.info(VRoomReq.getUserId());
		User user = userRepository.findByUserId(VRoomReq.getUserId()).orElseThrow(() -> new Exception("유저가없엉"));
		VRoom room = VRoom.builder()
			.vrSession(roomId)
			.vrCreateTime(LocalDateTime.now())
			.vrMaxCnt(VRoomReq.getVr_max_cnt())
			.vrEnter(true)
			.build();

		vroomrepsitory.save(room);

		participantsService.joinRoom(user, room);
	}
}
