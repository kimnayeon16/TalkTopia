package com.example.talktopia.api.response.post;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRes {
	long postNo;
	String postTitle;
	String postContent;
	List<AnswerPostRes> answerPosts;
	@Builder
	public PostRes(long postNo, String postTitle, String postContent, List<AnswerPostRes> answerPosts) {
		this.postNo = postNo;
		this.postTitle = postTitle;
		this.postContent = postContent;
		this.answerPosts=answerPosts;
	}
}
