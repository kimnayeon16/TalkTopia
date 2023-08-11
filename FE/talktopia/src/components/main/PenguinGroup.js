import React from 'react';
import style from './mainComponent.module.css';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils';
import { useNavigate } from 'react-router-dom';


const PenguinGroup = () => {
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
    <div className={style.penguinGroup} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={style.peng1Container}>
        <div className={style.peng1}>
          <div className={style.tooltipContainer}/>
        </div>
        <div>
          {join ?
          <div className={`${style["speech-bubble"]}`}>
            <p className={`${style.message}`}>랜덤 2인 방에 참여하세요!</p>
            <button className={`${style.button}`} onClick={() => {enterFriendRoom(2)}}>참여하기</button>
          </div>
          :
          null
        }
        </div>
      </div>
      <div className={style.peng2Container}>
        <div className={style.peng2}>
          {/* <div className={style.tooltipContainer}>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PenguinGroup;
