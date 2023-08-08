package com.example.talktopia.api.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.ReportReq;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.user.ReportedUser;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.entity.vr.Participants;
import com.example.talktopia.db.entity.vr.VRoom;
import com.example.talktopia.db.repository.ParticipantsRepository;
import com.example.talktopia.db.repository.ReporstListRepository;
import com.example.talktopia.db.repository.UserRepository;
import com.example.talktopia.db.repository.VRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ManageService {

	private final VRoomRepository vRoomRepository;
	private final UserRepository userRepository;
	private final ParticipantsRepository participantsRepository;
	private final ReporstListRepository reporstListRepository;
	public Message reportUser(ReportReq reportReq) throws Exception {

		//1. 신고 유저가 존재하는가?
		//1. 신고 당한유저가 존재하는가?
		//1. 신고 유저와 신고 당한 유저는 같은 방에 존재하는가?
		//1. 참여자 DB에 존재하는가?

		//1. 신고 유저가 방에 있는가?
		//2. 신고당한유저가 방에 있는가?
		//3. 신고 당한 유저는 같은 방에서 신고를 당했었나?
		//3-1. 신고를 당했으면  같은 방에있는 신고 유저가 신고를 했었나? -> 이건 안된다고 말해주자
		//3-2. 신고를 당했지만 같은 방에있는 새로운 신고를 당한것인가? -> 신고해주자.
		User user = userRepository.findByUserId(reportReq.getRuReporter()).orElseThrow(()->new Exception("신고하는 유저가 없습니다"));
		String reporter = user.getUserId();
		user = userRepository.findByUserId(reportReq.getRuBully()).orElseThrow(() -> new Exception("신고당하는 유저는 존재하지않습니다"));
		String bully = user.getUserId();

		//1.신고 유저와 신고 당한 유저는 같은 방에 존재하는가?
		Participants participants = participantsRepository.findByUser_UserId(reporter).orElseThrow(()-> new Exception("방에 존재하지않는 유저"));
		String reporterVRoom = participants.getVRoom().getVrSession();
		participants = participantsRepository.findByUser_UserId(bully).orElseThrow(()-> new Exception("방에 존재하지않는 유저"));
		String bullyVRoom = participants.getVRoom().getVrSession();

		//if(reportReq.)
		return new Message("야호");


	}

}
