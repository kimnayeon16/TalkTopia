import { useState } from "react";
import style from "./ChangePw.module.css";
import axios from "axios";
import { BACKEND_URL } from "../../../utils";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ChangePw(){

    const headers = {
        'Content-Type' : 'application/json',
    }

    const user = useSelector((state) => state.userInfo);

    const [fakePw, setFakePw] = useState("");
    const [changePw, setChangePw] = useState("");
    const [changePwConfirm, setChangePwConfirm] = useState("");

    const [pwValid, setPwValid] = useState(false);
    const [pwConfirmMsg, setPwConfirmMsg] = useState("");
    const [userPwCorrect, setUserPwCorrect] = useState(false);

    const onHandleFakePw = (e) => {
        setFakePw(e.target.value);
    }

    const requestBody = {
        userId: user.userId,
        userChangePw : changePw
    };
    const requestBodyJSON = JSON.stringify(requestBody);

    const PwChange = () => {
        if(pwValid && userPwCorrect){
            axios.put(`${BACKEND_URL}/api/v1/user/changePw`, requestBodyJSON, headers)
                .then((response)=>{
                   console.log("수정완료");
                })
                .catch((error)=>{
                    console.log("수정 실패", error);
                })
        }else{
            Swal.fire({
                icon: "warning",
                title: "입력을 다시 확인해주세요.",
                confirmButtonColor: '#90dbf4',
                confirmButtonText: "확인",
                timer: 2000,
                timerProgressBar: true,
            })
        }
    
    }

    

    //비밀번호
    const onHandleChangePw = (e) => {
        const value = e.target.value;
        setChangePw(value);
        //정규식
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        //유효성 검사
        if(regex.test(value)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    //비밀번호 확인
    const onHandleChangePwConfirm = (e) => {
        setChangePwConfirm(e.target.value);

        if(e.target.value === changePw){
            setPwConfirmMsg("비밀번호가 일치합니다.");
            setUserPwCorrect(true);
        }else{
            setPwConfirmMsg("비밀번호가 일치하지 않습니다.");
            setUserPwCorrect(false);
    }}


    console.log(fakePw)
    console.log(changePw)
    console.log(changePwConfirm)

    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.logo}`}>TalkTopia</h2>
            <h2 className={`${style.title}`}>비밀번호 변경</h2>
            <p className={`${style.p1}`}>회원님의 정보 보호를 위해 임시 비밀번호를 새로운 비밀번호로 설정해주세요.</p>
            <div>
                <p className={`${style.p}`}>임시 비밀번호</p>
                <input type="password" value={fakePw} className={`${style.input}`} onChange={onHandleFakePw}></input>
            </div>
            <div>
            <p className={`${style.p}`}>새로운 비밀번호</p>
                <input type="password" value={changePw} className={`${style.input}`} onChange={onHandleChangePw}></input>
                {
                    !pwValid && changePw.length >=0 &&
                    (<div className={`${style.guide}`}>영문, 숫자, 특수문자(!@#$%^*+=-) 조합으로 8~16자리 입력해주세요.</div>)
                }
            </div>
            <div>
                <p className={`${style.p}`}>새로운 비밀번호 확인</p>
                <input type="password" value={changePwConfirm} className={`${style.input}`} onChange={onHandleChangePwConfirm}></input>
                
                    <div className={`${style["guide-pass"]} ${userPwCorrect ? style["guide-pass-correct"] : ""}`}>{pwConfirmMsg}</div>
                
            </div>
            <button className={`${style.button}`} onClick={PwChange}>비밀번호 변경하기</button>
        </div>
    )
}

export default ChangePw;