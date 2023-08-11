package com.example.talktopia.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveChatLog {

	private String vrSession;
	private String sender;
	private String message;

}
