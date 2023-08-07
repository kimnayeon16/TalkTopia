import React from "react";
import style from "./Start.module.css";
import { useNavigate } from "react-router-dom";

const Start = () => {

  let navigate = useNavigate();
  
  return (
    <div className={`${style.background}`}>
        <h3 className={`${style.title}`}>TalkTopia</h3>
        <p className={`${style.intro}`}>하나의 세계, 하나의 화상채팅</p>
        <p className={`${style["intro-1"]}`}> 국경을 넘어 다양한 사람들과 언어의 장벽 없이 소통할 수 있습니다.<br/>
        TalkTopia로의 항해를 경험해보세요.</p>

        <div className={`${style.content}`}>
            <div className={style["content__container"]}>
                {/* <p className={styles["content__container__text"]}>Hello</p> */}
                <ul className={style["content__container__list"]}>
                    <li className={style["content__container__list__item"]}>안녕하세요</li>
                    <li className={style["content__container__list__item"]}>Hello</li>
                    <li className={style["content__container__list__item"]}>你好</li>
                    <li className={style["content__container__list__item"]}>Bonjour</li>
                    <li className={style["content__container__list__item"]}>привет</li>
                    <li className={style["content__container__list__item"]}>こんにちは</li>
                    <li className={style["content__container__list__item"]}>Hallo</li>
                    <li className={style["content__container__list__item"]}>olá</li>
                    <li className={style["content__container__list__item"]}>Hola</li>
                    <li className={style["content__container__list__item"]}>Ciao</li>
                    <li className={style["content__container__list__item"]}>नमस्ते</li>
                    <li className={style["content__container__list__item"]}>Halo</li>
                    {/* <li className={style["content__container__list__item-1"]}>안녕하세요</li>
                    <li className={style["content__container__list__item-2"]}>Hello</li>
                    <li className={style["content__container__list__item-3"]}>你好</li>
                    <li className={style["content__container__list__item-4"]}>Bonjour</li>
                    <li className={style["content__container__list__item-5"]}>привет</li>
                    <li className={style["content__container__list__item-6"]}>こんにちは</li>
                    <li className={style["content__container__list__item-7"]}>Hallo</li>
                    <li className={style["content__container__list__item-8"]}>olá</li>
                    <li className={style["content__container__list__item-9"]}>Hola</li>
                    <li className={style["content__container__list__item-10"]}>Ciao</li>
                    <li className={style["content__container__list__item-11"]}>नमस्ते</li>
                    <li className={style["content__container__list__item-12"]}>Halo</li> */}
                </ul>
            </div>
        </div>
        <button className={`${style.button}`} onClick={()=>{navigate('/regist')}}>TalkTopia로 떠나실래요? <span className={`${style.span}`}>⛵</span></button>
    </div>
  );
};  

export default Start;
