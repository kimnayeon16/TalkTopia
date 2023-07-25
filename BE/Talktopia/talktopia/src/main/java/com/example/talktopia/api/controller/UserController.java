package com.example.talktopia.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.UserJoinRequest;
import com.example.talktopia.api.request.UserLoginRequest;
import com.example.talktopia.api.response.UserJoinResponse;
import com.example.talktopia.api.response.UserLoginResponse;
import com.example.talktopia.api.service.UserService;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.User;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
@CrossOrigin(origins = "http://172.30.1.3:3000/", methods = {RequestMethod.POST, RequestMethod.GET,RequestMethod.OPTIONS})
public class UserController {

	private final UserService userService;

	// 회원가입
	@PostMapping("/join")
	public ResponseEntity<UserJoinResponse> joinUser(@RequestBody UserJoinRequest userJoinRequest) {
		return ResponseEntity.ok().body(userService.joinUser(userJoinRequest));
	}

	// 아이디 중복체크
	@GetMapping("/existId/{userId}")
	public ResponseEntity<Message> isExistUser(@PathVariable("userId") String userId) {
		userService.isExistUser(userId);
		return ResponseEntity.ok().body(new Message("중복 아이디가 없습니다."));
	}

	// 로그인
	@PostMapping("/login")
	public ResponseEntity<UserLoginResponse> loginUser(@RequestBody UserLoginRequest userLoginRequest) {
		UserLoginResponse userLoginResponse = userService.login(userLoginRequest);
		return ResponseEntity.ok().body(userLoginResponse);
	}

}