package com.example.talktopia.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talktopia.db.entity.user.Reminder;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder,Long> {
	List<Reminder> findByUser_UserId(String userId);
}