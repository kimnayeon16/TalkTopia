package com.example.talktopia.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.response.ReminderRes;
import com.example.talktopia.api.service.ReminderService;
import com.example.talktopia.common.message.Message;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/v1/notice")
@RequiredArgsConstructor
public class ReminderController {

	private final ReminderService reminderService;

	@GetMapping("/list/{userId}")
	public ResponseEntity<List<ReminderRes>> showReminderList(@PathVariable("userId")String userId) throws Exception {

		return reminderService.showReminderList(userId);

	}

	@GetMapping("/{noticeId}")
	public Message showNotice(@PathVariable("noticeId")long noticeId) throws Exception {

		return reminderService.showNotice(noticeId);

	}

	@PutMapping("/read/{rmNo}")
	public ResponseEntity<List<ReminderRes>> readRemind(@PathVariable("rmNo") long rmNo) throws Exception {
		String userId = reminderService.readRem(rmNo);
		return reminderService.showReminderList(userId);
	}
}
