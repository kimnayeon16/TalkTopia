import {useState} from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { reduxUserInfo } from "../../store.js";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

function Login(){
    const headers ={
        'Content-Type' : 'application/json'
    }
 
    let navigate = useNavigate();

    const user = useSelector((state) => state.userInfo);
    let dispatch = useDispatch();
    
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


    //로그인 버튼 클릭 시
    const onLogin = (e) => {
        e.preventDefault();

        const requestBody = {
            userId,
            userPw
        };

        const requestBodyJSON = JSON.stringify(requestBody);

        axios
        .post(`${BACKEND_URL}/api/v1/user/login`, requestBodyJSON, {headers})
        .then((response)=>{
            console.log(response.data);
            dispatch(reduxUserInfo({
                userId: response.data.userId,
                accessToken: response.data.accessToken,
                expiredDate: response.data.expiredDate
            }));

            Cookies.set('refreshToken', response.data.refreshToken);

            // console.log(user);
            alert('로그인 성공');
            navigate('/home');
     
        })
        .catch((error)=>{
            console.log("에러",error);
        })

        console.log(user.userId);
        console.log(user.accessToken);
    }
    // useEffect(() => {
    //     // user 값이 변경될 때마다 호출됨
    //     console.log(user);
    //   }, [user]);
    

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