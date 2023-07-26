package com.example.talktopia.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.UserJoinRequest;
import com.example.talktopia.api.request.UserLoginRequest;
import com.example.talktopia.api.request.UserNewTokenRequest;
import com.example.talktopia.api.response.UserJoinResponse;
import com.example.talktopia.api.response.UserLoginResponse;
import com.example.talktopia.api.response.UserNewTokenResponse;
import com.example.talktopia.common.util.JwtProvider;
import com.example.talktopia.db.entity.Token;
import com.example.talktopia.db.entity.User;
import com.example.talktopia.db.repository.TokenRepository;
import com.example.talktopia.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

	private final PasswordEncoder bCryptPasswordEncoder;
	private final UserRepository userRepository;
	private final TokenRepository tokenRepository;

	@Value("${spring.security.jwt.secret}")
	private String secretKey;

	// Token validate Time
	private Long accessExpiredMs = 30 * 60 * 1000L; // 1시간
	private Long refreshExpiredMs = 7 * 24 * 60 * 60 * 1000L; // 1주일

	// 회원가입
	public UserJoinResponse joinUser(UserJoinRequest userJoinRequest) {
		isExistUser(userJoinRequest.getUserId());

		// req -> toEntity -> save
		User joinUser = userJoinRequest.toEntity();
		joinUser.hashPassword(bCryptPasswordEncoder);
		userRepository.save(joinUser);
		return new UserJoinResponse("회원 가입에 성공하였습니다.");
	}

	public void isExistUser(String userJoinRequestId) {
		userRepository.findByUserId(userJoinRequestId).ifPresent(user -> {
			throw new RuntimeException("회원 아이디가 존재합니다");
		});
	}

	// 로그인
	public UserLoginResponse login(UserLoginRequest userLoginRequest) {
		// 아이디를 통해 있는 회원인지 확인
		User dbSearchUser = isNotExistUser(userLoginRequest.getUserId());

		// 패스워드 확인
		checkUserPw(userLoginRequest.getUserPw(), dbSearchUser.getUserPw());

		// 토큰 발행
		String accessToken = JwtProvider.createAccessToken(userLoginRequest.getUserId(), secretKey, accessExpiredMs);
		String refreshToken = JwtProvider.createRefreshToken(userLoginRequest.getUserId(), secretKey, refreshExpiredMs);
		saveRefreshToken(refreshToken); // refreshToken DB에 저장

		return new UserLoginResponse(userLoginRequest.getUserId(), accessToken, refreshToken,
			JwtProvider.extractClaims(accessToken, secretKey).getExpiration());

	}

	public void saveRefreshToken(String refreshToken) {
		Token token = new Token();
		token.setTRefresh(refreshToken);
		tokenRepository.save(token);
	}

	public User isNotExistUser(String userLoginRequestId) {
		return userRepository.findByUserId(userLoginRequestId).orElseThrow(() -> new RuntimeException("로그인에 실패했습니다."));
	}

	public void checkUserPw(String reqUserPw, String dbSearchUserPw) {
		if (!bCryptPasswordEncoder.matches(reqUserPw, dbSearchUserPw))
			throw new RuntimeException("로그인에 실패했습니다.");
	}

	// 새로운 토큰 요청
	// public UserNewTokenResponse reCreateNewToken(UserNewTokenRequest userNewTokenRequest) {
	// 	// refreshToken을 통해 userId check
	// 	// 존재하지않으면 Exception 처리
	//
	// 	// 존재하면 새로 만들어서
	// 	// Response
	//
	// }
}
