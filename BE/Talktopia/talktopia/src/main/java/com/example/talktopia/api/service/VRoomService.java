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
import org.springframework.transaction.annotation.Transactional;

import com.example.talktopia.api.request.VRoomExitReq;
import com.example.talktopia.api.request.VRoomReq;
import com.example.talktopia.api.response.VRoomRes;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.common.util.MapSession;
import com.example.talktopia.common.util.RandomNumberUtil;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.entity.vr.Participants;
import com.example.talktopia.db.entity.vr.VRoom;
import com.example.talktopia.db.repository.ParticipantsRepository;
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
	//private Map<String, Map<String, String>> mapSessionNamesTokens = new HashMap<>();
	// 유저 이름, <세션이름, 세션토큰>
	//private Map<String, Map<String, String>> mapUserSession = new HashMap<>();

	// openvidu url
	private String OPENVIDU_URL;
	// openvidu secret
	private String SECRET;

	private VRoomRepository vroomrepsitory;
	private UserRepository userRepository;
	private ParticipantsService participantsService;

	private ParticipantsRepository participantsRepository;

	public VRoomService() {
	}

	public VRoomService(String secret, String openvidu_url, VRoomRepository vroomrepsitory,
		UserRepository userRepository, ParticipantsService participantsService, ParticipantsRepository participantsRepository) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openvidu_url;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
		this.vroomrepsitory = vroomrepsitory;
		this.userRepository = userRepository;
		this.participantsService = participantsService;
		this.participantsRepository = participantsRepository;
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
		if(participantsRepository.existsByUser_UserNo(user.getUserNo())){
			throw new Exception("이미 참여중인 방이 있습니다");
		}
		ConnectionProperties connectionProperties = createConnectionProperties(vRoomReq.getUserId());
		List<String> roomIds = vroomrepsitory.findAllIds();
		String connRoomId=null;
		int maxCnt = vRoomReq.getVr_max_cnt();
		for(String roomId : roomIds){
			log.info("roomId 나열해"+roomId);
		}
		/************************** 참가할 방이 존재한다면 ****************************/
		if(!roomIds.isEmpty()){

			for(String  roomId : roomIds){
				boolean isNotfoundRoom=false;
				VRoom vRoom = vroomrepsitory.findByVrSession(roomId);
				if(this.mapSessionToken.get(roomId).getMaxCount()!=maxCnt ||
					this.mapSessionToken.get(roomId).getCurCount()>=maxCnt ||
					!vRoom.isVrEnter()){
					if(this.mapSessionToken.get(roomId).getMaxCount()!=maxCnt)
					{
						log.info("this.mapSessionToken.get(roomId).getMaxCount(): ======="+this.mapSessionToken.get(roomId).getMaxCount());
					}
					else if(this.mapSessionToken.get(roomId).getCurCount()!=maxCnt){
						log.info("this.mapSessionToken.get(roomId).getMaxCount(): ======="+this.mapSessionToken.get(roomId).getCurCount());
					}
					else{
						log.info("vRoom.isVrEnter(): ======"+vRoom.isVrEnter());
					}
					continue;
				}
				List<Long> checkLangs = this.mapSessionToken.get(roomId).getLang();

				for(Long checkLang : checkLangs){
					if(checkLang==user.getLanguage().getLangNo()){
						isNotfoundRoom=true;
						log.info("isNotFoundRoom"+ checkLang+" "+user.getLanguage().getLangNo());
						break;
					}
				}
				if(isNotfoundRoom){
					continue;
				}
				connRoomId=roomId;
				String token = this.mapSessions.get(connRoomId).createConnection(connectionProperties).getToken();

				this.mapSessionToken.get(connRoomId).setCurCount(this.mapSessionToken.get(connRoomId).getCurCount()+1);
				vRoom.setVrCurrCnt(vRoom.getVrCurrCnt()+1);
				if(this.mapSessionToken.get(connRoomId).getCurCount()==this.mapSessionToken.get(connRoomId).getMaxCount()){
					vRoom.setVrEnter(false);
					vroomrepsitory.save(vRoom);
				}

				participantsService.joinRoom(user,vRoom);
				VRoomRes vRoomRes = new VRoomRes();
				vRoomRes.setToken(token);
				//vRoomRes.setToken(this.mapSessionToken.get(connRoomId).getToken());
				vRoomRes.setVrSession(roomId);
				// Return the response to the client
				// 토큰정보와 상태 정보 리턴
				return vRoomRes;

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
			log.info(this.mapSessions.get(roomId).getSessionId());

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
			vRoomRes.setVrSession(roomId);
			System.out.println(-2);
			// Return the response to the client
			// 토큰정보와 상태 정보 리턴
			return vRoomRes;

		} catch (Exception e) {
			// If error generate an error message and return it to client
			throw new Exception("file excepition",e);
		}

	}

	@Transactional
	public Message exitRoom(VRoomExitReq vRoomExitReq) throws Exception {
		User user = userRepository.findByUserId(vRoomExitReq.getUserId()).orElseThrow(() -> new Exception("우거가 없음 ㅋㅋ"));
		log.info(this.mapSessions.get(vRoomExitReq.getVrSession()).getSessionId());
		if(this.mapSessions.get(vRoomExitReq.getVrSession()).getSessionId()!=null){
			VRoom vRoom = vroomrepsitory.findByVrSession(vRoomExitReq.getVrSession());

			this.mapSessionToken.get(vRoomExitReq.getVrSession()).setCurCount(this.mapSessionToken.get(vRoomExitReq.getVrSession()).getCurCount()-1);
			log.info(String.valueOf(this.mapSessionToken.get(vRoomExitReq.getVrSession()).getCurCount()));

			if(this.mapSessionToken.get(vRoomExitReq.getVrSession()).getCurCount()<1){
				this.mapSessions.remove(vRoomExitReq.getVrSession());
				this.mapSessionToken.remove(vRoomExitReq.getVrSession());
				participantsRepository.deleteByUser_UserNo(user.getUserNo());
				vroomrepsitory.deleteByVrSession(vRoom.getVrSession());
				return new Message("방을 나가서 터졌습니다.");
			}
			int userlan = (int)user.getLanguage().getLangNo();
			this.mapSessionToken.get(vRoomExitReq.getVrSession()).getLang().remove(userlan);
			//VRoom vRoom = vroomrepsitory.findByVrSession(vRoomExitReq.getVrSession());
			vRoom.setVrCurrCnt(vRoom.getVrCurrCnt()-1);
			if(!vRoom.isVrEnter()){
				vRoom.setVrEnter(true);
			}
			vroomrepsitory.save(vRoom);

			//Vroom Id 찾는다.
			//user Id 찾는다.
			//OK
			//이를통해서 참여자 DB를 삭제한다.
			participantsRepository.deleteByUser_UserNo(user.getUserNo());
			return new Message("방을 나갔습니다.");
		}
		return new Message("방을 찾을수가없는데요?");
	}
}