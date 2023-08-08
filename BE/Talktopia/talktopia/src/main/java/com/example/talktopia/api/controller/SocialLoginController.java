package com.example.talktopia.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.user.GoogleReq;
import com.example.talktopia.api.response.user.UserLoginRes;
import com.example.talktopia.api.service.user.UserService;
import com.example.talktopia.common.message.Message;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/social")
@Slf4j
@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET,
	RequestMethod.OPTIONS})
public class SocialLoginController {

	private final UserService userService;
	@PostMapping("/google")
	public ResponseEntity<Message> googleLogin(@RequestBody GoogleReq googleReq) {
		return ResponseEntity.ok().body(new Message(googleReq.toString()));
	}
}
