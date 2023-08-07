import { useState } from 'react';
import style from './SocialLogin.module.css';

function SocialLogin(){
    
    const [userLan, setUserLan] = useState("");
    const [userLanCorrect, setUserLanCorrect] = useState(false);

    const onLanHandler = (e) => {
        setUserLan(e.target.value);
        if(e.target.value.length !== 0){
            setUserLanCorrect(true);
        }
    }

    const regist = (e) => {
        //api 호출
    }

    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.logo}`}>TalkTopia</h2>
            <h2 className={`${style.title}`}>추가 정보 입력</h2>
            <p className={`${style.p}`}>환영합니다! 소셜 로그인으로 가입해주셔서 감사합니다. </p>
            <p className={`${style.p}`}>TalkTopia의 모든 기능을 이용하시려면 간단한 정보를 추가로 입력해주세요.</p>
            <p className={`${style.p}`}>이 정보는 맞춤형 서비스를 제공하는 데에 도움이 됩니다.</p>

            <div className={style["div-join-container"]}>
                <div className={style["div-join"]}>
                    <span className={`${style["span-join"]}`}>사용 언어&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <select className={`${style.selectLan} ${style.input}`} value={userLan} onChange={onLanHandler}>
                        <option value="" disabled>선택하세요</option>
                        <option value="ko-KR">한국어</option>
                        <option value="de-DE">독일어</option>
                        <option value="ru-RU">러시아어</option>
                        <option value="es-ES">스페인어</option>
                        <option value="en-US">영어</option>
                        <option value="it-IT">이탈리아어</option>
                        <option value="id-ID">인도네시아어</option>
                        <option value="ja-JP">일본어</option>
                        <option value="fr-FR">프랑스어</option>
                        <option value="pt-PT">포르투칼어</option>
                        <option value="zh-CN">중국어 간체</option>
                        <option valye="pt-TW">중국어 번체</option>
                        <option value="hi-IN">힌디어</option>
                    </select>
                </div>
            </div>
            <button className={`${style.button}`} onClick={regist}>회원가입 완료</button>

        </div>
    )
}

export default SocialLogin;