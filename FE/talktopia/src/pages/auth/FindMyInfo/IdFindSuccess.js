import { useNavigate } from "react-router-dom";

import style from "./IdFind.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function IdFindSuccess() {
    const user = useSelector((state) => state.findMyInfo);
    // const [userName,setUserName] = user.userName;
    // const [userEmail,setUserEmail] = user.userEmail;

    // useEffect(() => {
    //     setUserName(user.userName);
    //     setUserEmail(user.userEmail);
    // })

    const navigate = useNavigate();


    return (
      <div className={`${style.background}`}>
        <h2 className={`${style.logo}`}>TalkTopia</h2>
        <h2 className={`${style.title}`}>아이디 찾기</h2>
        <div className={`${style["img-container"]}`}>
          <img className={`${style["fade-in-box"]}`} src="/img/find1.png"></img>
          <img className={`${style["fade-in-box-1"]}`} src="/img/penguin1.png"></img>
        </div>
        <p className={`${style.p1}`}>개인정보 도용에 대한 피해방지를 위해 아이디 끝 두자리는 ** 처리합니다.</p>
        <p className={`${style.p}`}><span className={`${style.span1}`}>{user.userName}</span>님의 아이디는 <span className={`${style.span1}`}>{user.userEmail}</span>(으)로 등록되어있습니다.</p>
        <div className={`${style["button-together"]}`}>
            <button className={`${style["button-together-1"]}`}  onClick={() => navigate('/regist')}>로그인하러가기</button>
            <button className={`${style["button-together-1"]}`} onClick={()=> navigate('/findPassword')}>비밀번호 찾기</button>
        </div>
  </div>
);
}

export default IdFindSuccess;