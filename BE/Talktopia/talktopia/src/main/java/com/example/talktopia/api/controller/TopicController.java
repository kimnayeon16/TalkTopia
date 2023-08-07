package com.example.talktopia.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.response.TopicRes;
import com.example.talktopia.api.service.TopicService;
import com.example.talktopia.db.entity.topic.Topic;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/topic")
@RequiredArgsConstructor
public class TopicController {

	private final TopicService topicService;

	@RequestMapping("/start")
	public List<Topic> startTopic(){
		return topicService.startTopic();
	}

}
