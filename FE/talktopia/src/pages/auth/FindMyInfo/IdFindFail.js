import { useNavigate } from "react-router-dom";

import style from "./IdFind.module.css";

function IdFindFail(props) {
    const navigate = useNavigate();

    return (
        <div className={`${style.background}`}>
          <h2 className={`${style.logo}`}>TalkTopia</h2>
          <h2 className={`${style.title}`}>아이디 찾기</h2>
          <img className={`${style["fade-in-box"]}`} src="/img/find1.png"></img>
          <img className={`${style["fade-in-box-1"]}`} src="/img/penguin2.png"></img>
          <p className={`${style["p-1"]}`}>입력하신 이름, 이메일로 가입된 정보가 없습니다.</p>  
          <div className={`${style["button-together"]}`}>
            <button className={`${style["button-together-1"]}`} onClick={()=> navigate('/findId')}>아이디 찾기</button>
            <button className={`${style["button-together-1"]}`} onClick={() => navigate('/regist')}>로그인하러가기</button>
          </div>
        </div>
    );
}

export default IdFindFail;