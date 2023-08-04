package com.example.talktopia_chat.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class MakeChatRequest {
	private  String scrcSender;
	private  String scrcMessage;
}
