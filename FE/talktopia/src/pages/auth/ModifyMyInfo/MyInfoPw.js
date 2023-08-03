import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../../../utils";

function MyInfoPw(){
    const user = useSelector((state) => state.userInfo);
    let dispatch = useDispatch();

    const headers ={
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user.accessToken}`,
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

        const requestBodyJSON = JSON.stringify(requestBody);

        axios.get(`${BACKEND_URL}/api/v1/user/MyPage/checkPw`, requestBodyJSON, headers)
            .then((response)=>{
                console.log("되나");
            })
            .catch((error)=>{
                console.log("안돼");
            })
    }

    return(
        <div>
            <h2>내 정보 보기</h2>
            <p>회원정보 수정을 위해 비밀번호를 확인해주세요. 이 과정은 회원님의 개인 정보 보호를 위해 필요합니다. <br/>
                안심하고 정보를 업데이트하실 수 있도록 최선을 다하겠습니다. <br/>
                비밀번호를 정확히 입력해 주시기 바랍니다. 감사합니다.
            </p>
            <span>비밀번호 확인</span>
            <input value={userPw} onChange={onUserPwHandle}></input>
            <button onClick={confirmPw}>확인</button>
        </div>
    )
}

export default MyInfoPw;