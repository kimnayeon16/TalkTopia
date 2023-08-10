import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';
import SockJS from 'sockjs-client'; // <-- 수정
import Stomp from "stompjs";        // <-- 수정
import style from './ChatWindow.module.css';
// import allStyle from './Friend.module.css';

function ChatWindow({friend, sessionId, showChat, chats}) {
  const user = useSelector((state) => state.userInfo);
  
  useEffect(() => {
    
    if (showChat && sessionId && !stomp) { // !stomp : 웹소켓 연결 안됐을때만 connect
      connect();
    }
  }, []); // componentDidMount에서 한 번만 호출하도록 빈 배열 전달
  useEffect(()=>{
    setChatLog(chats)
  }, [chats])

  /* state start */
  const [chatMsg, setChatMsg] = useState("");
  // 채팅 내용
  const [chatLog, setChatLog] = useState(chats)
  // 웹소켓 전용 sockJs, stomp
  const[sockJs, setSockJs] = useState();
  const[stomp, setStomp] = useState();
  /* state end */


  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${user.accessToken}`,
  };


  /* websocket start */
  // var sockJs= SockJS(`${BACKEND_URL_CHAT}/chat-server`); 
  // var stomp = Stomp.over(sockJs);

  const connect = () =>{ 
    // 이전에 연결 돼있으면
    if (stomp && stomp.connected ) {
      stomp.disconnect(function(){
        console.log("disconnect!")
      }); // 이전 연결 끊기
    }


    const newSockJs = new SockJS(`${BACKEND_URL_CHAT}/chat-server`);
    setSockJs(newSockJs);
    
    const newStomp = Stomp.over(newSockJs);
    setStomp(newStomp);

    console.log("connect실행!! stomp=>", stomp)

    // 웹소켓 연결
    newStomp.connect({}, (frame) => {
      console.log("웹소켓 연결 완료 stomp=>", newStomp)
      newStomp.subscribe(`/topic/sub/${sessionId}`, (message) => {
        console.log(message)
        // console.log("subscribe==>", JSON.parse(message));
        // showChatMsg(JSON.parse(message));  // subscribe결과 화면에 출력
      })
    })
  }

  // 웹소켓 서버로 메세지 전달
  const sendChatMsg = () =>{
    console.log("메세지 보내기 실행!! stomp=>", stomp)
    if(stomp){
      console.log("메세지 보내기 진짜 된다!!!")
      const sendMessage = {
        "sender" : user.userId,
        "content" : chatMsg
      }
      stomp.send(`/app/send/${sessionId}`, {}, JSON.stringify(sendMessage));
    }
  }
  /* websocket end */


  const showChatMsg = (message)=>{
    const newChatLog = [...chatLog, message];
    setChatLog(newChatLog); // chatLog를 업데이트하고 화면을 다시 렌더링
  }


  return (
    <div className={`${style["chat-window"]}  ${style[showChat]}`}>
      {/* 채팅창 내용 */}
      <div className={`${style["chat"]}`}>


        <div className={`${style["chat-header"]}`}>
          <h2>{friend}와의 채팅</h2>
        </div>


        <div id="chat-content" className={`${style["chat-content"]}`}>
          { chatLog && 
            chatLog.map((chat, i) => (
              <div key={i} className={`${style["chat-msg-parent"]}`}>
                {chat.scrcSenderId == user.userId &&
                  // 채팅을 보낸사람이 나일때
                  <div className={`${style["my-chat-msg"]}`}>
                    <div>{chat.scrcSession}</div>
                    <span>보낸사람 : <b>{chat.scrcSenderId}</b></span>
                    <span className={`${style["chat-send-time"]}`}>{chat.scrcSendTime}</span>
                    <div className={`${style["chat-msg"]}`}>{chat.scrcContent}
                    </div>
                  </div>
                }

                {chat.scrcSenderId != user.userId &&  // 채팅을 보낸사람이 친구일때
                  <div className={`${style["friend-chat-msg"]}`}>
                    <div>{chat.scrcSession}</div>
                    <span>보낸사람 : <b>{chat.scrcSenderId}</b>  </span>
                    <span className={`${style["chat-send-time"]}`}>{chat.scrcSendTime}</span>
                    <div className={`${style["chat-msg"]}`}>{chat.scrcContent}
                    </div>
                  </div>
                }
              </div>
            ))
          }
        </div>


        <div className={`${style["chat-input"]}`}>
          <input type='text' placeholder='채팅 입력...' 
            onChange={e=>setChatMsg(e.target.value)}>
          </input>
          <button className={`${style["send-btn"]}`} onClick={sendChatMsg}>전송</button>
        </div>


      </div>
    </div>
  );
}


export default ChatWindow;
