import { useEffect, useState } from 'react';
import style from './SocialLogin.module.css';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { reduxUserInfo } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';

function SocialLogin(){
    const user = useSelector((state) => state.userInfo);

    const navigate = useNavigate();
    let dispatch = useDispatch();

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
    }
    
    const [userLan, setUserLan] = useState("");
    const [userLanCorrect, setUserLanCorrect] = useState(false);

    useEffect(() => {
        // 로컬 스토리지에서 저장된 사용자 정보 불러오기
        const storedUserInfo = localStorage.getItem('UserInfo');
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          // Redux 상태를 업데이트하는 액션 디스패치
          dispatch(reduxUserInfo(userInfo));
        }
    }, [dispatch]);

    const onLanHandler = (e) => {
        setUserLan(e.target.value);
        if(e.target.value.length !== 0){
            setUserLanCorrect(true);
        }
    }

    const regist = (e) => {
        if(!userLanCorrect){
            Swal.fire({
                icon: "warning",
                title: "사용 언어를 선택해주세요!",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
                timer: 2000,
                timerProgressBar: true,
              });
        }else{
            const requestBody = {
                userId: user.userId,
                userLan: userLan
            }
            const requestBodyJSON = JSON.stringify(requestBody);

            console.log(requestBodyJSON);

            axios
            .put(`${BACKEND_URL}/api/v1/social/putLang`, requestBodyJSON, {headers})
            .then((response) => {
                console.log(response);
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "회원가입 성공!",
                    text: "TalkTopia의 친구가 되어주셔서 감사합니다 👨🏾‍🤝‍👨🏻",
                    confirmButtonText: "확인",
                    confirmButtonColor: '#90dbf4',
                    timer: 2000,
                    timerProgressBar: true,
                  });
                  dispatch(reduxUserInfo({ ...user, sttLang: userLan, transLang: response.data}));
                  const userInfoJSON = localStorage.getItem("UserInfo");

                  if (userInfoJSON) {
                    // JSON 문자열을 객체로 변환
                    const userInfo = JSON.parse(userInfoJSON);
                  
                    // sttLang 값을 변경하고 싶은 userLan 값으로 업데이트
                    const newUserInfo = {
                      ...userInfo,
                      sttLang: userLan,
                      transLang: response.data
                    };
                    localStorage.setItem("UserInfo", JSON.stringify(newUserInfo));
                  navigate('/home');
                }
            })
        }
    }

    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.logo}`}>TalkTopia</h2>
            <h2 className={`${style.title}`}>추가 정보 입력</h2>
            <p className={`${style.p}`}>환영합니다! 소셜 로그인으로 가입해주셔서 감사합니다. </p>
            <p className={`${style.p}`}>TalkTopia의 모든 기능을 이용하시려면 간단한 정보를 추가로 입력해주세요.</p>
            <p className={`${style.p}`}>이 정보는 맞춤형 서비스를 제공하는 데에 도움이 됩니다.</p>

            <div className={style["div-join-container"]}>
                <div className={style["div-join"]}>
                    <span className={`${style["span-join"]}`}>사용 언어&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <select className={`${style.selectLan} ${style.input}`} value={userLan} onChange={onLanHandler}>
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
                </div>
            </div>
            <button className={`${style.button}`} onClick={regist}>회원가입 완료</button>

        </div>
    )
}

export default SocialLogin;