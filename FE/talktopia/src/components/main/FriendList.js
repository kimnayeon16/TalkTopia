import React, { useState } from 'react';
import style from './mainComponent.module.css';

const FriendList = () => {
  const [isUp, setIsUp] = useState(false);

  const crabClick = () => {
    setIsUp(true);
    if (isUp === true) {
      setTimeout(() => {
        setIsUp(false);
      }, 10000);
    }
  };

  return (
    <div className={style.friendList}>
      <div className={`${style.crabContainer1}`}>
        <div onClick={crabClick} className={` ${isUp ? style.up : style.crab}`}></div>
      </div>
    </div>
  );
};

export default FriendList;
