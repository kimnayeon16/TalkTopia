import React, { useEffect, useState } from 'react';
import style from './mainComponent.module.css';
import { BACKEND_URL } from '../../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const WhaleGroup = () => {
  const navigate = useNavigate();

  
  const userInfoString = localStorage.getItem("UserInfo");
  const userInfo = JSON.parse(userInfoString);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userInfo.accessToken}`
  }
  const [join, setJoin] = useState(false);

  const handleMouseOver = () => {
    setJoin(true);
  }

  const handleMouseOut = () => {
    setJoin(false);
  }

  const enterFriendRoom = async (e) => {
    const requestBody = {
        userId: userInfo.userId,
        vr_max_cnt: e
    };

    const requestBodyJSON = JSON.stringify(requestBody);
    await axios
    .post(`${BACKEND_URL}/api/v1/room/enterFriend`, requestBodyJSON, {headers})
    .then((response) => {
        console.log(response.data.token)
        navigate('/joinroom', {
            state: {
                mySessionId: response.data.vrSession,
                token: response.data.token,
                roomRole: response.data.roomRole,
                roomType: 'friend'
            }
        });
    })
    .catch((error) => {
        console.log("에러 발생", error);
    })
};

  return (
    <div className={style.whaleGroup} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={style.whiteContainer}>
        <div className={style.whitewhale}></div>
        <div className={style.whitewhale2}></div>
      </div>
      <div className={style.blueContainer}>
        <div className={style.bluewhale}></div>
        <div className={style.bluewhale2}></div>
      </div>
      <div className={style.pinkContainer}>
        <div className={style.pinkwhale}></div>
        <div className={style.pinkwhale2}></div>
        {
          join ?
          <div className={`${style["speech-bubble2"]}`}>
            <p className={`${style.message}`}>랜덤 4인 방에 참여하세요!</p>
            <button className={`${style.button}`} onClick={() => {enterFriendRoom(4)}}>참여하기</button>
          </div>
          : null
        }
      </div>
    </div>
  );
};

export default WhaleGroup;
