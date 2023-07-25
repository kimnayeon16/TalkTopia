package com.example.talktopia.common.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

/**
 * 1. Jwt 토큰 생성
 * 2. 토큰 만료 확인
 * 3. 토큰에서 정보 빼내기
 */
@Component
public class JwtProvider {

	/**
	 * Jwt token 생성
	 * @param userId
	 * @param userName
	 * @param secretKey
	 * @param expiredMs: accessToken 기간
	 * @return accessToken
	 */
	public static String createJwt(String userId, String userName, String secretKey, Long expiredMs) {
		// Jwt에 정보 추가
		Claims claims = Jwts.claims();
		claims.put("userId", userId);
		claims.put("userName", userName);

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis() + expiredMs))
			.signWith(SignatureAlgorithm.HS256, secretKey) // 서명
			.compact();
	}

	/**
	 * 토큰 기간 만료 확인
	 * @param token: access token
	 * @param secretKey: secretKey
	 * @return 만료 여부 boolean으로 반환
	 */
	public static boolean isExpired(String token, String secretKey) {
		return Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody()
			.getExpiration()
			.before(new Date());
	}

	/**
	 * 토큰을 헤더에 잘 담아서 보냈는지, Bearer가 앞에 붙어있는지 확인
	 * @param authorization: 헤더에 담아온 토큰
	 * @return 잘 담아서 보냈으면 True, 아니면 False
	 */
	public static boolean notExistTokenOrNotBearer(String authorization) {
		return authorization != null && authorization.startsWith("Bearer ");
	}

	/**
	 * 토큰에 저장된 클레임 꺼내기
	 * @param token
	 * @param secretKey
	 * @return 클레임 반환
	 */
	public static Claims extractClaims(String token, String secretKey) {
		return Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody();
	}

}