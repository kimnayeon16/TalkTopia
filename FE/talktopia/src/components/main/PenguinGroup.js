import React, { useEffect } from 'react';
import style from './mainComponent.module.css';


const PenguinGroup = () => {
  useEffect(() => {
    // PenguinGroup 관련 액션을 여기에 작성하세요.
  }, []);

  return (
    <div className={style.penguinGroup}>
      <div className={style.peng1Container}>
        <div className={style.peng1}>
          <div className={style.tooltipContainer}>
            <div className={style.tooltip}>Penguin group tooltip 1</div>
          </div>
        </div>
      </div>
      <div className={style.peng2Container}>
        <div className={style.peng2}>
          <div className={style.tooltipContainer}>
            <div className={style.tooltip}>Penguin group tooltip 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenguinGroup;
