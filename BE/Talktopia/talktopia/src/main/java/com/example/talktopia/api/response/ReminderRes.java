package com.example.talktopia.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReminderRes {

	private long rmNo;
	private String rmContent;
	private String rmType;

	@Builder
	public ReminderRes(long rmNo, String rmContent, String rmType) {
		this.rmNo = rmNo;
		this.rmContent = rmContent;
		this.rmType = rmType;
	}
}
