import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../utils";
import style from "./Myinfo.module.css";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function MyInfoPw(){
    const user = useSelector((state) => state.userInfo);
    // let dispatch = useDispatch();

    let navigate = useNavigate();

    // const headers = {
    //     'Content-Type' : 'application/json',
    //     'Authorization' : `Bearer ${user.accessToken}`,
    // }


    const [userPw,setUserPw] = useState("");

    const onUserPwHandle = (e) => {
        setUserPw(e.target.value);
    }

    localStorage.getItem("userData")

    const confirmPw = () => {
        console.log(user.userId);
        console.log(userPw);
        console.log(user.accessToken);


        axios.post(`${BACKEND_URL}/api/v1/myPage/checkPw`, {
            userId: user.userId,
            userPw: userPw,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.accessToken}`,
            },
          })
          .then((response) => {
            if(response.data.message === "비밀번호가 틀렸습니다. 다시 입력해주세요."){
              Swal.fire({
                icon: "warning",
                title: "비밀번호가 일치하지 않습니다.",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
                timer: 2000,
                timerProgressBar: true,
            })
            }else{
              navigate('/myinfo');
            }
            console.log("요청 성공", response);
          })
          .catch((error) => {
            console.log("요청 실패", error);
          });
    }

    const onCheckEnter = (e) => {
      if(e.key === 'Enter') {
        confirmPw();
      }
    }

    return(
        <div className={`${style.background1}`}>
            <h2 className={`${style.logo}`}>TalkTopia</h2>
            <h2 className={`${style.title}`}>내 정보 보기</h2>
            <p className={`${style.p}`}>회원 정보 수정을 위해 비밀번호를 확인해주세요.</p>
            <p className={`${style.p}`}>이 과정은 회원님의 개인 정보 보호를 위해 필요합니다. </p>
            <p className={`${style.p}`}>안심하고 정보를 업데이트하실 수 있도록 최선을 다하겠습니다.</p>
            <input className={`${style.input22}`} type="password" value={userPw} onChange={onUserPwHandle} placeholder="비밀번호 확인" onKeyPress={onCheckEnter}></input>
            <button className={`${style.button2}`} onClick={confirmPw}>확인</button>
            <img className={`${style.turtle}`} src="/img/fish/turtle.png" alt=""></img>
            <img className={`${style.grass2}`} src="/img/grass/grass2.png" alt=""></img>
            <img className={`${style.grass5}`} src="/img/grass/grass5.png" alt=""></img>
            <img className={`${style.fish4}`} src="/img/fish/fish4.png" alt=""></img>
            <img className={`${style.fish33}`} src="/img/fish/fish33.png" alt=""></img>
            <img className={`${style.fish34}`} src="/img/fish/fish34.png" alt=""></img>
            <img className={`${style.friend14}`} src="/img/fish/friend14.png" alt=""></img>
            <img className={`${style.bubble1}`} src="/img/bubble/bubble1.png" alt=""></img>
            <img className={`${style.bubble2}`} src="/img/bubble/bubble2.png" alt=""></img>
            <img className={`${style.bubble3}`} src="/img/bubble/bubble3.png" alt=""></img>
            <img className={`${style.bubble1}`} src="/img/bubble/bubble1.png" alt=""></img>
            <img className={`${style.bubble2}`} src="/img/bubble/bubble2.png" alt=""></img>
            <img className={`${style.bubble3}`} src="/img/bubble/bubble3.png" alt=""></img>
        </div>
    )
}

export default MyInfoPw;