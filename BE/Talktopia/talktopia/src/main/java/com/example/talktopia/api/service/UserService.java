package com.example.talktopia.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.UserJoinRequest;
import com.example.talktopia.api.request.UserLoginRequest;
import com.example.talktopia.api.response.UserJoinResponse;
import com.example.talktopia.api.response.UserLoginResponse;
import com.example.talktopia.api.response.UserMyPageResponse;
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

	// 마이페이지: 유저 정보 반환
	public UserMyPageResponse myPage(String userId) {
		User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("유효하지 않은 회원입니다."));

		UserMyPageResponse userMyPageResponse = UserMyPageResponse.builder()
			.userId(user.getUserId())
			.userPw(user.getUserPw())
			.userEmail(user.getUserEmail())
			.userName(user.getUserName())
			.build();
		// UserMyPageResponse res = userInfo;
		return userMyPageResponse;
	}


	// 새로운 토큰 요청
	// public UserNewTokenResponse reCreateNewToken(UserNewTokenRequest userNewTokenRequest) {
	// 	// 1. userReq로 userId와 refreshToken 받음
	// 	// 2. userId로 userNo 찾음
	// 	String reqUserId = userNewTokenRequest.getUserId();
	// 	User user = userRepository.findByUserId(reqUserId).orElseThrow(() -> new RuntimeException("가입된 사용자가 아닙니다."));
	//
	// 	// 3. userNo로 Token테이블에서 token 검색
	// 	Token token = tokenRepository.findByTokenUserNo(user.getUserNo()).orElseThrow(() -> new RuntimeException("로그인된 사용자가 아닙니다."));
	//
	// 	// 4. 있으면 새로 발급해주고 resp
	// 	String accessToken = JwtProvider.createAccessToken(user.getUserId(), secretKey, accessExpiredMs);
	// 	String refreshToken = JwtProvider.createRefreshToken(user.getUserId(), secretKey, refreshExpiredMs);
	//
	//
	// }
}
