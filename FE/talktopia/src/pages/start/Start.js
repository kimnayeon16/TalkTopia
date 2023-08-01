import { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "../../css/Start.module.css";

import { BACKEND_URL } from "../../utils";
import axios from "axios";


function Start(){
    let navigate = useNavigate();
    const[i,setI] = useState(0);

    const plush = () => {
        setI(i+1);
    }   
    // console(i);

    // 화상 채팅 입장
    const randomeForeEndter = async () => {
        const headers = {
            'Content-Type' : 'application/json'
        }

        const requestBody = {
            userId: 'user1234',
            vr_max_cnt: 4
        };

        const requestBodyJSON = JSON.stringify(requestBody);
        await axios
        .post(`${BACKEND_URL}/api/v1/room/enter`, requestBodyJSON, {headers})
        .then((response) => {
            console.log(response.data.token)
            navigate('/joinroom', {
                state: {
                    myUserName: 'user1234',
                    token: response.data.token
                }
            });
        })
        .catch((error) => {
            console.log("에러 발생", error)
        })
    }



    return(
        <div>
            <h4>시작페이지</h4>
            <button className={`${style.button}`} onClick={()=>{navigate('/login')}}>지금 바로 시작해보세요</button>
            <button className={`${style.button}`} onClick={()=>{navigate('/translation')}}>번역 입장</button>
            <button className={`${style.button}`} onClick={()=>{navigate('/stt')}}>음성 인식 입장</button>
            <button className={`${style.button}`} onClick={plush}>1 증가</button>
            {i}
            <button className={`${style.button}`} onClick={()=>{navigate('/sample')}}>샘플stt</button>
            <button className={`${style.button}`} onClick={()=>{navigate('/regist')}}>로그인&회원가입</button>
            <button className={`${style.button}`} onClick={randomeForeEndter}>화상채팅</button>
        </div>
    )
}

export default Start;