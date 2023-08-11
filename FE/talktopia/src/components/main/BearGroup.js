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
          <div className={style.tooltip}>4-person random chat room!</div>
        </div>
      </div>
      <div className={style.bearContainer2}>
        <div className={`${style.bear} ${style.tooltipContainer}`}>
          <div className={style.tooltip}>4-person random chat room!</div>
        </div>
      </div>
      <div className={style.bearContainer3}>
        <div className={`${style.bear} ${style.tooltipContainer}`}>
          <div className={style.tooltip}>4-person random chat room!</div>
        </div>
      </div>
      <div className={style.bearContainer4}>
        <div className={`${style.bear} ${style.tooltipContainer}`}>
          <div className={style.tooltip}>4-person random chat room!</div>
        </div>
      </div>
    </div>
  );
};

export default BearGroup;
