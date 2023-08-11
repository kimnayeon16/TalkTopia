import React, { useEffect } from 'react';
import style from './mainComponent.module.css';


const WhaleGroup = () => {
  useEffect(() => {
    // WhaleGroup 관련 액션을 여기에 작성하세요.
  }, []);

  return (
    <div className={style.whaleGroup}>
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
        <div className={`${style["speech-bubble2"]}`}>
            <p className={`${style.message}`}>랜덤 4인 방에 참여하세요!</p>
            <button className={`${style.button}`}>참여하기</button>
          </div>
      </div>
    </div>
  );
};

export default WhaleGroup;
