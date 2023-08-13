import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';
import ChatWindow from './ChatWindow';
import style from './FriendList.module.css';

function FriendList() {
  const user = useSelector((state) => state.userInfo);



  // State 생성
  const [friendList, setFriendList] = useState([]);
   // 채팅창 표시 여부를 관리하는 상태
   const [showChat, setShowChat] = useState(false);
   const [selectedFriend, setSelectedFriend] = useState(null);
   // 채팅방 session
   const [sessionId, setSessionId] = useState("");
   // 채팅 내용
   const [chats, setChats] = useState([])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  };



  /* 친구 목록 불러오기 */
  const getFriendList = () => {
    axios.get(`${BACKEND_URL}/api/v1/friend/list/${user.userId}`, { headers })
      .then((response) => {
        // console.log(response.data);
        setFriendList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  // enter chat
  const enterChat = (friendId) => {
    const requestBody = {
      "userId" :user.userId,
      "friendId" : friendId
    }
    console.log("enter request body: ", requestBody)
    axios.post(`${BACKEND_URL_CHAT}/api/v1/chat/enter`, JSON.stringify(requestBody)  ,{ headers })
      .then((response) => {
        console.log("enter chat:", response.data);

        /* enter response */
        setSessionId(response.data.sessionId)
        setChats(response.data.chatList) 

        /* chatWindow 모달용 */
        setSelectedFriend(friendId);
        setShowChat(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }



  useEffect(() => {
    getFriendList();
  }, []); // componentDidMount에서 한 번만 호출하도록 빈 배열 전달



  return ( 
    <div className={`${style["friend-list-body"]}`}>
      {
        friendList.map((friend, i) => (
          <div key={i}>
            <p>내 친구{friend.userId}: {friend.userStatus}
              <button className={`${style["send-btn"]}`} onClick={()=>{enterChat(friend.userId)} 
          }>채팅하기</button> </p>
          </div>
        ))

       }
    { /* 채팅창 렌더링 */}
    {/* <ChatWindow friend={selectedFriend} sessionId={sessionId}  showChat={showChat ? 'show-chat' : 'hide-chat'} chatLog={chatLog} /> */}
    {
      showChat && selectedFriend 
      &&(<ChatWindow
        friend={selectedFriend}
        sessionId={sessionId}
        showChat={showChat ? 'show-chat' : 'hide-chat'}
        chats={chats} />)
    }
    </div>
  );
}


export default FriendList;
