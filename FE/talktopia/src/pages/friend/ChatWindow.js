import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';
import SockJS from 'sockjs-client'; // <-- 수정
import Stomp from "stompjs";        // <-- 수정
import style from './ChatWindow.module.css';
import { AiOutlineClose } from "react-icons/ai";


// import allStyle from './Friend.module.css';

function ChatWindow({friend, sessionId, showChat, onShowChat, chats}) {
  const user = useSelector((state) => state.userInfo);



  /* state start */
  const [chatMsg, setChatMsg] = useState("");
  // 채팅 내용
  const [chatLog, setChatLog] = useState(chats)
  // 웹소켓 전용 sockJs, stomp
  let [stompClient, setStompClient] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [chatTimes, setChatTimes] = useState([]);
  // const [componentLoaded, setComponentLoaded] = useState(false)
  const observerRef = useRef(null);
  const hasMoreLogs = useRef(true);
  const chatWindowRef = useRef(null); // 스크롤용 
  /* state end */
  
  useEffect(() => {
    // if (showChat && sessionId) { 
    //   connect();
    // }
  }, []); // 최초 1회렌더링



//  세션아이디 변경시 useEffect /////////////////////
  useEffect(() => {
    //////////////////// 웹소켓 ////////////////////
    // 이전에 연결 돼있으면
    // console.log("useEffect triggered by sessionId change:", sessionId);
    // console.log("useEffect triggered by friendID change:", friendId);


    if (stompClient && stompClient.connected ) {
      // console.log("Attempting to disconnect existing stompClient connection");
      stompClient.disconnect();
      stompClient = null;
      console.log("Disconnected!");
    }
    // console.log("Attempting to connect to WebSocket");
    connect();

    ////////////// 채팅내용 재반영 //////////////////
    setChatLog(chats) // 채팅내용 재반영
    let formatedTimes = [];
    chats.forEach((chat)=>formatedTimes.push(formatDate(chat.scrcSendTime)));
    setChatTimes(formatedTimes);

    // After chatLog is updated, scroll to the bottom of the chat window
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }

    // // 스크롤 이벤트용 ////////////////////////////////////////////
    hasMoreLogs.current = true; // 스크롤가능하게함
    // IntersectionObserver를 생성하고 연결
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // 스크롤 이벤트 1.5초 지연
        setTimeout(() => {
          loadMoreChatLogs();
        }, 1500);
      }
    });
    
    if (observerRef.current) {
      observerRef.current.observe(document.querySelector('#placeholder'));
    }
    
    return () => {
      // 컴포넌트 언마운트 시 이벤트 해제
      if (observerRef.current) {
        observerRef.current.disconnect();
        hasMoreLogs.current = true;
        observerRef.current=null
      }

      // 이 부분은 언마운트될 때 연결을 해제하는 로직입니다.
      if (stompClient && stompClient.connected) {
        console.log("Component unmounting. Disconnecting stomp.");
        stompClient.disconnect();
      }
    };
  }, [friend, sessionId]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatLog]);

  /* end useEffect */



  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${user.accessToken}`,
  };


  // 웹소켓 서버로 메세지 전달
  /* 함수영역 시작 */

  const connect = () =>{ 
    const stomp = Stomp.over(new SockJS(`${BACKEND_URL_CHAT}/chat-server`));
    console.log("connect실행!! stomp=>", stomp)


    // 웹소켓 연결
    stomp.connect({}, (frame) => {
      console.log("웹소켓 연결 완료 stomp=>", stomp)
      setStompClient(stomp);
      
      stomp.subscribe(`/topic/sub/${sessionId}`, (message) => {
        setChatLog(prevLog => [...prevLog, JSON.parse(message.body)]);
        setChatTimes(prevTimes => [...prevTimes, formatDate(JSON.parse(message.body).scrcSendTime)]);
      })
    })
  }

  const sendChatMsg = () =>{
    if(chatMsg==""){
      alert("메세지를 작성해주세요!")
      return;
    }
    if(stompClient){
      const sendMessage = {
        "sender" : user.userId,
        "content" : chatMsg
      }
      stompClient.send(`/app/send/${sessionId}`, {}, JSON.stringify(sendMessage));
    }
    setChatMsg("");
  }

  /* scroll로 메세지 로드 */
  const loadMoreChatLogs = async()=>{
    if (!isLoading && chatLog.length!=0 && hasMoreLogs) {
      setIsLoading(true);
      try{
        let newLogs =await fetchMoreLogs();
        // newLogs = newLogs.reverse();
        if(newLogs)
          setChatLog(prevLogs => [ ...newLogs, ...prevLogs]);
      }
      catch(error){
        console.log("loadMoreChatLogs err", error)
      }
      setIsLoading(false);
    }
  }
  const fetchMoreLogs = ()=>{
    console.log("마지막대화. ", chatLog[0].scrcSendTime)
    const requestBody= {
      "sessionId" : sessionId,
      "lastSendTime" : chatLog[0].scrcSendTime
    }
    return axios.post(`${BACKEND_URL_CHAT}/api/v1/chat/scroll`, JSON.stringify(requestBody), {headers})
    .then((response)=>{
      console.log(response.data)
      if(response.data.hasNext == false){
        hasMoreLogs.current = false;
        if(observerRef.current){
          observerRef.current.disconnect();
        }
      }
      return response.data.chatList
    })
    .catch((error)=>{console.log("scroll 안대!!", error)})
  }
  /* scroll end */
  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      sendChatMsg(); 
    }
  };
  /* 채팅창 닫기 */
  const handleCloseBtn = ()=>{
    onShowChat(false);
  }

  // 시간 포맷
  const formatDate = (inputDate) => {
    const currentDate = new Date();
    const targetDate = new Date(inputDate);
    const timeDiff = currentDate - targetDate;
    
    if (timeDiff < 1800000) { // 30분 이하일 때는 N분전
      const minutesAgo = Math.floor(timeDiff / 60000);
      return minutesAgo > 0 ? `${minutesAgo}분 전` : '방금 전';
    } else {
      const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
      return targetDate.toLocaleString('en-US', options);
    }
  }
  /* 함수영역 끝 */

  return (
    <div className={`${style["chat-window"]}  ${style[showChat]}`}>
      {/* 채팅창 내용 */}
      <div className={`${style["chat"]}`}>


        <div className={`${style["chat-header"]}`}>
          {/* 접속한사람 */}
          { friend.userStatus == "ONLINE" && (
            <div className={`${style["friend-section-profile"]} ${style["friend-section-profile-online"]}`}>
              <img src={friend.userImg}></img>
            </div>)
          }
          {/* 다른용무중 */}
          { friend.userStatus == "BUSY" && (
            <div className={`${style["friend-section-profile"]} ${style["friend-section-profile-busy"]}`}>
              <img src={friend.userImg}></img>
            </div>)
          }
          {/* 미접속 */}
          { (friend.userStatus == "OFFLINE" || friend.userStatus == null) && (
            <div className={`${style["friend-section-profile"]} ${style["friend-section-profile-offline"]}`}>
              <img src={friend.userImg}></img>
            </div>)
          }
          {/* 아예 상태 없음 */}
          {/* { friend.userStatus == null && (
            <div className={`${style["friend-section-profile"]}`}>
              <img src={friend.userImg}></img>
            </div>)
          } */}
          <h2>{friend.userName}</h2>
        </div>


        <div id="chat-content" className={`${style["chat-content"]}`}  ref={chatWindowRef} >
          <button onClick={handleCloseBtn} className={`${style["chat-close-btn"]}`}><AiOutlineClose size='20'/></button>

          <div id="placeholder" className={`${style["placeholder"]}`}></div>
          {isLoading && <div className={`${style["placeholder-loading-msg"]}`}>Loading...</div>}
          { chatLog && 
            chatLog.map((chat, i) => (
              <div key={i} className={`${style["chat-msg-parent"]}`}>
                {chat.scrcSenderId == user.userId &&
                  // 채팅을 보낸사람이 나일때
                  <div className={`${style["my-chat-msg"]}`}>
                    <span className={`${style["chat-send-time"]}`}>{chatTimes[i]}</span>
                    <div className={`${style["chat-msg"]}`}>{chat.scrcContent}
                    </div>
                  </div>
                }

                {chat.scrcSenderId != user.userId &&  // 채팅을 보낸사람이 친구일때
                  <div className={`${style["friend-chat-msg"]}`}>
                      {/* 접속한사람 */}
                      { friend.userStatus == "ONLINE" && (
                        <div className={`${style["friend-section-profile"]} ${style["friend-section-profile-online"]}`}>
                          <img src={friend.userImg}></img>
                        </div>)
                      }
                      {/* 다른용무중 */}
                      { friend.userStatus == "BUSY" && (
                        <div className={`${style["friend-section-profile"]} ${style["friend-section-profile-busy"]}`}>
                          <img src={friend.userImg}></img>
                        </div>)
                      }
                      {/* 미접속 */}
                      { (friend.userStatus == "OFFLINE" || friend.userStatus == null)  && (
                        <div className={`${style["friend-section-profile"]} ${style["friend-section-profile-offline"]}`}>
                          <img src={friend.userImg}></img>
                        </div>)
                      }
                    <div className={`${style["chat-msg"]}`}>{chat.scrcContent}</div>
                      <span className={`${style["chat-send-time"]}`}>{chatTimes[i]}</span>
                  </div>
                }
              </div>
            ))
          }
        </div>


        <div className={`${style["chat-input"]}`}>
          <input type='text' placeholder='채팅 입력...' 
            onChange={e=>setChatMsg(e.target.value)}
            onKeyPress={handleOnKeyPress}
            value = {chatMsg}>
          </input>
          <button className={`${style["chat-send-btn"]}`} onClick={sendChatMsg}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
          </button>
        </div>


      </div>
    </div>
  );
}


export default ChatWindow;
