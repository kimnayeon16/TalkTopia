import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import style from "./Myinfo.module.css";
import { removeCookie } from '../../cookie';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { reduxUserInfo } from "../../store";

function MyInfo(){
    const user = useSelector((state) => state.userInfo);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
    }

    const [userId1, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userPwConfirm, setUserPwConfirm] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userImgUrl, setUserImgUrl] = useState("");
    const [userLan, setUserLan] = useState("");

    const [pwValid, setPwValid] = useState(false);

    const [pwConfirmMsg, setPwConfirmMsg] = useState('');
    const [userPwCorrect, setUserPwCorrect] = useState(false);

    const [userId, setUserIdd] = useState('');
    const [userAccessToken, setUserAccessToken] = useState('');

    useEffect(()=>{
        const userInfoString = localStorage.getItem("UserInfo");
        const userInfo = JSON.parse(userInfoString);
        setUserIdd(userInfo.userId);
        setUserAccessToken(userInfo.userAccessToken);

        axios.get(`${BACKEND_URL}/api/v1/myPage/${userId}`, {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.accessToken}`
            }
        })
        .then((response)=>{
            console.log(response.data);
            console.log("초기 url", response.data.userProfileImgUrl);
            setUserId(response.data.userId);
            // setUserPw(response.data.userPw);
            setUserName(response.data.userName);
            setUserEmail(response.data.userEmail);
            setUserImgUrl(response.data.userProfileImgUrl);
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

    const onPwConfirmHandler = (e) => {
        setUserPwConfirm(e.target.value);

        if(e.target.value === userPw){
            setPwConfirmMsg("비밀번호가 일치합니다.");
            setUserPwCorrect(true);
        }else{
            setPwConfirmMsg("비밀번호가 일치하지 않습니다.");
            setUserPwCorrect(false);
    }}

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
                title: "비밀번호 입력 조건을 확인해주세요.",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
            })
        }else if(!userPwCorrect){
            Swal.fire({
                icon: "warning",
                title: "비밀번호가 일치하지 않아요.",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
            })
        }else if(userName.length === 0 || /\s/.test(userName)){
            Swal.fire({
                icon: "warning",
                title: "이름을 입력해주세요.",
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
                  'Authorization': `Bearer ${userAccessToken}`,
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
                axios.delete(`${BACKEND_URL}/api/v1/myPage/leave/${userId}`, {
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


    const [file, setFile] = useState(null);

    const onChangeFiles = (event) => {
        setFile(event.target.files[0]);
        const imageUrl = URL.createObjectURL(event.target.files[0]); // 업로드된 이미지의 URL 생성
        setUserImgUrl(imageUrl);
        console.log(event.target.files[0]);
    };

    const upload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile', file);
        console.log(formData);

        try{
            const response = await axios.put(`${BACKEND_URL}/api/v1/myPage/profile/${userId}`, formData, {
                headers : {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userAccessToken}`
                },
            });
            setUserImgUrl(response.data.imageUrl);
            console.log("응답 url" , response.data.imageUrl);
            const updatedUserInfo = { ...user, imageUrl: response.data.imageUrl };
            dispatch(reduxUserInfo(updatedUserInfo));

            //로컬에 저장
            const localStorageUserInfo = JSON.parse(localStorage.getItem("UserInfo"));
            localStorageUserInfo.profileUrl = response.data.imageUrl;
            localStorage.setItem("UserInfo", JSON.stringify(localStorageUserInfo));

            Swal.fire({
                icon: "success",
                title: "프로필이 수정되었습니다.",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
            })

        }catch(error){
            console.log("에러", error);
        }
    }


    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.title}`}>내 정보 수정</h2>

            <img style={{ width: '80px', height: '80px', borderRadius: '50%',
            overflow: 'hidden'}} src={userImgUrl} alt="프로필 이미지"/>

            <form>
                <label for="file">
                    <div className={`${style["btn-upload"]}`}>파일 업로드하기</div>
                </label>
                <input className={`${style["signup-profileImg-label1"]}`} type="file" name="file" id="file"accept="image/*" onChange={onChangeFiles}/>
                <button className={`${style["signup-profileImg-label"]}`} onClick={upload}>등록</button>
            </form>
            <div className={`${style.together}`}>
                <div className={`${style.together1}`}>
                    <p className={`${style.p}`}>아이디&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <input type="text" value={userId1} className={`${style["input-1"]}`} readOnly></input>
                </div>
            </div>
            <div className={`${style.together}`}>
                <div className={`${style.together1}`}>
                    <p className={`${style.p}`}>비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    {/* <p className={`${style.guide}`}>변경을 원하는 비밀번호를 입력해주세요. <br/> 변경을 원치 않으시다면 기존의 비밀번호를 입력해주세요.</p> */}
                    <input type="password" value={userPw} className={`${style.input}`} onChange={onPwHandler}></input>
                </div>
            </div>
            <div className={`${style.guide}`}>영문, 숫자, 특수문자(!@#$%^*+=-) 조합으로 8~16자리 입력해주세요.</div>
            <div className={`${style.together}`}>
                <div className={`${style.together1}`}>
                    <p className={`${style.p}`}>비밀번호 확인&nbsp;</p>
                    <input type="password" value={userPwConfirm} className={`${style.input}`} onChange={onPwConfirmHandler}></input>
                </div>
            </div>
            <div>
                <div className={`${style["guide-pass"]} ${userPwCorrect ? style["guide-pass-correct"] : ""}`}>{pwConfirmMsg}</div>
            </div>
            <div className={`${style.together}`}>
                <div className={`${style.together1}`}>
                    <p className={`${style.p}`}>이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <input type="text" value={userName} className={`${style.input}`} onChange={onNameHandler}></input>
                </div>
            </div>
            <div className={`${style.guide}`}>띄어쓰기 불가능</div>
            <div className={`${style.together}`}>
                <div className={`${style.together1}`}>
                    <p className={`${style.p}`}>이메일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <input type="text" value={userEmail} className={`${style["input-1"]}`} readOnly></input>
                </div>
            </div>
            <div className={`${style.together2}`}>
                <div className={`${style.together1}`}>
                <button className={`${style.button1}`} onClick={leave}>탈퇴하기</button>
                    <p className={`${style.p}`}>사용 언어&nbsp;&nbsp;&nbsp;</p>
                    <select className={`${style.select}`} value={userLan} onChange={onLanHandler}>
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
                </div>
            </div>
            <img className={`${style.turtle1}`} src="/img/fish/turtle.png" alt=""></img>
            <img className={`${style.grass21}`} src="/img/grass/grass2.png" alt=""></img>
            <img className={`${style.grass51}`} src="/img/grass/grass5.png" alt=""></img>
            <img className={`${style.fish41}`} src="/img/fish/fish4.png" alt=""></img>
            <img className={`${style.fish331}`} src="/img/fish/fish33.png" alt=""></img>
            <img className={`${style.fish341}`} src="/img/fish/fish34.png" alt=""></img>
            <img className={`${style.friend141}`} src="/img/fish/friend14.png" alt=""></img>
            <img className={`${style.bubble11}`} src="/img/bubble/bubble1.png" alt=""></img>
            <img className={`${style.bubble21}`} src="/img/bubble/bubble2.png" alt=""></img>
        </div>
    )
}

export default MyInfo;