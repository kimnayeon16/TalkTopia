import { useState } from "react";
import "../../css/JoinLogin.module.scss";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { reduxUserInfo } from "../../store.js";

function JoinLogin(){
    const headers ={
        'Content-Type' : 'application/json'
    }

    let navigate = useNavigate();

    //redux의 state
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

        console.log(user.userId)
        console.log(user.accessToken)
    }



    const [change, setChange] = useState(false);

    const handleToggleSignUp = () => {
        setChange((prevState) => !prevState);
      };


    return(
        <div className={`cont ${change ? 's--signup' : ''}`}>
            <div className="form sign-in">
                <h2>Welcome to TalkTopia</h2>
                <label>
                    <span>아이디</span>
                    <input type="text" value={userId} onChange={onIdHandler}/>
                </label><br/>
                <label>
                    <span>비밀번호</span>
                    <input type="password" value={userPw} onChange={onPwHandler}/>
                </label>


                <p className="forgot-pass">Forgot password?</p>


                <button type="button" className="submit" onClick={onLogin}>Sign In</button>
                <button type="button" className="fb-btn">Connect with <span>facebook</span></button>
            </div>
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h2>안녕하세요?</h2>
                        <p>이미 계정이 있다면 로그인하세요! 😊</p>
                    </div>
                    <div className="img__text m--in">
                        <h2>처음이신가요?</h2>
                        <p>가입하고 전세계의 새로운 친구들을 사겨보아요!</p>
                    </div>
                    <div className="img__btn" onClick={handleToggleSignUp}>
                        <span className={`m--up ${change ? 'active' : ''}`}>회원가입</span>
                        <span className={`m--in ${change ? '' : 'active'}`}>로그인</span>
                    </div>

                </div>
                <div className="form sign up">
                <h2>Time to feel like home,</h2>
                <label>
                    <span>Name</span>
                    <input type="text" />
                </label><br/>
                <label>
                    <span>Email</span>
                    <input type="email" />
                </label><br/>
                <label>
                    <span>Password</span>
                    <input type="password" />
                </label><br/>
                <button type="button" className="submit">Sign Up</button>
                <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                </div>
            </div>
        </div>
    )
}

export default JoinLogin;