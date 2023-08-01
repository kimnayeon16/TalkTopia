package com.example.talktopia.api.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.VRoomReq;
import com.example.talktopia.api.response.VRoomRes;
import com.example.talktopia.common.util.RandomNumberUtil;
import com.example.talktopia.db.repository.UserRepository;
import com.example.talktopia.db.repository.VRoomRepository;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class VRoomService {
	private OpenVidu openVidu;

	private Map<String, Session> mapSessions = new HashMap<>();
	// 세션이름 ,세션 토큰, 유저 이메일
	private Map<String, Map<String, String>> mapSessionNamesTokensRand = new HashMap<>();
	// 세션이름 <세션 토큰, 유저 이메일>
	private Map<String, Map<String, String>> mapSessionNamesTokens = new HashMap<>();
	// 유저 이름, <세션이름, 세션토큰>
	private Map<String, Map<String, String>> mapUserSession = new HashMap<>();

	// openvidu url
	private String OPENVIDU_URL;
	// openvidu secret
	private String SECRET;

	private VRoomRepository vroomrepsitory;
	private UserRepository userRepository;
	private ParticipantsService participantsService;

	public VRoomService() {
	}

	public VRoomService(String secret, String openvidu_url, VRoomRepository vroomrepsitory,
		UserRepository userRepository, ParticipantsService participantsService) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openvidu_url;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
		this.vroomrepsitory = vroomrepsitory;
		this.userRepository = userRepository;
		this.participantsService = participantsService;
	}

	public ConnectionProperties createConnectionProperties(String userId) {
		String serverData = "{\"serverData\": \"" + userId + "\"}";
		ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
			.type(ConnectionType.WEBRTC)
			.data(serverData)
			.role(OpenViduRole.PUBLISHER) //역할 입력 - 일단 publisher로 통합시킴
			.build();
		return connectionProperties;
	}

	public VRoomRes enterRoom(VRoomReq vRoomReq) throws Exception {

		log.info(vRoomReq.getUserId());
		ConnectionProperties connectionProperties = createConnectionProperties(vRoomReq.getUserId());
		log.info(String.valueOf(vRoomReq.getVr_max_cnt()));
		try {
			// Create a new OpenVidu Session
			log.info("가자마자 터진다");
			Session session = this.openVidu.createSession();
			// Generate a new Connection with the recently created connectionProperties

			System.out.println(3);

			// 커넥션 생성
			String token = session.createConnection(connectionProperties).getToken();
			//JSONObject responseJson = new JSONObject();
			//JSONObject responseJson = new JSONObject();
			System.out.println(2);
			String roomId = RandomNumberUtil.getRandomNumber();
			System.out.println(1);
			//String sessionName = createRandName(15); //15자리의 랜덤 문자열
			while (mapSessions.get(roomId) != null) { // 중복 방지
				roomId = RandomNumberUtil.getRandomNumber();
			}
			System.out.println(0);
			this.mapSessions.put(roomId, session);
			this.mapSessionNamesTokens.put(roomId, new HashMap<>());
			this.mapSessionNamesTokens.get(roomId).put(token, vRoomReq.getUserId());
			System.out.println(-1);
			//            this.mapUserSession.put(userEmail, new HashMap<>());
			//            this.mapUserSession.get(userEmail).put(sessionName, token);
			// Prepare the response with the token
			VRoomRes vRoomRes = new VRoomRes();
			vRoomRes.setToken(token);
			vRoomRes.setVr_session(roomId);
			System.out.println(-2);
			// Return the response to the client
			// 토큰정보와 상태 정보 리턴
			return vRoomRes;

		} catch (Exception e) {
			// If error generate an error message and return it to client
			throw new Exception("file excepition",e);
		}

	}

	// private JSONObject getErrorResponse(Exception e) throws JSONException {
	// 	JSONObject json = new JSONObject();
	// 	json.put("cause", e.getCause());
	// 	json.put("error", e.getMessage());
	// 	json.put("exception", e.getClass());
	// 	return json;
	// }

}

// public List<String> quickRoom() {
// 	return vroomrepsitory.findAllIds();
// }
//
// public VRoomRes getRoomRes(String minConnRoomId, String userId) throws Exception {
//
// 	VRoom vRoom1 = vroomrepsitory.findByVrSession(minConnRoomId);
//
// 	vRoom1.setVrCurrCnt(vRoom1.getVrCurrCnt() + 1);
// 	if (vRoom1.getVrCurrCnt() == vRoom1.getVrMaxCnt()) {
// 		vRoom1.setVrEnter(false);
// 	}
//
// 	User user = userRepository.findByUserId(userId).orElseThrow(() -> new Exception("유저가없엉 ㅋ"));
// 	participantsService.joinRoom(user, vRoom1);
//
// 	VRoomRes vRoom = new VRoomRes();
// 	vRoom.setVr_session(minConnRoomId);
// 	vRoom.setVr_enter(true);
// 	vRoom.setVr_create_time(LocalDateTime.now());
//
// 	return vRoom;
// }
//
// @Transactional
// public void makeRoom(String roomId, final VRoomReq VRoomReq) throws Exception {
// 	log.info(VRoomReq.getUserId());
// 	User user = userRepository.findByUserId(VRoomReq.getUserId()).orElseThrow(() -> new Exception("유저가없엉"));
// 	VRoom room = VRoom.builder()
// 		.vrSession(roomId)
// 		.vrCreateTime(LocalDateTime.now())
// 		.vrMaxCnt(VRoomReq.getVr_max_cnt())
// 		.vrEnter(true)
// 		.build();
//
// 	vroomrepsitory.save(room);
//
// 	participantsService.joinRoom(user, room);
// }
