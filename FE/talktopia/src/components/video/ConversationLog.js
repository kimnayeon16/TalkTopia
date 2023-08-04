import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { REACT_APP_X_RAPID_API_KEY } from "../../utils";
import style from './CoversationLog.module.css';

function ConversationLog(props) {
    const user = useSelector((state) => state.userInfo);
    const chatScroll = useRef(null);

    const [messageList, setMessageList] = useState([]); // 받은 메세지들

    // WebSpeechApi관련 state
    const [transcript, setTranscript] = useState(""); // 자신이 말한 텍스트

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = user.sttLang;    // 음성 인식되는 언어
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
    // speech recognition 이벤트핸들러 끝

    // 메세지 전달 함수
    const sendMessage = (finalTranscript) => {
        let newMfinalTranscript = finalTranscript.replace(/ +(?= )/g, '');
        if (newMfinalTranscript !== '' && newMfinalTranscript !== ' ') {
            const data = {
                transcript: newMfinalTranscript,                    // stt 
                nickname: props.myUserName,                         // 말한 사용자 이름
                // streamId: props.mainStreamManager.stream.streamId,  // streamId (이건 다른걸로 바꿔도 무방)
                lang: user.transLang                                // 번역 source 언어
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
        props.mainStreamManager.stream.session.on('signal:STT', async (event) => {
            const data = JSON.parse(event.data);
            console.log(data,'-------------------------')
            let messageData = ({
                transcript: data.transcript,            // 전달받은 메세지
                nickname: data.nickname,                // 전달한 사용자 이름
                // connectionId: event.from.connectionId,  // Connection object of the sender 
                source: data.lang,                      // 전달받은 메세지 언어
                translate: ''              // 번역된 메세지 
            });

             // 번역 안할 때는 주석처리하면 됨.
            if (messageData.nickname !== props.myUserName) { // 메세지 보낸 사람이 본인이 아닌경우
                await translationHandler(messageData);
            } else if (messageData.nickname === props.myUserName) {
                setMessageList((prev) => ([...prev, messageData]))
            }
            
            // setMessageList((prev) => ([...prev, messageData]))
            scrollToBottom();
        });

        return () => {
            recognition.abort();
        };
    }, []);

    const translationHandler = async (newMessageList) => {
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', newMessageList.source) // 전달 받은 텍스트 언어
        encodedParams.set('target_language', user.transLang)        // 번역할 언어
        encodedParams.set('text', newMessageList.transcript)

        console.log('translationHandler data', encodedParams)

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': REACT_APP_X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };
            
        try {
            const response = await axios.request(options);
            newMessageList.translate = response.data.data.translatedText
            
            console.log('번역에 성공하였습니다.', newMessageList.translate)
            setMessageList((prev) => ([...prev, newMessageList]))
        } catch (error) {
            console.error(error);
            alert('번역에 실패하였습니다.');
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            try {
                chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }


    return (
        <>
            <div id={`${ style.chatContainer }`}>
                <div id={`${ style.chatComponent }`}>
                    <div id={`${ style.chatToolbar }`}>
                        <span>Conversation</span>
                    </div>
    
                    <div className={`${ style.message_wrap }`} ref={chatScroll}>
                        {messageList.map((data, i) => (
                            <div 
                                key={`${i}-Conversation`}
                                className={
                                    `${style.message} ${ data.connectionId !== props.mainStreamManager.session.connection.connectionId ? style.left : style.right }`
                                }
                            >
                                <div className={ `${style.msg_detail }`}>
                                    <div className={ `${style.msg_info }`}>
                                        <p>{data.nickname}</p>
                                    </div>
                                    <div className={ `${style.msg_content }`}>
                                        <p className={ `${style.text }`}>{data.transcript} ( {data.translate} )</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>  


                    <div id={ `${style.transcriptInput }`}>
                        <p>{transcript}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ConversationLog;