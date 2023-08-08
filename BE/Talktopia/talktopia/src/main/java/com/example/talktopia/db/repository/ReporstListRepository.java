package com.example.talktopia.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talktopia.db.entity.user.ReportedUser;

@Repository
public interface ReporstListRepository extends JpaRepository<ReportedUser, Long> {
	ReportedUser findByUser_UserNo(long userNo);
}
