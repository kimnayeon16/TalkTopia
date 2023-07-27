import React, { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const App = () => {
  const [myname, setMyname] = useState("");
  const [finalTranscripts, setFinalTranscripts] = useState("");
  const [interimTranscripts, setInterimTranscripts] = useState("");
  const [messages, setMessages] = useState([]);

  // 웹소켓 통신 시작
  const sockJs = new SockJS("http://192.168.31.232:5000/audio-stream");
  const stomp = Stomp.over(sockJs);

  // 웹소켓 연결
  const connect = () => {
    stomp.connect({}, (frame) => {
      stomp.subscribe("/topic/getText/", (message) => {
        console.log(JSON.parse(message.body));
        showMessage(JSON.parse(message.body));
      });
    });
  };

  // 메세지 출력
  const showMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // 웹소켓에 전달하는 기능
  const send = () => {
    const sendMessage = {
      sender: myname,
      content: finalTranscripts,
    };
    stomp.send("/app/sendText", {}, JSON.stringify(sendMessage));
  };

  // 웹소켓 연결 시작
  connect();
  // 웹소켓 통신 끝

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "ko-KR";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const handleRecognitionStart = () => {
    recognition.start();
    console.log("말 시작!!!");
  };

  const handleRecognitionEnd = () => {
    recognition.stop();
    console.log("말 끝!!!");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    if (event.results[0].isFinal) {
      setFinalTranscripts(transcript);
      setInterimTranscripts("");
      send();
    } else {
      setInterimTranscripts(transcript);
    }
  };

  recognition.onspeechend = () => {
    recognition.stop();
    console.log("speech end");
  };

  recognition.onerror = (event) => {
    console.log("Error occurred in recognition: " + event.error);
  };

  return (
    <div>
      <input
        type="text"
        id="myname"
        placeholder="님이름입력"
        value={myname}
        onChange={(e) => setMyname(e.target.value)}
      />
      <button className="click" onClick={handleRecognitionStart} disabled={finalTranscripts !== ""}>
        누르면 음성인식 시작
      </button>
      <button className="click-end" onClick={handleRecognitionEnd} disabled={finalTranscripts === ""}>
        누르면 음성인식 끝
      </button>
      <div className="output">
        {finalTranscripts}
        <span style={{ color: "#999" }}>{interimTranscripts}</span>
      </div>
      <div className="message">
        {messages.map((message, index) => (
          <p key={index}>
            {message.sender}가 보낸 메세지: {message.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;