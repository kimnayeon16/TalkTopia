import { useNavigate } from "react-router-dom";
import style from "./NnoStart.module.css";
import { useState } from "react";

function NnoStart(){
    const navigate = useNavigate();

    const [animatePenguin, setAnimatePenguin] = useState(false);

    const handleButtonClick = () => {
        setAnimatePenguin(true);
        // navigate('/regist');
      };

    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.h2}`}>바다 너머로, 더 넓은 세상을 만나보세요</h2>
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
            <button className={`${style.button}`} onClick={handleButtonClick}>TalkTopia로 떠나실래요? <span className={`${style.span}`}>⛵</span></button>
            {/* <img className={`${animatePenguin ? style.penguin : style.penguin1}`} src="/img/그림4.png" alt=""/> */}
            <img className={`${style.penguin}`} src="/img/그림4.png" alt=""/>
        </div>
    )
}

export default NnoStart;