package com.example.talktopia.api.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.talktopia.api.response.ReminderRes;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.user.Reminder;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.repository.ReminderRepository;
import com.example.talktopia.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReminderService {

	private final ReminderRepository reminderRepository;

	private final UserRepository userRepository;

	public ResponseEntity<List<ReminderRes>> showReminderList(String userId) throws Exception {
		// private long rmNo;
		// private String rmContent;
		// private String rmType;
		userRepository.findByUserId(userId).orElseThrow(() -> new Exception("유저를 못찾아"));

		List<Reminder> reminder = reminderRepository.findByUser_UserId(userId);
		if (reminder.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		List<ReminderRes> reminderResList = new ArrayList<>();
		for (Reminder rem : reminder) {
			ReminderRes reminderRes = ReminderRes.builder()
				.rmContent(rem.getRmContent())
				.rmNo(rem.getRmNo())
				.rmType(rem.getRmType())
				.rmRead(rem.isRmRead())
				.build();
			reminderResList.add(reminderRes);

		}
		Collections.reverse(reminderResList);
		return ResponseEntity.ok(reminderResList);
	}

	public Message showNotice(long noticeId) throws Exception {

		Reminder reminder = reminderRepository.findById(noticeId).orElseThrow(() -> new Exception("존재하지 않는 알림"));
		reminder.setRmRead(true);
		reminderRepository.save(reminder);
		return new Message("메세지를 확인하였습니다.");
	}

	public String readRem(long rmNo) {
		Reminder reminder = reminderRepository.findByRmNo(rmNo);

		if(reminder == null) {
			throw new RuntimeException("해당 알림이 없습니다.");
		}

		reminder.setRmRead(true);
		reminderRepository.save(reminder);

		return reminder.getUser().getUserId();
	}
}
