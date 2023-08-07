import { useNavigate } from "react-router-dom";

import style from "./NoStart.module.css";

import { BACKEND_URL } from "../../utils";
import axios from "axios";


function Start(){
    let navigate = useNavigate();
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
            <button className={`${style.button}`} onClick={()=>{navigate('/translation')}}>번역 입장</button><br/>
            <button className={`${style.button}`} onClick={()=>{navigate('/stt')}}>음성 인식 입장</button><br/>
            <button className={`${style.button}`} onClick={()=>{navigate('/sample')}}>샘플stt</button><br/>
            <button className={`${style.button}`} onClick={randomeForeEndter}>화상채팅</button><br/>
            <button className={`${style.button}`} onClick={()=>{navigate('/realhome')}}>이게 진짜 메인페이지</button>
        </div>
    )
}

export default Start;