import { OpenVidu } from 'openvidu-browser';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import UserVideoComponent from './UserVideoComponent';
import Chat from './chat/Chat';

// 세션 입장
function JoinRoom() {
    const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
    
    const navigate = useNavigate();
    const location = useLocation();

    // session, state 선언
    const [mySessionId, setMySessionId] = useState(undefined);
    const [myUserName, setMyUserName] = useState('');
    const [session, setSession] = useState(undefined)
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    
    // video, 마이크 접근 권한
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);

    // 새로운 OpenVidu 객체 생성
    const [OV, setOV] = useState(<OpenVidu />);
    // const OV = new OpenVidu();

    // 2) 화면 렌더링 시 최초 1회 실행
    useEffect(() => {
        if (location.state === null || location.state.roomId === null || location.state.myUserName === null) {
            console.log("location.state의 정보가 없습니다.");
            navigate("/");
            return;
        };

        // 이전 페이지에서 받아온 데이터
        setMySessionId(location.state.roomId);
        setMyUserName(location.state.myUserName);
        setVideoEnabled(location.state.videoEnabled);
        setAudioEnabled(location.state.audioEnabled);

        // 윈도우 객체에 화면 종료 이벤트 추가
        window.addEventListener('beforeunload', onBeforeUnload);

        // 세션에 참여
        joinSession();

        return () => {
            window.removeEventListener('beforeunload', onbeforeunload);
            leaveSession();
        };
    }, []);

    // 페이지를 언로드하기 전에 leaveSession 메서드를 호출
    const onBeforeUnload = () => {
        leaveSession();
    }

    // 세션 나가기
    const leaveSession = () => {
        // 세션 연결 종료
        if (session) {
            session.disconnect();
        }

        // session, state 초기화
        setMySessionId(undefined);
        setMyUserName('');
        setSession(undefined);
        setMainStreamManager(undefined);
        setPublisher(undefined);
        setSubscribers([]);

        navigate('/');
    };

    // 다른 사용자가 룸을 떠날 시 subscribers 배열에서 삭제
    const deleteSubscriber = (streamManager) => {
        let newSubscribers = subscribers;
        let index = newSubscribers.indexOf(streamManager, 0);
        if (index > -1) {
            newSubscribers.splice(index, 1);
            setSubscribers(newSubscribers);
        }
    };

    // 세션 생성 및 이벤트 정보 
    const joinSession = async () => {

        const newOV = new OpenVidu();

        // 세션 시작시
        let mySession = newOV.initSession()

        // 세션에서 이벤트가 발생할 때의 동작을 지정
        // Session 개체에서 추가된 subscriber를 subscribers 배열에 저장 
        mySession.on('streamCreated', (event) => {
            let subscriber = mySession.subscribe(event.stream, undefined);
            // 새 구독자에 대한 상태 업데이트
            setSubscribers((subscribers) => {
                return([...subscribers, subscriber])
            });
        });

        // Session 개체에서 제거된 관련 subsrciber를 subsribers 배열에서 제거
        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager);
        });

        // 서버 측에서 예기치 않은 비동기 오류가 발생할 때 Session 개체에 의해 트리거 되는 이벤트
        mySession.on('exception', (exception) => {
            console.warn(exception);
        });

        // 세션 갱신
        setOV(newOV);
        setSession(mySession);
    };

    // 토큰 생성
    const getToken = async () => {
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    };

    // 서버에 요청하여 세션 생성
    const createSession = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    };

    // 서버에 요청하여 토큰 생성
    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    };

    // 사용자의 토큰으로 세션 연결 (session 객체 변경 시에만 실행)
    useEffect(() => {
        if (session) {
            getToken().then((token) => {
                // 첫 번째 매개변수는 OpenVidu deployment로 부터 얻은 토큰, 두 번째 매개변수는 이벤트의 모든 사용자가 검색할 수 있음.
                session.connect(token, { clientData: myUserName })
                    .then(async () => {
                    
                    // Get your own camera stream ---
                    // publisher 객체 생성
                    let publisher = await OV.initPublisherAsync(undefined, {
                        audioSource: undefined, // The source of audio. If undefined default microphone
                        videoSource: undefined, // The source of video. If undefined default webcam
                        publishAudio: audioEnabled, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: videoEnabled, // Whether you want to start publishing with your video enabled or not
                        resolution: '640x480', // The resolution of your video
                        frameRate: 30, // The frame rate of your video
                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        mirror: true, // Whether to mirror your local video or not
                    });
                    
                    // Publish your stream ---
                    session.publish(publisher);

                    // Set the main video in the page to display our webcam and store our Publisher
                    setPublisher(publisher);
                    setMainStreamManager(publisher);
                })
                .catch ((error) => {
                    console.log(error);
                    alert("세션 연결 오류");
                    navigate("/");
                });
            });
        }
    }, [session]);


    // 내 웹캠 on/off (상대방도 화면 꺼지는지 확인 필요)
    const toggleVideo = () => {
        if (publisher) {
            const enabled = !videoEnabled;
            setVideoEnabled(enabled);
            publisher.publishVideo(enabled);
        }
    };

    // 내 마이크 on/off (상대방도 음성 꺼지는지 확인 )
    const toggleAudio = () => {
        if (publisher) {
            const enabled = !audioEnabled;
            setAudioEnabled(enabled);
            publisher.publishAudio(enabled);
        }
    };

    return (
        <div>
            <h1>Room ID: {mySessionId}</h1>
            <input
                type='button'
                onClick={toggleVideo}
                value={`비디오 ${videoEnabled ? "OFF" : "ON"}`}
            />
            <input
                type='button'
                onClick={toggleAudio}
                value={`마이크 ${audioEnabled ? "OFF" : "ON"}`}
            />
            <input 
                type='button'
                onClick={leaveSession}
                value="나가기"
            />

            {session !== undefined ? (
                <div>
                    {publisher !== undefined ? (
                        <div>
                            <UserVideoComponent streamManager={publisher} />
                        </div>
                    ) : null}
                    {subscribers.map((sub, i) => (
                        <div key={sub.i}>
                            <UserVideoComponent streamManager={sub} />
                        </div>
                    ))}

                    {myUserName !== undefined && mainStreamManager !== undefined && (
                        <div>   
                            <Chat
                                myUserName={myUserName}
                                mainStreamManager={mainStreamManager}
                            />
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default JoinRoom;