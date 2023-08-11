package com.example.talktopia.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.post.AnswerPostReq;
import com.example.talktopia.api.service.post.AnswerPostService;
import com.example.talktopia.common.message.Message;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@RestController
@RequestMapping("/api/v1/comment")
@Slf4j
@RequiredArgsConstructor
public class AnswerPostController {

	private final AnswerPostService answerPostService;

	@PostMapping("/answer")
	public Message answerPost(@RequestBody AnswerPostReq answerPostReq) throws Exception {
		return answerPostService.answerPost(answerPostReq);
	}

}
