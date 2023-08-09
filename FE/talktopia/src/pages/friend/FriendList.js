import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';
import ChatWindow from './ChatWindow';

function FriendList() {
  const user = useSelector((state) => state.userInfo);

  // State 생성
  const [friendList, setFriendList] = useState([]);
   // 채팅창 표시 여부를 관리하는 상태
   const [showChat, setShowChat] = useState(false);
   const [selectedFriend, setSelectedFriend] = useState(null);
   // 채팅방 session
   const [sessionId, setSessionId] = useState("");

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  };

  // 친구 목록을 불러오는 함수
  const getFriendList = () => {
    axios.get(`${BACKEND_URL}/api/v1/friend/list/${user.userId}`, { headers })
      .then((response) => {
        console.log(response.data);
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
    axios.post(`${BACKEND_URL_CHAT}/api/v1/chat/enter`, {requestBody}  ,{ headers })
      .then((response) => {
        console.log("enter chat:", response.data);
        // setSessionId(response.data.sessionId);
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
    <div>
      {
        friendList.map((friendId, i) => (
          <div key={i}>
            <p>내 친구{friendId}:  <button id="chat" onClick={()=>{enterChat(friendId)}}>채팅하기</button> </p>
            
          </div>
        ))

    }
    { /* 채팅창 렌더링 */}
    {
        showChat && selectedFriend &&
         ( <ChatWindow friend={selectedFriend} className={showChat ? 'show-chat' : ''} /> )
    }
    </div>
  );
}


export default FriendList;
