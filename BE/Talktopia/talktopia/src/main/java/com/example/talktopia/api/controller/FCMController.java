package com.example.talktopia.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.FCMSendMessageReq;
import com.example.talktopia.api.request.FCMTokenReq;
import com.example.talktopia.api.service.FCMService;
import com.example.talktopia.common.message.Message;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/fcm")
public class FCMController {

	private final FCMService fcmService;


	@PostMapping("/saveFCM")
	public void saveToken(@RequestBody FCMTokenReq fcmTokenReq) throws Exception {
		fcmService.saveToken(fcmTokenReq);
	}

	@PostMapping("/sendMessage")
	public Message sendMessage(@RequestBody FCMSendMessageReq fcmSendMessageReq) throws Exception {
		return fcmService.sendMessage(fcmSendMessageReq);
	}



}
