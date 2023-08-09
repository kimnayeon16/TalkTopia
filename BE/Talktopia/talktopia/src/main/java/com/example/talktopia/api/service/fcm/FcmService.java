package com.example.talktopia.api.service.fcm;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.fcm.FCMSendFriendMessage;
import com.example.talktopia.api.request.fcm.FCMSendVroomMessage;
import com.example.talktopia.api.request.fcm.FCMTokenReq;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.user.Token;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.entity.vr.VRoom;
import com.example.talktopia.db.repository.TokenRepository;
import com.example.talktopia.db.repository.UserRepository;
import com.example.talktopia.db.repository.VRoomRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushFcmOptions;
import com.google.firebase.messaging.WebpushNotification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {

	private final FirebaseMessaging firebaseMessaging;

	private final TokenRepository tokenRepository;

	private final UserRepository userRepository;

	private final VRoomRepository vRoomRepository;
	public void saveToken(FCMTokenReq fcmTokenReq) throws Exception {
		log.info("fcmTokenReq: " + fcmTokenReq.getUserId());
		User user = userRepository.findByUserId(fcmTokenReq.getUserId()).orElseThrow(()-> new Exception("유저가 없어0"));

		Token token = tokenRepository.findByUserUserNo(user.getUserNo()).orElseThrow( () -> new Exception("DB에 없는데?"));

		token.setTFcm(fcmTokenReq.getToken());

		tokenRepository.save(token);

	}

	public Message sendVroomMessage(FCMSendVroomMessage fcmSendVroomMessage) throws Exception {

		int friendSize = fcmSendVroomMessage.getFriendId().size();
		if(friendSize>0) {
			for (int i = 0; i < friendSize; i++) {
				User user = userRepository.findByUserId(fcmSendVroomMessage.getFriendId().get(i))
					.orElseThrow(() -> new Exception("유저가없엉"));

				if (user.getToken().getTFcm() != null) {

					VRoom vRoom = vRoomRepository.findByVrSession(fcmSendVroomMessage.getVrSession());
					Map<String, String> data = new HashMap<>();
					data.put("vrSession", vRoom.getVrSession());
					data.put("accept", "수락");
					data.put("denied", "거절");

					Notification notification = Notification.builder()
						.setTitle("초대 알림이 왔어요~~~~")
						.setBody(fcmSendVroomMessage.getUserId() + "님의 화상채팅방 초대입니다")
						.build();

					com.google.firebase.messaging.Message message = com.google.firebase.messaging.Message.builder()
						.setToken(user.getToken().getTFcm())
						.setNotification(notification)
						.putAllData(data)
						.build();

					firebaseMessaging.send(message);

				}
			}
			return new Message("알림을 전송했습니다");
		}
		return new Message("친구를 불러오지 못하였습니다");
	}

	public Message sendFriendMessage(FCMSendFriendMessage fcmSendFriendMessage) throws Exception {


		User user = userRepository.findByUserId(fcmSendFriendMessage.getFriendId()).orElseThrow(()-> new Exception("유저가없엉"));

		if(user.getToken().getTFcm() !=null){

			String title = "친구 초대 알림";
			String body = fcmSendFriendMessage.getUserId()+"님이 친구 초대를 하고싶어합니다";

			String backgroundColor ="#87CEEB";


			Notification notification = Notification.builder()
				.setTitle(title)
				.setBody(body)
				.build();

			WebpushConfig webpushConfig = WebpushConfig.builder()
				.setNotification(new WebpushNotification(title, body, backgroundColor))  // 배경색 설정
				.putData("accept", "수락")
				.putData("denied", "거절")
				.build();

			com.google.firebase.messaging.Message message = com.google.firebase.messaging.Message.builder()
				.setToken(user.getToken().getTFcm())
				.setNotification(notification)
				.setWebpushConfig(webpushConfig)
				.build();

			// Map<String, String> data = new HashMap<>();
			// data.put("userId",fcmSendFriendMessage.getUserId());
			// data.put("accept", "수락");
			// data.put("denied", "거절");

			// Notification notification = Notification.builder()
			// 	.setTitle("초대 알림이 왔어요~~~~")
			// 	.setBody(fcmSendFriendMessage.getUserId()+"님이 친구 초대를 하고싶어요")
			// 	.build();

			// com.google.firebase.messaging.Message message = com.google.firebase.messaging.Message.builder()
			// 	.setToken(user.getToken().getTFcm())
			// 	.setNotification(notification)
			// 	.putAllData(data)
			// 	.build();

			firebaseMessaging.send(message);
			return new Message("알림을 전송했습니다");
		}

		return new Message("해당 유저가 존재하지않습니다.");

	}
}
