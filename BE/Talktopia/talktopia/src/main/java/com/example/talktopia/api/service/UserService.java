package com.example.talktopia.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.UserJoinRequest;
import com.example.talktopia.api.request.UserLoginRequest;
import com.example.talktopia.api.response.UserLoginResponse;
import com.example.talktopia.common.util.JwtProvider;
import com.example.talktopia.db.entity.User;
import com.example.talktopia.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

	private final UserRepository userRepository;

	@Value("${spring.security.jwt.secret}")
	private String secretKey;

	@Value("${spring.security.jwt.token-validity-in-seconds}")
	private Long expiredMs;

	public User joinUser(UserJoinRequest userJoinRequest) {
		User user = new User(userJoinRequest);

		userRepository.save(user);

		return user;
	}

	public UserLoginResponse login(UserLoginRequest userLoginRequest) {

		// Response 초기화
		UserLoginResponse userLoginResponse = new UserLoginResponse();

		// Request 받은 Id가 실제 DB에 존재하는지 확인
		User searchUser = checkUserId(userLoginRequest.getUserId());

		// 1. 해당 유저가 없거나, 비밀번호가 다를경우
		if (!checkUserPw(searchUser.getUserPw(), userLoginRequest.getUserPw())) {
			userLoginResponse.setMsg("로그인에 실패하였습니다.");
		} else {
			// 토큰 생성
			String accessToken = JwtProvider.createJwt(userLoginRequest.getUserId()
				, searchUser.getUserName(), secretKey, expiredMs);

			userLoginResponse.setMsg("로그인에 성공하였습니다.");
			userLoginResponse.setUserId(searchUser.getUserId());
			userLoginResponse.setAccessToken(accessToken);
		}

		return userLoginResponse;
	}

	/**
	 * Request의 userPw와 실제 User DB의 userPw 비교
	 * @param reqUserPw: 클라이언트가 보내온 pw
	 * @param getUserPw: User DB에서 꺼내온 pw
	 * @return: 두 파라미터(pw) 일치 여부 반환
	 */
	public boolean checkUserPw(String reqUserPw, String getUserPw) {
		return reqUserPw.equals(getUserPw);
	}

	/**
	 * Request의 userId가 실제로 DB에 존재하는지 여부 확인
	 * @param reqUserId
	 * @return: 해당 Id User 반환
	 */
	public User checkUserId(String reqUserId) {
		return userRepository.findByUserId(reqUserId);
	}

}
