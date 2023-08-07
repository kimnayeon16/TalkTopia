package com.example.talktopia.api.service.oauth2;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.talktopia.common.OAuth2.OAuthAttributes;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final UserRepository userRepository;

	// 구글 로그인에서 사용자의 정보를 가져옴
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

		log.info("loadUser 실행되니??");
		// 기본적인 OAuth2 사용자 정보를 가져옴
		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest);

		// 로그인 중인 서비스의 등록 ID를 가져옴
		// ex) Google -> google, Facebookt -> facebook
		String registrationId = userRequest.getClientRegistration().getRegistrationId();

		// 사용자의 정보를 가져오기위해 사용되는 필드
		// google은 sub
		String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
			.getUserInfoEndpoint().getUserNameAttributeName();

		// of메서드를 사용하여 사용자의 정보 가공
		// registrationId: 현재 로그인 중인 서비스 ID - google
		// userNameAttributeName: 사용자의 식별 정보를 나타내는 필드
		// oAuth2User.getAttributes(): OAuth2에서 받은 원시 속성정보 맵 객체
		OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

		// 유저 DB에 저장
		User user = saveOrUpdate(attributes);

		// 인증된 사용자를 나타내는 DefaultOAuth2User
		return new DefaultOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority(user.getUserRole().name())),
			attributes.getAttributes(), // 인증된 사용자 속성 정보를 담은 맵 객체
			attributes.getNameAttributeKey());
	}

	// 해당 유저를 DB에서 조회 후 등록
	private User saveOrUpdate(OAuthAttributes attributes) {

		log.info("saveOrUpdate 실행되니?");
		// 유저 찾기
		User user = userRepository.findByUserEmail(attributes.getEmail())
			.map(entity -> entity.update(attributes.getName())) // 이미 있는 이메일이면 이름만 업데이트?
			.orElse(attributes.toEntity());

		return userRepository.save(user);
	}
}
