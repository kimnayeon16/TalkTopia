import React, { useEffect } from 'react';
import style from './mainComponent.module.css';

const FriendGroup = () => {
  useEffect(() => {
    // FriendGroup 관련 액션을 여기에 작성하세요.
  }, []);

  return (
    <div className={style.friendGroup}>
      <div className={style.nimoContainer}>
        <div className={`${style.nimo} ${style.tooltipContainer}`}>
          <div className={style.tooltip} style={{ transform: 'scaleX(-1)' }}>
            Friend chat room!
          </div>
        </div>
      </div>
      <div className={style.doriContainer}>
        <div className={`${style.dori} ${style.tooltipContainer}`}>
          <div className={style.tooltip}>Friend chat room!</div>
        </div>
      </div>
    </div>
  );
};

export default FriendGroup;
