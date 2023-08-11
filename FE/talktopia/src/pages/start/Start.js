import { useNavigate } from "react-router-dom";
import style from "./Start.module.css";
import { useState } from "react";

function NnoStart(){
    const navigate = useNavigate();

    const [animatePenguin, setAnimatePenguin] = useState(false);
    const [splash, setSplash] = useState(false);

    const handleButtonClick = () => {
        setAnimatePenguin(true);

        setTimeout(() => {
            setSplash(true);
          }, 4000); // 10초 지연

          setTimeout(() => {
            setSplash(false);
          }, 5000); // 10초 지연

        setTimeout(() => {
            navigate('/regist');
          }, 5100); // 10초 지연
    };

    return(
        <div className={`${style.background}`}>
            <img className={`${style.cloud}`} src="/img/cloud/cloud1.png" alt=""/>
            <img className={`${style.cloud2}`} src="/img/cloud/cloud2.png" alt=""/>
            <h2 className={`${style.h2}`}>TalkTopia로 넓은 세상을 만나보세요</h2>
            <p className={`${style.p}`}>다양한 국가의 사람들과 화상 채팅을 해보실래요?</p>
            <div className={`${style.content}`}>
                <div className={style["content__container"]}>
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
                    </ul>
                </div>
            </div>
            <img className={`${style.cloud3}`} src="/img/cloud/cloud3.png" alt=""/>
            <button className={`${style.button}`} onClick={handleButtonClick}><span className={`${style.span}`}>💻</span> TalkTopia로 가기 <span className={`${style.span}`}>⛵</span></button>
            <img className={`${animatePenguin ? style.penguin : style.penguin1}`} src="/img/start/penguin.png" alt=""/>
            {/* <img className={`${style.penguin}`} src="/img/그림4.png" alt=""/> */}
            <img className={`${style.wave}`} src="/img/boat/boat3.png" alt=""/>
            <img className={`${style.wave1}`} src="/img/boat/boat5.png" alt=""/>
            <img className={`${splash ? style.splash : style.splash1 }`} src="/img/start/splash.png" alt=""/>
        </div>
    )
}

export default NnoStart;