import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';
import SockJS from 'sockjs-client'; // <-- 수정
import Stomp from "stompjs";        // <-- 수정
import style from './ChatWindow.module.css';

// import allStyle from './Friend.module.css';

function ChatWindow({friendId, friendName, sessionId, showChat, chats}) {
  const user = useSelector((state) => state.userInfo);



  /* state start */
  const [chatMsg, setChatMsg] = useState("");
  // 채팅 내용
  const [chatLog, setChatLog] = useState(chats)
  // 웹소켓 전용 sockJs, stomp
  let [stompClient, setStompClient] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [componentLoaded, setComponentLoaded] = useState(false)
  const observerRef = useRef(null);
  const hasMoreLogs = useRef(true);
  /* state end */
  
  useEffect(() => {
    // if (showChat && sessionId) { 
    //   connect();
    // }
  }, []); // 최초 1회렌더링



//  세션아이디 변경시 useEffect /////////////////////
  useEffect(() => {
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

    // 스크롤 이벤트용 ////////////////////////////////////////////
    hasMoreLogs.current = true; // 스크롤가능하게함
    // IntersectionObserver를 생성하고 연결
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreChatLogs();
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
  }, [friendId, sessionId]);
  



  
  useEffect(()=>{
    setChatLog(chats)
  }, [chats])
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
        // console.log(message)
        console.log("subscribe==>", JSON.parse(message.body));
        // showChatMsg(JSON.parse(message.body));  // subscribe결과 화면에 출력
        setChatLog(prevLog => [...prevLog, JSON.parse(message.body)])
        console.log(user.userId);
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
  /* 함수영역 끝 */

  return (
    <div className={`${style["chat-window"]}  ${style[showChat]}`}>
      {/* 채팅창 내용 */}
      <div className={`${style["chat"]}`}>


        <div className={`${style["chat-header"]}`}>
          <h2>{friendName}와의 채팅</h2>
        </div>


        <div id="chat-content" className={`${style["chat-content"]}`}>
          <div id="placeholder" className={`${style["placeholder"]}`}></div>
          {isLoading && <div className={`${style["placeholder-loading-msg"]}`}>Loading...</div>}
          { chatLog && 
            chatLog.map((chat, i) => (
              <div key={i} className={`${style["chat-msg-parent"]}`}>
                {chat.scrcSenderId == user.userId &&
                  // 채팅을 보낸사람이 나일때
                  <div className={`${style["my-chat-msg"]}`}>
                    {chat.scrcSenderId}
                    <span>보낸사람 : <b>{user.userName}</b></span>
                    <span className={`${style["chat-send-time"]}`}>{chat.scrcSendTime}</span>
                    <div className={`${style["chat-msg"]}`}>{chat.scrcContent}
                    </div>
                  </div>
                }

                {chat.scrcSenderId != user.userId &&  // 채팅을 보낸사람이 친구일때
                  <div className={`${style["friend-chat-msg"]}`}>
                    {chat.scrcSenderId}

                    <span>보낸사람 : <b>{friendName}</b>  </span>
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
            onChange={e=>setChatMsg(e.target.value)}
            onKeyPress={handleOnKeyPress}
            value = {chatMsg}>
          </input>
          <button className={`${style["chat-send-btn"]}`} onClick={sendChatMsg}>전송</button>
        </div>


      </div>
    </div>
  );
}


export default ChatWindow;
