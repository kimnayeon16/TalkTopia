import React, { useEffect, useState } from 'react';
import style from './mainComponent.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils';

const BearGroup = () => {
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
    <div className={style.bearGroup} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={style.bearContainer1}>
        <div className={`${style.bear} ${style.tooltipContainer}`}>
        </div>
      </div>
      <div className={style.bearContainer2}>
        <div className={`${style.bear} ${style.tooltipContainer}`}>
        </div>
      </div>
      <div className={style.bearContainer3}>
        <div className={`${style.bear} ${style.tooltipContainer}`}>
          {
            join?
          <div className={`${style["speech-bubble3"]}`}>
            <p className={`${style.message}`}>랜덤 6인 방에 참여하세요!</p>
            <button className={`${style.button}`} onClick={enterFriendRoom(6)}>참여하기</button>
          </div>
          :
          null

          }
        </div>
      </div>
      <div className={style.bearContainer4}>
        <div className={`${style.bear} ${style.tooltipContainer}`}>
        </div>
      </div>
    </div>
  );
};

export default BearGroup;
