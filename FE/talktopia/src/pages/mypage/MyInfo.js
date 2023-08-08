import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useSelector } from "react-redux";
import style from "./Myinfo.module.css";
import { removeCookie } from '../../cookie';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MyInfo(){
    const user = useSelector((state) => state.userInfo);

    const navigate = useNavigate();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
    }

    const [userId1, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userImgUrl, setUserImgUrl] = useState("");
    const [userLan, setUserLan] = useState("");

    const [pwValid, setPwValid] = useState(false);

    const [modal, setModal] = useState(false);

    useEffect(()=>{
        const userInfoString = localStorage.getItem("UserInfo");
        const userInfo = JSON.parse(userInfoString);
        const userId = userInfo.userId;

        console.log(userId);

        axios.get(`${BACKEND_URL}/api/v1/myPage/${userId}`, {
            headers: headers
        })
        .then((response)=>{
            setUserId(response.data.userId);
            // setUserPw(response.data.userPw);
            setUserName(response.data.userName);
            setUserEmail(response.data.userEmail);
            setUserImgUrl("hi");
            setUserLan(response.data.userLan);
        })
         .catch((error)=>{
             console.log("못 불러와써유", error);
         })
    },[]);
    
    const onPwHandler = (e) => {
        const value = e.target.value;
        setUserPw(value);
        //정규식
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        //유효성 검사
        if(regex.test(value)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    const onNameHandler = (e) => {
        setUserName(e.target.value);
    }

    const onLanHandler = (e) => {
        setUserLan(e.target.value);
    }
    

    const updateMyInfo = () => {
        if(!pwValid){
            Swal.fire({
                icon: "warning",
                title: "비밀번호 입력 조건을 확인해주세요!",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
            })
        }else{
            axios.put(`${BACKEND_URL}/api/v1/myPage/modify`, {
                userId: userId1,
                userName: userName,
                userPw: userPw,
                userEmail: userEmail,
                userImgUrl: "sdfasdfdasf",
                userLan: userLan
              }, 
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.accessToken}`,
                },
              })
            .then((response) => {   
                Swal.fire({
                    icon: "success",
                    title: "수정이 완료되었습니다.",
                    confirmButtonText: "확인",
                    confirmButtonColor: '#90dbf4',
                }).then(
                    navigate('/home')
                )
            })
            .catch((error) =>{
                console.log("수정 실패", error);
            })
        }
        
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


        // // 예시로 주어진 사진 URL들
        // const imageUrls = [
        //     process.env.PUBLIC_URL + '/img/cute1.png',
        //     process.env.PUBLIC_URL + '/img/cute2.png',
        //     process.env.PUBLIC_URL + '/img/cute3.png',
        //     process.env.PUBLIC_URL + '/img/cute4.png',
        //     // ... 추가적인 이미지 URL들 ...
        // ];

        const commonImg = process.env.PUBLIC_URL + '/img/cute3.png';

        const [imgFile, setImgFile] = useState(commonImg);
        const imgRef = useRef();

        // 이미지 업로드 input의 onChange
        const saveImgFile = () => {
            const file = imgRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgFile(reader.result);
            };
        };


    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.title}`}>내 정보 보기</h2>

            <img style={{ width: '80px', height: '80px', borderRadius: '50%',
            overflow: 'hidden'}} src={imgFile ? imgFile : commonImg} alt="프로필 이미지"/>

            <form>
                <label className={`${style["signup-profileImg-label"]}`} htmlFor="profileImg">프로필 이미지 변경</label>
                <input className={`${style["signup-profileImg-input"]}`} type="file" accept="image/*" id="profileImg" onChange={saveImgFile} ref={imgRef}/>
            </form>


            <p className={`${style.p}`}>아이디</p>
            <input type="text" value={userId1} className={`${style["input-1"]}`} readOnly></input>
            <p className={`${style.p}`}>비밀번호</p>
            <p>변경을 원하는 비밀번호를 입력해주세요. <br/> 변경을 원치 않으시다면 기존의 비밀번호를 입력해주세요.</p>
            <input type="password" value={userPw} className={`${style.input}`} onChange={onPwHandler}></input>
            <div>영문, 숫자, 특수문자(!@#$%^*+=-) 조합으로 8~16자리 입력해주세요.</div>
            <p className={`${style.p}`}>이름</p>
            <input type="text" value={userName} className={`${style.input}`} onChange={onNameHandler}></input>
            <p className={`${style.p}`}>이메일</p>
            <input type="text" value={userEmail} className={`${style["input-1"]}`} readOnly></input>
            <p className={`${style.p}`}>사용 언어</p>
            <select value={userLan} onChange={onLanHandler}>
                <option value="" disabled>선택하세요</option>
                <option value="ko-KR">한국어</option>
                <option value="de-DE">독일어</option>
                <option value="ru-RU">러시아어</option>
                <option value="es-ES">스페인어</option>
                <option value="en-US">영어</option>
                <option value="it-IT">이탈리아어</option>
                <option value="id-ID">인도네시아어</option>
                <option value="ja-JP">일본어</option>
                <option value="fr-FR">프랑스어</option>
                <option value="pt-PT">포르투칼어</option>
                <option value="zh-CN">중국어 간체</option>
                <option valye="pt-TW">중국어 번체</option>
                <option value="hi-IN">힌디어</option>
            </select>
            <button className={`${style.button}`} onClick={updateMyInfo}>수정하기</button>
            <button className={`${style.button}`} onClick={leave}>탈퇴하기</button>
        </div>
    )
}

export default MyInfo;