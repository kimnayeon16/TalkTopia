package com.example.talktopia.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.UserCheckEmailRequest;
import com.example.talktopia.api.request.UserJoinRequest;
import com.example.talktopia.api.request.UserLoginRequest;
import com.example.talktopia.api.request.UserNewTokenRequest;
import com.example.talktopia.api.response.UserMyPageResponse;
import com.example.talktopia.api.response.UserNewTokenResponse;
import com.example.talktopia.api.response.UserCheckEmailResponse;
import com.example.talktopia.api.response.UserJoinResponse;
import com.example.talktopia.api.response.UserLoginResponse;
import com.example.talktopia.api.service.UserMailService;
import com.example.talktopia.api.service.UserService;
import com.example.talktopia.common.message.Message;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET,
	RequestMethod.OPTIONS})
public class UserController {

	private final UserService userService;
	private final UserMailService userMailService;

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

	// 이메일 인증
	@PostMapping("/checkEmail")
	public ResponseEntity<UserCheckEmailResponse> checkEmail(
		@RequestBody UserCheckEmailRequest userCheckEmailRequest) throws
		Exception {
		UserCheckEmailResponse userCheckEmailResponse = new UserCheckEmailResponse();
		userCheckEmailResponse.setCode(userMailService.sendSimpleMessage(userCheckEmailRequest.getUserEmail()));
		return ResponseEntity.ok().body(userCheckEmailResponse);
	}

	// 토큰 재발급
	@PostMapping("/reqNewToken")
	public ResponseEntity<UserNewTokenResponse> createNewToken(@RequestBody UserNewTokenRequest userNewTokenRequest) {
		UserNewTokenResponse userNewTokenResponse = userService.reCreateNewToken(userNewTokenRequest);
		return ResponseEntity.ok().body(userNewTokenResponse);
	}

	// 로그아웃
	@GetMapping("/logout/{userId}")
	public ResponseEntity<Message> logoutUser(@PathVariable String userId) {
		return ResponseEntity.ok().body(new Message(userId + "가 로그아웃 되었습니다."));
	}

	// 마이페이지 정보 전달
	@GetMapping("/myPage/{userId}")
	public ResponseEntity<UserMyPageResponse> showMyPage(@PathVariable("userId") String userId) {
		return ResponseEntity.ok().body(userService.myPage(userId));
	}

	// 회원 탈퇴
	@DeleteMapping("/leave/{userId}")
	public ResponseEntity<Message> deleteUser(@PathVariable("userId") String userId) {
		userService.deleteUser(userId);
		return ResponseEntity.ok().body(new Message("회원 탈퇴가 완료되었습니다."));
	}


}