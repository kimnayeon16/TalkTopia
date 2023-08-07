package com.example.talktopia.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.talktopia.api.request.user.UserIdPwReq;
import com.example.talktopia.api.request.user.UserInfoReq;
import com.example.talktopia.api.response.user.UserMyPageRes;
import com.example.talktopia.api.service.user.UserService;
import com.example.talktopia.common.message.Message;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/myPage")
@Slf4j
@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET,
	RequestMethod.OPTIONS})
public class MyPageController {
	private final UserService userService;

	// Get =================================================================================================
	// 마이페이지 정보 전달
	@GetMapping("/{userId}")
	public ResponseEntity<UserMyPageRes> showMyPage(@PathVariable("userId") String userId) {
		return ResponseEntity.ok().body(userService.myPage(userId));
	}

	// Post =================================================================================================
	// 마이페이지 비밀번호 확인
	@PostMapping("/checkPw")
	private ResponseEntity<Message> checkPwUser(@RequestBody UserIdPwReq userIdPwReq) {
		return ResponseEntity.ok().body(userService.myPageCheckPw(userIdPwReq));
	}

	// etc =================================================================================================
	// 회원 탈퇴
	@DeleteMapping("/leave/{userId}")
	public ResponseEntity<Message> deleteUser(@PathVariable("userId") String userId) {

		return ResponseEntity.ok().body(userService.deleteUser(userId));
	}

	// 회원 정보 수정
	@PutMapping("/modify")
	public ResponseEntity<Message> modifyUser(@RequestBody UserInfoReq userInfoReq) {
		userService.modifyUser(userInfoReq);
		return ResponseEntity.ok().body(new Message("회원 정보가 수정되었습니다."));
	}

	@PutMapping("/upload")
	public ResponseEntity<Message> uploadFile(@RequestBody MultipartFile profile) {
		userService.uploadFile(profile);
		return ResponseEntity.ok().body(new Message("회원 정보가 수정되었습니다."));
	}
}
