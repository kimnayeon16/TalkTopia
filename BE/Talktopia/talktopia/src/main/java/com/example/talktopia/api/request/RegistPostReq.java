package com.example.talktopia.api.request;

import java.time.LocalDateTime;

import com.example.talktopia.db.entity.post.Post;
import com.example.talktopia.db.entity.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistPostReq {

	private String pTitle;
	private String pContent;
	private String userId;


	public Post toEntity(User user){
		return Post.builder()
			.pContent(pContent)
			.pCreateTime(LocalDateTime.now())
			.pTitle(pTitle)
			.user(user)
			.build();
	}

}
