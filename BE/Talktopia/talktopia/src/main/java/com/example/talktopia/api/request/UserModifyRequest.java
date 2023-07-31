package com.example.talktopia.api.request;

import com.example.talktopia.db.entity.user.Language;
import com.example.talktopia.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserModifyRequest {
	private String userId;
	private String userName;
	private String userPw;
	private String userEmail;
	private String userImgUrl;
	private String userLan;

}
