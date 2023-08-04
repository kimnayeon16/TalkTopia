import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../utils";
import style from "./PasswordFind.module.css";

function PasswordFind(){
    const headers ={
        'Content-Type' : 'application/json'
    }

  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmailPrefix, setUserEmailPrefix] = useState("");
  const [userEmailDomain, setUserEmailDomain] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailSelect, setEmailSelect] = useState(true);

  const onIdHandler = (e) => {
    setUserId(e.target.value);
  };

  const onNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const onEmailPrefixHandler = (e) => {
    setUserEmailPrefix(e.target.value);
    setUserEmail(`${e.target.value}@${userEmailDomain}`);
  };

  const onEmailDomainHandler = (e) => {
    setUserEmailDomain(e.target.value);

    const em = e.target.value;
    setEmailSelect(em === "gmail.com" || em === "hotmail.com" || em === "outlook.com" || em === "yahoo.com" || em === "icloud.com" ||
      em === "naver.com" || em === "daum.net" || em === "nate.com" || em === "hanmail.com");

    setUserEmail(`${userEmailPrefix}@${e.target.value}`);
  };

  const findPw = () => {
    const requestBody = {
      userId,
      userName,
      userEmail,
    };
    const requestBodyJSON = JSON.stringify(requestBody);

    console.log(requestBodyJSON);

    axios
      .post(`${BACKEND_URL}/api/v1/user/searchPw`, requestBodyJSON, { headers })
      .then((response) => {
        navigate('/findPassword/success');
        console.log('성공');
        console.log(response);
      })
      .catch((error) => {
        navigate('/findPassword/fail');
        console.log("에러 발생", error);
      });
  };

  const onCheckEnter = (e) => {
    // e.preventDefault();
    if(e.key === 'Enter') {
        findPw();
    }
  }

  
    return(
      <div className={`${style.background}`}>
        <h2 className={`${style.logo}`}>TalkTopia</h2>
        <h2 className={`${style.title}`}>비밀번호 찾기</h2>
        <div className={`${style["img-container"]}`}>
            <img className={`${style["fade-in-box"]}`} src="/img/find1.png"></img>
            <img className={`${style["fade-in-box-1"]}`} src="/img/find3.png"></img>
        </div>
        <p className={`${style.p}`}>TalkTopia 가입 시 등록한 이름, 아이디와 이메일을 입력해주세요.</p>
        <div className={`${style["parent-container"]}`}>
          <input className={`${style.input}`} type="text" value={userId} onChange={onIdHandler} placeholder="아이디" onKeyPress={onCheckEnter}></input><br/>
          <input className={`${style.input}`} type="text" value={userName} onChange={onNameHandler} placeholder="이름" onKeyPress={onCheckEnter}></input><br/>
          <input className={`${style["input-email"]}`} type="text" value={userEmailPrefix} onChange={onEmailPrefixHandler} placeholder="이메일"></input>
            <span className={`${style["input-email-1"]}`}>@</span>
            {emailSelect === true ? (
              <select className={`${style["input-email-2"]}`} value={userEmailDomain} onChange={onEmailDomainHandler} onKeyPress={onCheckEnter}>
                <option value="default" disabled> 선택하세요 </option>
                <option value="">직접입력</option>
                <option value="gmail.com">gmail.com</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="icloud.com">icloud.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="nate.com">nate.com</option>
                <option value="hanmail.com">hanmail.com</option>
              </select>
            ) : (
              <>
                <input className={`${style["input-email"]}`} type="text" value={userEmailDomain} onChange={onEmailDomainHandler} onKeyPress={onCheckEnter}></input>
                <span className={`${style.span}`} onClick={() => {setEmailSelect(true); setUserEmailDomain("default") }}>✖</span>
              </>
            )}
        <button className={`${style.button}`} onClick={findPw}>비밀번호 찾기</button>
        </div>
    </div>
    );
}

export default PasswordFind;