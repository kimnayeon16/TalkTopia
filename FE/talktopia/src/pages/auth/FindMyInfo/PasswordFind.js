import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../utils";
import style from "./PasswordFind.module.css";

function PasswordFind(){
    const headers ={
        'Content-Type' : 'application/json'
    }

  const [findMyPw, setFindMyPw] = useState(2);
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
        setFindMyPw(1);
        console.log('성공');
        console.log(response);
      })
      .catch((error) => {
        setFindMyPw(0);
        console.log("에러 발생", error);
      });
  };

  
    return(
        <div>
            {findMyPw === 2 && (
                <PwFindMain userName={userName} userEmailPrefix={userEmailPrefix} onIdHandler={onIdHandler} onNameHandler={onNameHandler} onEmailPrefixHandler={onEmailPrefixHandler}
                userEmailDomain={userEmailDomain} onEmailDomainHandler={onEmailDomainHandler} emailSelect={emailSelect} findPw={findPw} setFindMyPw={setFindMyPw} />
            )}

            {findMyPw === 1 && <PwFindMainYes />}

            {findMyPw === 0 && <PwFindMainNo setFindMyPw={setFindMyPw} />}
    </div>
    )
}

function PwFindMain(props) {
    return (
      <div>
        <span>아이디</span>
        <input className={`${style["input-idfind"]}`} type="text" value={props.userId} onChange={props.onIdHandler} placeholder="아이디" ></input>

        <span>이름</span>
        <input className={`${style["input-idfind"]}`} type="text" value={props.userName} onChange={props.onNameHandler} placeholder="이름" ></input>
  
        <span>이메일</span>
        <input className={`${style["input-idfind"]}`} type="text" value={props.userEmailPrefix} onChange={props.onEmailPrefixHandler} placeholder="이메일"></input>
        <span>@</span>
        {props.emailSelect === true ? (
          <select
            value={props.userEmailDomain}
            onChange={props.onEmailDomainHandler}
          >
            <option value="default" disabled>
              선택하세요
            </option>
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
            <input
              className={`${style["input-idfind"]}`}
              type="text"
              value={props.userEmailDomain}
              onChange={props.onEmailDomainHandler}
            ></input>
            <p onClick={() => { props.setEmailSelect(true); props.setUserEmailDomain("default") }}>✖</p>
          </>
        )}
        <button className={`${style["button-idFind"]}`} onClick={props.findPw}>비밀번호 찾기</button>
      </div>
    );
  }

//비밀번호 찾기 완료
function PwFindMainYes() {
    const navigate = useNavigate();
    return (
      <div>
        <p>입력하신 이메일로 임시 비밀번호를 전송했습니다.</p>
        <p>보안 상의 이유로 임시 비밀번호로 로그인 시 새로운 비밀번호를 설정해야합니다.</p>
        <button className={`${style["button-idFind"]}`} onClick={() => navigate('/regist')}>로그인하러가기</button>
      </div>
    );
}

//비밀번호 찾기 실패
function PwFindMainNo(props) {
    const navigate = useNavigate();

    return (
        <div>
        <p>입력하신 정보로 가입된 정보가 없습니다.</p>
        <button className={`${style["button-idFind"]}`} onClick={() => navigate('/regist')}>로그인하러가기</button>
        <button className={`${style["button-idFind"]}`} onClick={() => navigate('/findId')}>아이디 찾기</button>
        <button className={`${style["button-idFind"]}`} onClick={() => {props.setFindMyPw(2)}}>비밀번호 찾기</button>
        </div>
    );
}

export default PasswordFind;