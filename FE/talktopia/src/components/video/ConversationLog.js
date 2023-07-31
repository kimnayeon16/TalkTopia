import React, { useEffect, useState } from "react";


function ConversationLog(props) {

    const chatScroll = React.createRef();

    const [messageList, setMessageList] = useState([]); // 받은 메세지들
    // const [message, setMessage] = useState('');

    // WebSpeechApi관련 state
    const [transcript, setTranscript] = useState(""); // 자신이 말한 텍스트

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // speech recognition 이벤트핸들러 시작
    recognition.onspeechend = function () {
        recognition.stop();
        console.log("speech end")
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

    // 음성 인식 결과 반환 시
    recognition.onresult = (e) => {
        // e.results 배열의 마지막 인덱스를 가져와서 처리합니다.
        const lastResult = e.results[e.results.length - 1];
        setTranscript(lastResult[0].transcript);  // 내가 말한 내용

        // isFinal 프로퍼티를 통해 해당 결과가 최종 결과인지 확인합니다.
        if (lastResult.isFinal) {                 // true이면 말 다했기에 전달함수 호출
            sendMessage(lastResult[0].transcript);  // 메세지 전달 함수 호출
        }
    };
    // peech recognition 이벤트핸들러 끝

    // 메세지 전달 함수
    const sendMessage = (finalTranscript) => {
        let newMfinalTranscript = finalTranscript.replace(/ +(?= )/g, '');
        if (newMfinalTranscript !== '' && newMfinalTranscript !== ' ') {
            const data = {
                transcript: newMfinalTranscript, 
                nickname: props.myUserName, 
                streamId: props.mainStreamManager.stream.streamId,
                lang: 'ko'
            };
            // Sender of the message (after 'session.connect')
            props.mainStreamManager.stream.session.signal({
                data: JSON.stringify(data), // Any string (optional)
                to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
                type: 'STT',       // The type of message (optional)
            })
            .then(() => {
                console.log('음성텍스트가 성공적으로 보내졌습니다.');
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    useEffect(() => {
        recognition.start();    // 마운트 시 바로 음성 인식 되게
        // Receiver of the message (usually before calling 'session.connect')
        props.mainStreamManager.stream.session.on('signal:STT', (event) => {
            const data = JSON.parse(event.data);
            console.log(data,'-------------------------')
            let newMessageList = ({
                transcript: data.transcript,            // 전달받은 메세지
                nickname: data.nickname,                // 전달한 사용자 이름
                connectionId: event.from.connectionId,  // Connection object of the sender 
                source: data.lang                       // 전달받은 메세지 언어
            });
            setMessageList((prev) => ([...prev, newMessageList]))
            scrollToBottom();
        });
    }, []);

    const scrollToBottom = () => {
        setTimeout(() => {
            try {
                chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

    const translationHandler = () => {
        return '변환된 언어'
    }


    return (
        <>
            <div>
                <p>내가 말하고 있는 내용 : {transcript}</p>
            </div>

            <div ref={chatScroll}>
                {messageList.map((data, i) => (
                    <div key={i}>
                        <div>
                            <p>{data.nickname}</p>
                        </div>
                        <div>
                            <p>{data.transcript}</p>
                            <p>{translationHandler(data.transcript)}</p>
                        </div>
                    </div>
                ))}
            </div>  
        </>
    )
};

export default ConversationLog;