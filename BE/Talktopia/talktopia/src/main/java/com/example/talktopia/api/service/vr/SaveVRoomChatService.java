package com.example.talktopia.api.service.vr;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.talktopia.api.request.SaveChatLog;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.vr.SaveVRoom;
import com.example.talktopia.db.entity.vr.SaveVRoomChatLog;
import com.example.talktopia.db.repository.SaveVRoomChatLogRepository;
import com.example.talktopia.db.repository.SaveVRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SaveVRoomChatService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3Client amazonS3Client;
	private final SaveVRoomChatLogRepository saveVRoomChatLogRepository;
	private final SaveVRoomRepository saveVRoomRepository;

	public Message saveLog(List<SaveChatLog> saveChatLogs) {
		String fileName = saveChatLogs.get(0).getVrSession() + ".txt";
		try (FileWriter writer = new FileWriter(fileName)) {
			for (SaveChatLog log : saveChatLogs) {
				writer.write("Sender: " + log.getSender() + ", Message: " + log.getMessage() + "\n");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Upload file to S3
		try {
			File file = new File(fileName);
			amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file));
		} catch (Exception e) {
			e.printStackTrace();
		}

		String logFileUrl = amazonS3Client.getUrl(bucket, fileName).toString();
		SaveVRoom saveVRoom = saveVRoomRepository.findBySvrSession(saveChatLogs.get(0).getVrSession());
		log.info("saveVRoom " + saveVRoom);
		SaveVRoomChatLog saveVRoomChatLog = SaveVRoomChatLog.builder()
			.vrChatLogFileUrl(logFileUrl)
			.saveVRoom(saveVRoom)
			.build();

		log.info("저장전 log: " + saveVRoomChatLog);
		saveVRoomChatLogRepository.save(saveVRoomChatLog);

		return new Message("저장된 채팅 로그 파일명: " + logFileUrl);
	}
}
