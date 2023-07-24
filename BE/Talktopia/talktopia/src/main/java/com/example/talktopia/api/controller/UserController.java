package com.example.talktopia.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.UserJoinRequest;
import com.example.talktopia.api.request.UserLoginRequest;
import com.example.talktopia.api.response.UserLoginResponse;
import com.example.talktopia.api.service.UserService;
import com.example.talktopia.db.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
public class UserController {

	private final UserService userService;

	// 회원가입
	@PostMapping("/join")
	public ResponseEntity<User> joinUser(@RequestBody UserJoinRequest userJoinRequest) {
		User newUser = userService.joinUser(userJoinRequest);
		return ResponseEntity.ok().body(newUser);
	}

	// 로그인
	@PostMapping("/login")
	public ResponseEntity<UserLoginResponse> loginUser(@RequestBody UserLoginRequest userLoginRequest) {
		UserLoginResponse userLoginResponse = userService.login(userLoginRequest);
		return ResponseEntity.ok().body(userLoginResponse);
	}
}