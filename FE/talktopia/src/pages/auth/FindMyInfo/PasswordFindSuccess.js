import { useNavigate } from "react-router-dom";

import style from "./PasswordFind.module.css";

function PasswordFindSuccess(){
    const navigate = useNavigate();
    return (
      <div className={`${style.background}`}>
        <h2 className={`${style.logo}`}>TalkTopia</h2>
        <h2 className={`${style["title-1"]}`}>비밀번호 찾기</h2>
        <img className={`${style["fade-in-box"]}`} src="/img/find1.png"></img>
        <img className={`${style["fade-in-box-1"]}`} src="/img/penguin3.png"></img>
        <p className={`${style.p}`}>입력하신 이메일로 임시 비밀번호를 전송했습니다.</p>
        <p className={`${style.p}`}>보안 상의 이유로 임시 비밀번호로 로그인 시 새로운 비밀번호를 설정해야합니다.</p>
        <button className={`${style["button-together-1"]}`} onClick={() => navigate('/changePw')}>비밀번호 변경하기</button>
      </div>
    );
}

export default PasswordFindSuccess;