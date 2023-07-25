package com.example.talktopia.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia.db.entity.vr.Participants;

public interface ParticipantsRepository extends JpaRepository<Participants, Long> {

	boolean existsByUser_UserNo(long userNo);
}