import React from 'react';
import style from './mainComponent.module.css';


const PenguinGroup = () => {

  return (
    <div className={style.penguinGroup}>
      <div className={style.peng1Container}>
        <div className={style.peng1}>
          <div className={style.tooltipContainer}/>
        </div>
        <div>
          <div className={`${style["speech-bubble"]}`}>
            <p className={`${style.message}`}>랜덤 2인 방에 참여하세요!</p>
            <button className={`${style.button}`}>참여하기</button>
          </div>
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
