package com.example.talktopia.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.FriendAddRequest;
import com.example.talktopia.api.service.FriendService;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.repository.FriendRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/friend")
public class FriendController {

	private final FriendRepository friendRepository;
	private final FriendService friendService;

	@PostMapping("/add")
	public ResponseEntity<Message> addFriend(@RequestBody FriendAddRequest friendAddRequest) {
		return ResponseEntity.ok().body(friendService.addFriend(friendAddRequest));
	}

}
