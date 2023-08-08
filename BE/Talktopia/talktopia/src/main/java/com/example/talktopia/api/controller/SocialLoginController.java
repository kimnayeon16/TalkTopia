package com.example.talktopia.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.user.GoogleReq;
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
	@PostMapping("/google")
	public ResponseEntity<Message> googleLogin(@RequestBody GoogleReq googleReq) {
		log.info("token: " + googleReq.getAccessToken());
		return ResponseEntity.ok().body(new Message("토큰이 정상적으로 들어왔습니다."));
	}
}
