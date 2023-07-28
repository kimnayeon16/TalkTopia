import { useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import StompJS from 'stompjs'
// import { Client } from '@stomp/stompjs';  
// import * as StompJs from '@stomp/stompjs';  
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// import StompJs from '@stomp/stompjs';

function WebSpeechApi() {
    const [myUserName, setMyUserName] = useState('');   // 유저 이름
    const [recognitionEnabled, setRecognitionEnabled] = useState(false);    // 음성 인식 여부

    // 웹소켓 통신 시작
    const sockJs = new SockJS("http://192.168.31.232:5000/audio-stream"); // 웹소켓 연결
    const stomp = StompJS.over(sockJs) // stomp로 감싸기

    // // 웹소켓 연결 함수
    // const connect = () => {
    //     // connect에서 비어있는 {} 헤더정보임.
    //     stomp.connect({}, (frame) => {  //frame은 stomp의 메세지 프레임
    //         // 웹소켓서버의 /topic/sub을 구독하면 message들어옴
    //         stomp.subscribe("/topic/getText/", (message) => {
    //             console.log(JSON.parse(message.body));
    //             showMessage(JSON.parse(message.body));
    //         });
    //     });
    // };

    // 웹소켓 connect-subscribe 부분
    const stompConnect = () => {
        try {
            // 웹 소켓 연결 시 stomp에서 자동으로 connect 되었다는 것을
            // console에 보여주는데 그것을 감추기 위한 debug
            stomp.debug = null;
            
            // connect에서 비어있는 {}는 헤더정보임.
            stomp.connect({}, (frame) => {  //frame은 stomp의 메세지 프레임
                // 웹소켓서버의 /topic/sub을 구독하면 message들어옴
                stomp.subscribe("/topic/getText/", (message) => {
                    console.log(JSON.parse(message.body));
                    showMessage(JSON.parse(message.body));  // 메세지 출력 함수
                }, // token 있으면 여기에 넣자
                );
            });
        } catch (error) {
            console.log('connect error :', error);
        }
    };

    // 메세지 출력 함수
    const showMessage = (message) => {
        let message_area = document.querySelector(".message");
        message_area.innerHTML += `<p> ${message.sender}가 보낸 메세지: ${message.content}</p>`
    };

    // 웹 소켓 disconnect-unsubscribe 부분
    // 웹 소켓을 disconnect를 따로 해주지 않으면 계속 연결되어 있어서 사용하지 않을때는 꼭 연결을 끊어주어야한다.
    const stompDisconnect = () => {
        try {
            stomp.debug = null;
            stomp.disconnect(() => {
                stomp.unsubscribe("sub 0") // 이 부분은 잘 모르겠네
            },  // token 있으면 여기에 넣자
            );
        } catch (error) {
            console.log('disconnect error :', error)
        }
    }

    // 메세지 전달 함수
    const sendMessage = (finalTranscript) => {
        stomp.debug = null;
        const data = {
            "sender": myUserName,
            "content": finalTranscript
        }
        stomp.send("/app/sendText", {}, JSON.stringify(data));  // {}는 token 위치
    };

    // const send = (finalTranscript) => {
    //     const sendMessage = {
    //         "sender": myUserName,
    //         "content": finalTranscript
    //     }
    //     stomp.send("/app/sendText", {}, JSON.stringify(sendMessage));
    // };

    // // 웹소켓 연결 시작
    useEffect(() => {

        stompConnect();
    }, [])

    // SpeechRecognition
    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;      //  true: 각각 인식된 문장을 하나로 합침. 중간에 쉬어도 stop X
    recognition.lang = "ko-KR";         // 한국어 음성인식
    recognition.interimResults = true;  // 중간에 인식되는 결과도 나오게 함
    recognition.maxAlternatives = 1;    // 다른 음성 인식 결과 최대 개수
    console.log('recognition-----------',recognition)
    const diagnostic = document.querySelector(".output");
    // const click = document.querySelector(".click");
    // const click_end = document.querySelector(".click-end");
    // const [finalTranscripts, setFinalTranscripts] = useState("")
    let finalTranscripts = "";
    let i = 0;
    recognition.onresult = (event) => {
        // The first [0] returns the "SpeechRecognitionResult" at position 0.
        // Each SpeechRecognitionResult object contains "SpeechRecognitionAlternative objects" that contain individual results.
        console.log('------------------------')
        console.log(event.results)
        console.log('------------------------')


        var interimTranscripts = ""; // <= 중간결과
        let transcript = event.results[i][0].transcript; // 
        console.log(transcript);
        transcript.replace("\n", "<br>");

        if (event.results[i].isFinal) { // 지금 하는 말이 끝나면
            finalTranscripts = transcript;
            interimTranscripts = "";
            i++;
            diagnostic.innerHTML += "<br>"

            // 말 다했으면 웹소켓으로 전달
            sendMessage(finalTranscripts);
        }
        else {
            interimTranscripts += transcript;
        }
        diagnostic.innerHTML = finalTranscripts + '<span style="color: #999;">' + interimTranscripts + '</span>';
    };

    // 이벤트핸들러 시작
    recognition.onspeechend = function () {
        recognition.stop();
        console.log("speech end")
        i = 0;
    }

    recognition.onerror = function (event) {
        console.log('Error occurred in recognition: ' + event.error);
    }

    recognition.onaudiostart = function (event) {
        //Fired when the user agent has started to capture audio.
        console.log('onaudiostart');
    }

    recognition.onaudioend = function (event) {
        //Fired when the user agent has finished capturing audio.
        console.log('onaudioend');
    }

    recognition.onend = function (event) {
        //Fired when the speech recognition service has disconnected.
        console.log('한 뭉탱이 인식이 끝났습니다.');
    }

    recognition.onnomatch = function (event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('nomatch');
    }

    recognition.onsoundstart = function (event) {
        //Fired when any sound — recognisable speech or not — has been detected.
        console.log('on sound start');
    }

    recognition.onsoundend = function (event) {
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('on sound end');
    }

    recognition.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('onspeechstart');
    }
    recognition.onstart = function (event) {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('onstart');
    }
    // 이벤트핸들러 끝

    const userNameHandler = (e) => {
        setMyUserName(e.target.value);
    };

    const toggleRecognitionEnabled = (e) => {
        e.preventDefault();
        let newRecognitionEnabled = !recognitionEnabled
        setRecognitionEnabled(newRecognitionEnabled);
        console.log(newRecognitionEnabled,)

        if (newRecognitionEnabled) {
            try {
                console.log('말 시작 ----------')
                // await navigator.mediaDevices.getUserMedia({audio: true})    // 마이크 접근 허용
                recognition.start();
            } catch (error) {
                console.log("말 끝!!!!------------------------")
                setRecognitionEnabled(!newRecognitionEnabled);
                alert("마이크가 가능하지 않아요!")
            }
        } else {
            recognition.stop();
            console.log("말 끝!!!!123------------------------")
        }
    };

    return (
        <>
            <div>
                <input 
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={myUserName}
                    onChange={userNameHandler}
                />
                <button onClick={toggleRecognitionEnabled}>
                    {recognitionEnabled ? '음성인식 종료' : '음성인식 시작'}
                </button>

                <div className="output">
                </div>
    
                <div className="message">

                </div>

                
                
        

            </div>
        </>
    );
};

export default WebSpeechApi;