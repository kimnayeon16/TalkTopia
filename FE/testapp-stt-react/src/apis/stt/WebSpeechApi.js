import { useState } from "react";

// sppeech recognition 잘 되는지 체크
// SpeechRecognition
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
function WebSpeechApi() {
    const [myUserName, setMyUserName] = useState('');   // 유저 이름
    const [recognitionEnabled, setRecognitionEnabled] = useState(false);    // 음성 인식 여부
    const [finalTranscripts, setFinalTranscripts] = useState('')
    const [transcripts, setTranscripts] = useState([])

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;      //  true: 각각 인식된 문장을 하나로 합침. 중간에 쉬어도 stop X
    recognition.lang = "ko-KR";         // 한국어 음성인식
    recognition.interimResults = true;  // 중간에 인식되는 결과도 나오게 함
    recognition.maxAlternatives = 1;    // 다른 음성 인식 결과 최대 개수
    console.log('recognition-----------',recognition)
    
    // speech recognition이 활성화 된 경우
    if (recognitionEnabled) {

        // speechstart: 음성 인식 서비스에서 음성으로 인식한 소리가 감지되면 발생
        recognition.onspeechstart = () => {
            console.log('Speech has been detected');
        };

        // speechend: 음성 인식 서비스에서 음성으로 인식한 소리가 감지되지 않으면 발생
        recognition.onspeechend = () => {
            console.log("Speech has stopped being detected")
            recognition.stop();     // 음성 인식 종료, 지금까지 캡처한 오디오를 사용하여 반환을 시도 
        }

        // result: 음성 인식 서비스가 결과를 반환할 때 발생
        recognition.onresult = (event) => {
            console.log('onresult :',event.results);
            console.log(event.results[0][0].transcript)

            const newTranscript = event.results[0][0].transcript;
            setFinalTranscripts(finalTranscripts + newTranscript)
        }

        // error: 음성 인식 오류가 발생하면
        recognition.onerror = (event) => {
            console.log('Error occurred in recognition: ' + event.error);
        };

        // nomatch: 음성 인식 서비스가 중요한 인식 없이 최종 결과를 반환할 때 발생
        recognition.onnomatch = () => {
            console.log('peech not recognized');
        ;}

    } 
    else {
        // 음성 인식 서비스의 연결이 끊어지면 발생.
        recognition.onend = function (event) {
            console.log('Speech recognition service disconnected');
        }
    };


    // // const [finalTranscripts, setFinalTranscripts] = useState("")
    // let finalTranscripts = "";
    // let i = 0;
    // recognition.onresult = (event) => {
    //     // The first [0] returns the "SpeechRecognitionResult" at position 0.
    //     // Each SpeechRecognitionResult object contains "SpeechRecognitionAlternative objects" that contain individual results.
    //     console.log('------------------------')
    //     console.log(event.results)
    //     console.log('------------------------')


        // let interimTranscripts = ""; // <= 중간결과
        // let transcript = event.results[0][0].transcript; 
        // transcript.replace("\n", "<br>");

        // if (event.results[i].isFinal) { // 지금 하는 말이 끝나면
        //     finalTranscripts = transcript;
        //     interimTranscripts = "";
        //     i++;
        //     diagnostic.innerHTML += "<br>"

        //     // 말 다했으면 웹소켓으로 전달
        //     sendMessage(finalTranscripts);
        // }
        // else {
        //     interimTranscripts += transcript;
        // }
        // diagnostic.innerHTML = finalTranscripts + '<span style="color: #999;">' + interimTranscripts + '</span>';
    // };
    

    

// recognition.onstart = function (event) {
//     //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
//     console.log('onstart');
// }



    const userNameHandler = (e) => {
        setMyUserName(e.target.value);
    };
    // await navigator.mediaDevices.getUserMedia({audio: true})    // 마이크 접근 허용
    
    const listeningStart = () => {
        console.log('-------- SpeechRecognition 시작 --------')
        recognition.start();    // 음성 인식 시작
        setRecognitionEnabled(true);
    };

    const listeningStop = () => {
        recognition.abort();     // 음성 인식 종료, 반환 시도 x
        setRecognitionEnabled(false);
        console.log("-------- SpeechRecognition 끝 --------")
    };

    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
            </div>
       
            <input 
                type="text"
                placeholder="이름을 입력하세요"
                value={myUserName}
                onChange={userNameHandler}
            />
            
            <div className="main-content">
                {finalTranscripts}
            </div>

            <button onClick={listeningStart}>음성 인식 시작</button>
            <button onClick={listeningStop}>음성 인식 종료</button>

        </>
    );
};

export default WebSpeechApi;