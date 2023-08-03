package com.example.talktopia.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.talktopia.api.service.UserService;
import com.example.talktopia.common.OAuth2.CustomOAuth2UserService;
import com.example.talktopia.common.OAuth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.example.talktopia.common.OAuth2.OAuth2AuthenticationSuccessHandler;
import com.example.talktopia.common.util.JwtProvider;

import lombok.RequiredArgsConstructor;

/**
 * Security 설정
 */
@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtProvider jwtProvider;

	@Value("${spring.security.jwt.secret}")
	private String secretKey;

	private final JwtProvider jwtTokenProvider;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	//private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

	@Bean
	public HttpCookieOAuth2AuthorizationRequestRepository cookieOAuth2AuthorizationRequestRepository() {
		return new HttpCookieOAuth2AuthorizationRequestRepository();
	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	protected SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.httpBasic()
			.disable()
			.csrf()
			.disable()
			.cors()
			.and()
			.authorizeRequests()
			.antMatchers("/api/v1/user/join", "/api/v1/user/existId/**", "/api/v1/user/login", "/api/v1/user/checkEmail",
				"/api/v1/user/reqNewToken", "/api/v1/user/searchId", "/api/v1/user/searchPw",  "/api/v1/room/enter", "/api/v1/room/exit/**")
			.permitAll()
			.antMatchers("/api/v1/**")
			.authenticated()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			// .oauth2Login()
			// .authorizationEndpoint().baseUri("/oauth2/authorize")
			// .authorizationRequestRepository(cookieOAuth2AuthorizationRequestRepository())
			// .and()
			// .redirectionEndpoint()
			// .baseUri("/login/oauth2/code/**")
			// .and()
			// .userInfoEndpoint().userService(customOAuth2UserService)
			// .and()
			// .successHandler(oAuth2AuthenticationSuccessHandler)
			// //.failureHandler(oAuth2AuthenticationFailureHandler)
			// .and()
			.addFilterBefore(new JwtFilter(jwtProvider, secretKey), UsernamePasswordAuthenticationFilter.class)
			.build();
	}

}
