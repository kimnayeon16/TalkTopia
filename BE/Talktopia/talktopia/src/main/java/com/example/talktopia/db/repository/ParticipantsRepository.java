package com.example.talktopia.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia.db.entity.vr.Participants;

public interface ParticipantsRepository extends JpaRepository<Participants, Long> {

	boolean existsByUser_UserNo(long userNo);
	void deleteByUser_UserNoAndVRoom_VrSession(long userNo, String VRoomId);

}
