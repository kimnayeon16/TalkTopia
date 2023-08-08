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
import com.example.talktopia.db.repository.TokenRepository;
import com.example.talktopia.db.repository.UserRepository;
import com.example.talktopia.db.repository.VRoomRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Notification;

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

		User user = userRepository.findByUserId(fcmSendVroomMessage.getFriendId()).orElseThrow(()-> new Exception("유저가없엉"));

		if(user.getToken().getTFcm() !=null){

			String vrSession = String.valueOf(vRoomRepository.findByVrSession(fcmSendVroomMessage.getVrSession()));
			Map<String, String> data = new HashMap<>();
			data.put("invite",vrSession);

			Notification notification = Notification.builder()
				.setTitle("초대 알림이 왔어요~~~~")
				.setBody(fcmSendVroomMessage.getUserId()+"님의 화상채팅방 초대입니다")
				.build();


			com.google.firebase.messaging.Message message = com.google.firebase.messaging.Message.builder()
				.setToken(user.getToken().getTFcm())
				.setNotification(notification)
				.putAllData(data)
				.build();

			firebaseMessaging.send(message);
			return new Message("알림을 전송했습니다");
		}

		return new Message("해당 유저가 존재하지않습니다.");
	}

	public Message sendFriendMessage(FCMSendFriendMessage fcmSendFriendMessage) throws Exception {


		User user = userRepository.findByUserId(fcmSendFriendMessage.getFriendId()).orElseThrow(()-> new Exception("유저가없엉"));

		if(user.getToken().getTFcm() !=null){

			Map<String, String> data = new HashMap<>();
			data.put("userId",fcmSendFriendMessage.getUserId());
			Notification notification = Notification.builder()
				.setTitle("초대 알림이 왔어요~~~~")
				.setBody(fcmSendFriendMessage.getUserId()+"님이 친구 초대를 하고싶어요")
				.build();


			com.google.firebase.messaging.Message message = com.google.firebase.messaging.Message.builder()
				.setToken(user.getToken().getTFcm())
				.setNotification(notification)
				.putAllData(data)
				.build();

			firebaseMessaging.send(message);
			return new Message("알림을 전송했습니다");
		}

		return new Message("해당 유저가 존재하지않습니다.");

	}
}
