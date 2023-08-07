import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../utils";
import style from "./Myinfo.module.css";
import { removeCookie } from '../../cookie';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function MyInfoPw(){
    const user = useSelector((state) => state.userInfo);
    // let dispatch = useDispatch();

    let navigate = useNavigate();

    const headers ={
        'Content-Type' : 'application/json',
        'Authoziation' : `Bearer ${user.accessToken}`,
    }


    const [userPw,setUserPw] = useState("");

    const onUserPwHandle = (e) => {
        setUserPw(e.target.value);
    }

    const confirmPw = () => {
        const requestBody = {
            userId : user.userId,
            userPw : userPw,
        };

        console.log(requestBody);
        
        const requestBodyJSON = JSON.stringify(requestBody);
        console.log(requestBodyJSON);


        axios.post(`${BACKEND_URL}/api/v1/myPage/checkPw`, requestBodyJSON, headers)
            .then((response)=>{
                console.log("되나");
            })
            .catch((error)=>{
                console.log("안돼", error);
            })
    }


    const leave = () => {

        Swal.fire({
            icon: "warning",
            title: "정말 탈퇴하시겠어요?",
            text: "탈퇴 버튼 클릭 시 계정은 삭제되며 복구되지 않습니다.",
            showCancelButton: true,
            confirmButtonText: "탈퇴하기",
            cancelButtonText: "취소",
            confirmButtonColor: '#90dbf4',
            cancelButtonColor: '#ee5561',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BACKEND_URL}/api/v1/myPage/leave/${user.userId}`, {
                    params: {
                        name: user.userId
                    },
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${user.accessToken}`
                    }
                  }).then((response)=>{
                    console.log(response);
                    removeCookie('refreshToken');
                    localStorage.removeItem("UserInfo");
                    
                    console.log("탈퇴");
                    navigate('/bye');
                 })
                 .catch((error)=>{
                     console.log("탈퇴 실패", error);
                 })
            }
        })

        
        
 }

    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.logo}`}>TalkTopia</h2>
            <h2 className={`${style.title}`}>내 정보 보기</h2>
            <p className={`${style.p}`}>회원 정보 수정을 위해 비밀번호를 확인해주세요.</p>
            <p className={`${style.p}`}>이 과정은 회원님의 개인 정보 보호를 위해 필요합니다. </p>
            <p className={`${style.p}`}>안심하고 정보를 업데이트하실 수 있도록 최선을 다하겠습니다.</p>
            <input className={`${style.input}`} type="password" value={userPw} onChange={onUserPwHandle} placeholder="비밀번호 확인"></input>
            <button className={`${style.button}`} onClick={confirmPw}>확인</button>
            <button  className={`${style.button}`} onClick={leave}>탈퇴</button>
        </div>
    )
}

export default MyInfoPw;