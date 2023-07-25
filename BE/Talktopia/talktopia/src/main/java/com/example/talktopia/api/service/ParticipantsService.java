package com.example.talktopia.api.service;

import org.springframework.stereotype.Service;

import com.example.talktopia.db.entity.User;
import com.example.talktopia.db.entity.vr.Participants;
import com.example.talktopia.db.entity.vr.VRoom;
import com.example.talktopia.db.repository.ParticipantsRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ParticipantsService {

	private final ParticipantsRepository participantsRepository;

	public void joinRoom(User user, VRoom vRoom) {
		Participants participants = Participants.builder()
			.user(user)
			.vRoom(vRoom)
			.build();

		participantsRepository.save(participants);
	}

}