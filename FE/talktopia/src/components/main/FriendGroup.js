import React, { useEffect } from 'react';
import style from './mainComponent.module.css';

const FriendGroup = () => {
  useEffect(() => {
    // FriendGroup 관련 액션을 여기에 작성하세요.
  }, []);

  return (
    <>
    <div className={style.friendGroup}>
      <div className={style.nimoContainer}>
      <div className={`${style.nimo} ${style.tooltipContainer}`}/>
      <div className={`${style["speech-bubble1"]}`}>
          <p className={`${style.message}`}>방을 만들어서 친구들과 소통해요!</p>
          <button className={`${style.button}`}>참여하기</button>
      </div>
      </div>
      <div className={style.doriContainer}>
        <div className={`${style.dori} ${style.tooltipContainer}`}>
          {/* <div className={style.tooltip}>Friend chat room!</div> */}
        </div>
      </div>
    </div>
  </> 
  );
};

export default FriendGroup;
