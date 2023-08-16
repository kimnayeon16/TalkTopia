import { useNavigate } from "react-router-dom";

import style from "./PasswordFindSuccess.module.css";

function PasswordFindSuccess(){
    const navigate = useNavigate();
    return (
      <div className={`${style.background}`}>
        <h2 className={`${style.logo}`}>TalkTopia</h2>
        <h2 className={`${style["title-1"]}`}>비밀번호 찾기</h2>
        <img className={`${style["fade-in-box"]}`} src="/img/find1.png" alt=""></img>
        <img className={`${style["fade-in-box-1"]}`} src="/img/penguin3.png" alt=""></img>
        <p className={`${style.p}`}>입력하신 이메일로 임시 비밀번호를 전송했습니다.</p>
        <p className={`${style.p}`}>발급된 비밀번호는 임시적인 것이므로 로그인 후 꼭 마이페이지에서 비밀번호를 변경해주세요.</p>
        <button className={`${style["button-together-1"]}`} onClick={() => navigate('/regist')}>로그인 하러가기</button>
        <img className={`${style.turtle}`} src="/img/fish/turtle.png" alt=""></img>
            <img className={`${style.grass2}`} src="/img/grass/grass2.png" alt=""></img>
            <img className={`${style.grass5}`} src="/img/grass/grass5.png" alt=""></img>
            <img className={`${style.fish4}`} src="/img/fish/fish4.png" alt=""></img>
            <img className={`${style.fish33}`} src="/img/fish/fish33.png" alt=""></img>
            <img className={`${style.fish34}`} src="/img/fish/fish34.png" alt=""></img>
            <img className={`${style.friend14}`} src="/img/fish/friend14.png" alt=""></img>
            <img className={`${style.bubble1}`} src="/img/bubble/bubble1.png" alt=""></img>
            <img className={`${style.bubble2}`} src="/img/bubble/bubble2.png" alt=""></img>
            <img className={`${style.bubble3}`} src="/img/bubble/bubble3.png" alt=""></img>
      </div>
    );
}

export default PasswordFindSuccess;