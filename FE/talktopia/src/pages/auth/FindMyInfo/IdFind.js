import { useState } from "react";
import style from "./IdFind.module.css";
import axios from "axios";
import { BACKEND_URL } from "../../../utils";
import { useNavigate } from "react-router-dom";

function IdFind() {
    const headers ={
        'Content-Type' : 'application/json'
    }

    const [userName, setUserName] = useState("");
    const [userEmailPrefix, setUserEmailPrefix] = useState("");
    const [userEmailDomain, setUserEmailDomain] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [emailSelect, setEmailSelect] = useState(true);
    const [someId, setSomeId] = useState("");

    const [findMyId, setFindMyId] = useState(2);
    const navigate = useNavigate();

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
      setEmailSelect(
        em === "gmail.com" ||
        em === "hotmail.com" ||
        em === "outlook.com" ||
        em === "yahoo.com" ||
        em === "icloud.com" ||
        em === "naver.com" ||
        em === "daum.net" ||
        em === "nate.com" ||
        em === "hanmail.com"
      );

      setUserEmail(`${userEmailPrefix}@${e.target.value}`);
    };

    const findId = () => {
      const requestBody = {
        userName,
        userEmail,
      };
      const requestBodyJSON = JSON.stringify(requestBody);

      console.log(requestBodyJSON);

      axios
        .post(`${BACKEND_URL}/api/v1/user/searchId`, requestBodyJSON, { headers })
        .then((response) => {
          setFindMyId(1);
          console.log('성공');
          console.log(response);
          console.log(response.data.userId);
          const modified = response.data.userId.slice(0, -2) + "**";
          setSomeId(modified);

        })
        .catch((error) => {
          setFindMyId(0);
          console.log("에러 발생", error);
        });
    };

    

    return (
      <div>
        {findMyId === 2 && (
          <IdFindMain userName={userName} userEmailPrefix={userEmailPrefix} onNameHandler={onNameHandler} onEmailPrefixHandler={onEmailPrefixHandler}
            userEmailDomain={userEmailDomain} onEmailDomainHandler={onEmailDomainHandler} emailSelect={emailSelect} findId={findId} setFindMyId={setFindMyId} />
        )}

        {findMyId === 1 && <IdFindMainYes userName={userName} someId={someId}/>}

        {findMyId === 0 && <IdFindMainNo setFindMyId={setFindMyId} />}
      </div>
    );
  }

function IdFindMain(props) {
  return (
    <div>
      <span>이름</span>
      <input className={`${style["input-idfind"]}`} type="text" value={props.userName} onChange={props.onNameHandler} placeholder="이름"></input>

      <span>이메일</span>
      <input className={`${style["input-idfind"]}`} type="text" value={props.userEmailPrefix} onChange={props.onEmailPrefixHandler} placeholder="이메일"></input>
      <span>@</span>
      {props.emailSelect === true ? (
        <select value={props.userEmailDomain} onChange={props.onEmailDomainHandler} >
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
          <input className={`${style["input-idfind"]}`} type="text" value={props.userEmailDomain} onChange={props.onEmailDomainHandler}></input>
          <p onClick={() => { props.setEmailSelect(true); props.setUserEmailDomain("default") }}>✖</p>
        </>
      )}
      <button className={`${style["button-idFind"]}`} onClick={props.findId}>아이디 찾기</button>
    </div>
  );
}

//아이디 찾기 완료
function IdFindMainYes(props) {
  const navigate = useNavigate();
  return (
    <div>
      <p>개인정보 도용에 대한 피해방지를 위해 아이디 끝 두자리는 ** 처리합니다.</p>
      <p>{props.userName}님의 아이디는 {props.someId}(으)로 등록되어있습니다.</p>
      <button>아이디 찾기</button>
      <button className={`${style["button-idFind"]}`} onClick={() => navigate('/regist')}>로그인하러가기</button>
      <button className={`${style["button-idFind"]}`} onClick={()=> navigate('/findPassword')}>비밀번호 찾기</button>
    </div>
  );
}

//아이디 찾기 실패
function IdFindMainNo(props) {
    const navigate = useNavigate();

    return (
        <div>
        <p>입력하신 이름, 이메일로 가입된 정보가 없습니다.</p>
        <button className={`${style["button-idFind"]}`} onClick={()=>{props.setFindMyId(2)}}>아이디 찾기</button>
        <button className={`${style["button-idFind"]}`} onClick={() => navigate('/regist')}>로그인하러가기</button>
        </div>
    );
}

export default IdFind;