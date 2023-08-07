import { useNavigate } from "react-router-dom";

import style from "./PasswordFind.module.css";

function PasswordFindFail(){
    const navigate = useNavigate();

    return (
        <div className={`${style.background}`}>
            <h2 className={`${style.logo}`}>TalkTopia</h2>
            <h2 className={`${style["title-1"]}`}>비밀번호 찾기</h2>
            <img className={`${style["fade-in-box"]}`} src="/img/find1.png" alt=""></img>
            <img className={`${style["fade-in-box-1"]}`} src="/img/penguin4.png" alt=""></img>
            <p className={`${style.p}`}>입력하신 정보로 가입된 정보가 없습니다.</p>
            <div className={`${style["button-together"]}`}>
                <button className={`${style["button-together-1"]}`} onClick={() => navigate('/regist')}>로그인하러가기</button>
                <button className={`${style["button-together-1"]}`} onClick={() => navigate('/findId')}>아이디 찾기</button>
                <button className={`${style["button-together-1"]}`} onClick={() => navigate('/findPassword')}>비밀번호 찾기</button>
            </div>
        </div>
    );
}
export default PasswordFindFail;