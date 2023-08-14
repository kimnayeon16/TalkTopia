import React, { useState } from 'react';
import style from './mainComponent.module.css';
import axios from 'axios';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';
import { useSelector } from 'react-redux';


import { useEffect } from 'react';
import friendListStyle from './FriendList.module.css';
import ChatWindow from '../../pages/friend/ChatWindow';

const FriendList = () => {
  const user = useSelector((state) => state.userInfo);
  
  
  const [isUp, setIsUp] = useState(false);
  /* friend list용 state */
  const [friendList, setFriendList] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false); // 친구창 모달
  const [selectedFriendId, setSelectedFriendId] = useState(null); // 선택된 친구 아이디
  const [selectedFriendName, setSelectedFriendName] = useState(null); // 선택된 친구 아이디
  const [showChat, setShowChat] = useState(false); // 채팅방 표시 여부
  const [enterSessionId, setEnterSessionId] = useState(""); // 채팅방 session
  const [chats, setChats] = useState([]) // 채팅 내용
  /* friend list용 state 끝 */




  /* 함수 영역 시작 */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  };

  const crabClick = () => {
    console.log("ccc")

    fetchFriends();

    setIsUp(true);
    // if (isUp === true) {
      setTimeout(() => {
        setIsUp(false);
      }, 9000);
    // }
  };

  const fetchFriends = () =>{
    console.log("fetch??")
    console.log(`${user.userId}`)
    axios.get(`${BACKEND_URL}/api/v1/friend/list/${user.userId}`, { headers })
    .then((response) => {
      console.log(response)
      setFriendList(response.data);
      setIsListVisible(true)
    })
    .catch((error) => {
      console.log(error);
    });

  }

    // enter chat
    const enterChat = (friend) => {
      const requestBody = {
        "userId" :user.userId,
        "friendId" : friend.userId
      }
      // console.log("enter request body: ", requestBody)
      axios.post(`${BACKEND_URL_CHAT}/api/v1/chat/enter`, JSON.stringify(requestBody)  ,{ headers })
        .then((response) => {
          // console.log("enter chat:", response.data);
  
          /* enter response */
          setEnterSessionId(response.data.sessionId)
          setChats(response.data.chatList) 
  
          /* chatWindow 모달용 */
          setSelectedFriendId(friend.userId);
          setSelectedFriendName(friend.userName);
          setShowChat(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  /* 함수 영역 끝 */



  // JSX ================================================================================================
  return (
    <div className={style.friendList}>
      <div className={`${style.crabContainer1}`}>
        <div onClick={crabClick} className={` ${isUp ? style.up : style.crab}`}></div>
      </div>

      { isListVisible &&
        <div className={`${friendListStyle["friend-list-modal-overlay"]}`}>
          <div className={`${friendListStyle["friend-list-modal"]}`}>
            <h2 className={`${friendListStyle["friend-list-h2"]}`}>친구 목록</h2>
            {/* <button onClick={setIsListVisible(false)} className={`${friendListStyle["modal-close-btn"]}`}>X</button> */}
            <button onClick={() => {setIsListVisible(false); setShowChat(false) }} className={`${friendListStyle["modal-close-btn"]}`}>X</button>
            
            <div className={`${friendListStyle["friend-list"]}`}>
              { friendList && 
                friendList.map((friend, i) => (
                  <div key={i} className={`${friendListStyle["friend-section"]}`}>
                    <div className={`${friendListStyle["friend-section-profile"]}`}>
                      <img src={friend.userImg}></img>
                    </div>
                    <div className={`${friendListStyle["friend-section-name"]}`}>
                      <div className={`${friendListStyle["friend-section-name-status"]}`}>
                        {friend.userStatus}
                      </div>
                      <div>
                        {friend.userName}
                      </div>
                    </div>
                    <button className={`${friendListStyle["enter-chat-btn"]}`} onClick={()=>{enterChat(friend)}}>채팅하기</button>
                  </div>
                ))
              }
            </div>
          </div>

          { isListVisible &&
            showChat && selectedFriendId
            &&(<ChatWindow
              friendId={selectedFriendId}
              friendName={selectedFriendName}
              sessionId={enterSessionId}
              showChat={showChat ? 'show-chat' : 'hide-chat'}
              chats={chats} />)
          }
        </div>
      }


    </div>
  )};

export default FriendList;
