package com.example.talktopia.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Id;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.VRoomReq;
import com.example.talktopia.api.response.VRoomRes;
import com.example.talktopia.common.util.MapSession;
import com.example.talktopia.common.util.RandomNumberUtil;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.entity.vr.VRoom;
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

	private Map<String, MapSession> mapSessionToken = new HashMap<>();
	// 세션이름 ,세션 토큰, 유저 이메일
	//private Map<String, Map<String, String>> mapSessionNamesTokensRand = new HashMap<>();
	// 세션이름 <세션 토큰, 유저 이메일>
	private Map<String, Map<String, String>> mapSessionNamesTokens = new HashMap<>();
	// 유저 이름, <세션이름, 세션토큰>
	//private Map<String, Map<String, String>> mapUserSession = new HashMap<>();

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
		User user = userRepository.findByUserId(vRoomReq.getUserId()).orElseThrow(()->new Exception("유저가앖어"));
		ConnectionProperties connectionProperties = createConnectionProperties(vRoomReq.getUserId());
		List<String> roomIds = vroomrepsitory.findAllIds();
		String connRoomId=null;
		int maxCnt = vRoomReq.getVr_max_cnt();
		/************************** 참가할 방이 존재한다면 ****************************/
		if(!roomIds.isEmpty()){

			boolean isNotfoundRoom=false;
			for(String  roomId : roomIds){
				VRoom vRoom = vroomrepsitory.findByVrSession(roomId);
				if(this.mapSessionToken.get(roomId).getMaxCount()!=maxCnt ||
					this.mapSessionToken.get(roomId).getCurCount()>=maxCnt ||
					!vRoom.isVrEnter()){
					continue;
				}
				List<Long> checkLangs = this.mapSessionToken.get(roomId).getLang();

				for(Long checkLang : checkLangs){
					if(checkLang==user.getLanguage().getLangNo()){
						isNotfoundRoom=true;
						break;
					}
				}
				if(!isNotfoundRoom)
				{
					connRoomId=roomId;
					String token = this.mapSessions.get(connRoomId).createConnection(connectionProperties).getToken();

					this.mapSessionToken.get(connRoomId).setCurCount(this.mapSessionToken.get(connRoomId).getCurCount()+1);
					if(this.mapSessionToken.get(connRoomId).getCurCount()==this.mapSessionToken.get(connRoomId).getMaxCount()){
						vRoom.setVrEnter(false);
					}

					participantsService.joinRoom(user,vRoom);
					VRoomRes vRoomRes = new VRoomRes();
					vRoomRes.setToken(token);
					//vRoomRes.setToken(this.mapSessionToken.get(connRoomId).getToken());
					vRoomRes.setVr_session(roomId);
					// Return the response to the client
					// 토큰정보와 상태 정보 리턴
					return vRoomRes;

				}

			}
		}

		/************************** 참가할 방이 존재하지 않는다면 ****************************/

		//ConnectionProperties와 createConnectionProperties는 OpenVidu 라이브러리에서 사용되는 개체와 함수


		try {
			// Create a new OpenVidu Session
			Session session = this.openVidu.createSession();
			// Generate a new Connection with the recently created connectionProperties

			// 커넥션 생성
			String token = session.createConnection(connectionProperties).getToken();
			//JSONObject responseJson = new JSONObject();
			//JSONObject responseJson = new JSONObject();

			String roomId = RandomNumberUtil.getRandomNumber();


			//Session session 설명
			//session은 OpenVidu 서버에 생성된 비디오 세션을 나타내는 객체
			//
			//token 설명
			// String token = session.createConnection(connectionProperties).getToken();
			// session.createConnection(connectionProperties)는 앞서 생성한 session에 사용자를 연결하기 위한 새로운 Connection을 생성
			// 이때, connectionProperties에는 사용자의 연결 세션에 대한 설정이 담긴 ConnectionProperties 개체가 사용
			// 그리고 이렇게 생성된 연결에 대해 getToken() 메서드를 호출하여 해당 연결에 대한 고유한 토큰을 얻을수있음.
			// 이 토큰은 사용자가 실제로 서버와 통신할 때 사용되는 인증 수단으로 활용됨.

			//String sessionName = createRandName(15); //15자리의 랜덤 문자열
			while (mapSessionToken.get(roomId) != null) { // 중복 방지
				roomId = RandomNumberUtil.getRandomNumber();
			}


			MapSession mapSession = new MapSession(roomId,token, new ArrayList<>(),maxCnt,1);
			mapSession.getLang().add(user.getLanguage().getLangNo());
			this.mapSessions.put(roomId,session);
			this.mapSessionToken.put(roomId,mapSession);

			VRoom room = VRoom.builder()
				.vrSession(roomId)
				.vrCreateTime(LocalDateTime.now())
				.vrMaxCnt(maxCnt)
				.vrCurrCnt(1)
				.vrEnter(true)
				.build();
			vroomrepsitory.save(room);
			participantsService.joinRoom(user,room);

			//            this.mapUserSession.put(userEmail, new HashMap<>());
			//            this.mapUserSession.get(userEmail).put(sessionName, token);
			// Prepare the response with the tokeny
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
