package com.example.talktopia_chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TalktopiaChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(TalktopiaChatApplication.class, args);
	}

}
