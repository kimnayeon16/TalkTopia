import React, { useEffect } from 'react';
import style from './mainComponent.module.css';

const BearGroup = () => {
  useEffect(() => {
    // BearGroup 관련 액션을 여기에 작성하세요.
  }, []);

  return (
    <div className={style.bearGroup}>
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
          <div className={`${style["speech-bubble3"]}`}>
            <p className={`${style.message}`}>랜덤 6인 방에 참여하세요!</p>
            <button className={`${style.button}`}>참여하기</button>
          </div>
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
