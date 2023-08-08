package com.example.talktopia.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportReq {

	private String vrSession;
	private String reporter;
	private String reportedUser;
}
