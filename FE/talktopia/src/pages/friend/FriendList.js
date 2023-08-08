import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL, BACKEND_URL_CHAT } from '../../utils';

function FriendList() {
//   const user = useSelector((state) => state.userInfo);

//   // State 생성
//   const [friendList, setFriendList] = useState([]);

//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${user.accessToken}`,
//   };

//   // 친구 목록을 불러오는 함수
//   const getFriendList = () => {
//     axios.get(`${BACKEND_URL}/api/v1/friend/list/${user.userId}`, { headers })
//       .then((response) => {
//         console.log(response.data);
//         setFriendList(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // enter chat
//   const enterChat = (friendId) => {
//     const requestBody = {
//       "userId" :user.userId,
//       "friendId" : friendId
//     }
//     axios.post(`${BACKEND_URL_CHAT}/api/v1/chat/enter`, {requestBody}  ,{ headers })
//       .then((response) => {
//         console.log(response);

//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   useEffect(() => {
//     getFriendList();
//   }, []); // componentDidMount에서 한 번만 호출하도록 빈 배열 전달

//   return (
//     <div>
//       {
//         friendList.map((friend, i) => (
//           <div key={i}>
//             <p>내 친구{friend}랑 채팅하기!! <button id="chat" onClick={()=>{enterChat(friendId)}}></button> </p>
            
//           </div>
//         ))
//       }
//     </div>
//   );
}


export default FriendList;
