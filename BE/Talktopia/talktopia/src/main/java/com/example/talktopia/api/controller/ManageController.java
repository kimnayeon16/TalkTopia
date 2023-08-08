package com.example.talktopia.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talktopia.api.request.ReportReq;
import com.example.talktopia.api.service.ManageService;
import com.example.talktopia.common.message.Message;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/manage")
@RequiredArgsConstructor
public class ManageController {

	private final ManageService manageService;

	@PostMapping("/report")
	public Message reportUser(@RequestBody ReportReq reportReq) throws Exception {
		return manageService.reportUser(reportReq);
	}

}
