import React, { useEffect, useState } from 'react';
import style from './mainComponent.module.css';
import { BACKEND_URL } from '../../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FriendGroup = () => {
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
    <>
    <div className={style.friendGroup} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={style.nimoContainer}>
      <div className={`${style.nimo} ${style.tooltipContainer}`}>
      </div>
      </div>
      <div className={style.doriContainer}>
        <div className={`${style.dori} ${style.tooltipContainer}`}>
          {
            join ?
          <div className={`${style["speech-bubble1"]}`}>
            <p className={`${style.message}`}>방을 만들어서 친구들과 소통해요!</p>
            <button className={`${style.button}`} onClick={()=>{enterFriendRoom(6)}}>참여하기</button>
          </div>
            :
            null
          }
        </div>
      </div>
    </div>
  </> 
  );
};

export default FriendGroup;
