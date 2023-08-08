import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';
import SockJS from 'sockjs-client'; // <-- 수정
import Stomp from "stompjs";        // <-- 수정
import { BACKEND_URL } from '../../utils';

function ChatWithFriend({friend, sessionId}) {
//   const user = useSelector((state) => state.userInfo);

//   // State 생성
//   const [friendList, setFriendList] = useState([]);

//   const headers = {
//     'Content-Type': 'application/json',
//     // 'Authorization': `Bearer ${user.accessToken}`,
//   };

//   // websocket 함수들
//   const connect = () =>{ 
//     var sockJs = SockJS(`${BACKEND_URL_CHAT}/chat-server`);
//     var stomp = Stomp.over(sockJs);

//     // 웹 소켓 연결
//     stomp.connect({}, (frame) => {
//         stomp.subscribe(`/topic/sub/${location.state.mySessionId}`, (message) => {
//             console.log("JSON.parse(message.body)", JSON.parse(message.body));
//         })
//     })

//   }
  

//   useEffect(() => {
//     connect();
//   }, []); // componentDidMount에서 한 번만 호출하도록 빈 배열 전달

//   // 여기에 채팅창 컴포넌트의 내용을 작성합니다.
//   return (
//     <div className="chat-window">
//       {/* 채팅창 내용 */}
//       <h2>채팅창 컨텐츠</h2>
//       <input type='text' placeholder='뭐라도 입력'></input>
//     </div>
//   );
}


export default ChatWithFriend;
