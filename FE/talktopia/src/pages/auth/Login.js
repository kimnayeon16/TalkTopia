import {useState} from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import axios from "axios";


function Login(){
    const headers ={
        'Content-Type' : 'application/json'
    }
    
    //입력 받을 아이디, 비밀번호
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    
    //아이디 state값 변경
    const onIdHandler = (e) => {
        setUserId(e.target.value);
    }

    //비밀번호 state값 변경
    const onPwHandler = (e) => {
        setUserPw(e.target.value);
    }

    console.log(userId);
    console.log(userPw);


    //로그인 버튼 클릭 시
    const onLogin = (e) => {
        e.preventDefault();

        const requestBody = {
            userId,
            userPw
        };
        console.log(requestBody)

        const requestBodyJSON = JSON.stringify(requestBody);

        axios
        .post(`${BACKEND_URL}/api/v1/user/login`, requestBodyJSON, {headers})
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log("에러",error);
        })
    }

    return(
        <div>
            <h4>로그인페이지</h4>
            <p>아이디</p>
            <input type="text" value={userId} onChange={onIdHandler}></input>
            <p>비밀번호</p>
            <input type="password" value={userPw} onChange={onPwHandler}></input><br/>
            <button onClick={onLogin}>로그인</button>
            <Link to="/join">회원가입</Link>
        </div>
    )
}

export default Login;