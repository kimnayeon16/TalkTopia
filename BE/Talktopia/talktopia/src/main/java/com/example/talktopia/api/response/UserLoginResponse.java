package com.example.talktopia.api.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginResponse {
	private String userId;
	private String userName;
	private String accessToken;
	private String refreshToken;
	private Date expiredDate;
	private String sttLang;
	private String transLang;
}

