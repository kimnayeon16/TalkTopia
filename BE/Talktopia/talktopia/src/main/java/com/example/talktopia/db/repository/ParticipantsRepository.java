package com.example.talktopia.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.talktopia.db.entity.vr.Participants;

@Repository
public interface ParticipantsRepository extends JpaRepository<Participants, Long> {

	boolean existsByUser_UserNo(long userNo);

	@Transactional
	void deleteByUser_UserNo(long userNo);
}
