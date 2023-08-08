package com.example.talktopia.api.service;

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

		if(existReporter(reportReq.getReporter())){
			User user = userRepository.findByUserId(reportReq.getReportedUser()).orElseThrow(()->new Exception("지금 신고할려고했던 애가 없네"));
			VRoom vRoom = vRoomRepository.findByVrSession(reportReq.getVrSession());

			Participants participants = participantsRepository.findByUser_UserNoAndVRoom_VrSession(user.getUserNo(),vRoom.getVrSession())
				.orElseThrow(()-> new Exception("현재 신고하려는애가 참여자에 없습니다 즉 존재하지않습니다"));

			ReportedUser reportedUser = reporstListRepository.findByUser_UserNo(participants.getUser().getUserNo());

			if(reportedUser!=null){
				reportedUser.setRuReportCount(reportedUser.getRuReportCount()+1);
				reporstListRepository.save(reportedUser);
			}
			else{
				reportedUser = ReportedUser.builder()
					.ruReportCount(1)
					.user(user)
					.build();
				reporstListRepository.save(reportedUser);
			}
			return new Message("신고가 완료되었습니다");
		}
		throw new Exception("유저가 없는데 뭘찾으려고해 ㅋㅋ");



	}

	private boolean existReporter(String reporter) throws Exception {

		if(userRepository.existsByByUserId(reporter)){
			return true;
		}
		return false;
	}
}
