import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../utils';

function RealHome() {
  const user = useSelector((state) => state.userInfo);

  // State 생성
  const [friendList, setFriendList] = useState([]);

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

  useEffect(() => {
    getFriendList();
  }, []); // componentDidMount에서 한 번만 호출하도록 빈 배열 전달

  return (
    <div>
      {
        friendList.map((friend, i) => (
          <div key={i}>
            <p>{friend.id}</p>
            {/* 기타 친구 정보를 화면에 출력하고 싶은 경우 추가 */}
          </div>
        ))
      }
    </div>
  );
}

export default RealHome;
