import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { reduxUserInfo } from "../../../store.js";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import style from "./JoinLogin.module.scss";

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
    const onLogin = async (e) => {
        console.log("???");
        // e.preventDefault();

        const requestBody = {
            userId,
            userPw
        };

        const requestBodyJSON = JSON.stringify(requestBody);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, requestBodyJSON, {headers});
            console.log(response.data);
            dispatch(reduxUserInfo({
              userId: response.data.userId,
              userName: response.data.userName,
              accessToken: response.data.accessToken,
              expiredDate: response.data.expiredDate,
              sttLang: response.data.sttLang,
              transLang: response.data.transLang,
            }));
        
            Cookies.set('refreshToken', response.data.refreshToken);
        
            await Swal.fire({
              icon: "success",
              title: "만나서 반가워요!",
              text: "오늘도 새로운 친구를 만나러 가볼까요?",
              confirmButtonText: "확인",
              confirmButtonColor: '#90dbf4',
            });
        
            navigate('/home');
          } catch (error) {
            await Swal.fire({
                icon: "warning",
                title: "아이디 또는 비밀번호가 <br/> 일치하지 않습니다.",
                text: "아이디, 비밀번호를 다시 확인해주세요.",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
              });
            console.log("에러", error);
          }

        console.log(user.userId)
        console.log(user.accessToken)
    }
    ///////////////////////////////////////////////////////////////////////////////////

    //회원가입
    const [userIdJoin, setUserIdJoin] = useState("");
    const [userPwJoin, setUserJoinPw] = useState(''); // pw 담을 state
    const [userPwConfirm, setUserPwConfirm] = useState(''); //확인 pw 담을 state
    const [userName, setUserName] = useState(''); //name 담을 state
    const [userEmailPrefix, setUserEmailPrefix] = useState(''); //email prefix 담을 state
    const [userEmailDomain, setUserEmailDomain] = useState('default'); //email domain 담을 state
    const [userEmail, setUserEmail] = useState(''); //email 형식 담을 state
    const [userLan, setUserLan] = useState(''); //lan 담을 state

    const [pwConfirmMsg, setPwConfirmMsg] = useState(''); //pw 일치 확인 메세지

    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);

    //이메일 인증 확인
    const [emailSelect, setEmailSelect] = useState(true);
    const [emailConfirmWindow, setEmailConfirmWindow] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailConfirmServer, setEmailConfirmServer] = useState("");
    const [emailButton, setEmailButton] = useState("이메일 인증");
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    //모든 정보가 입력됐을 때 회원가입 완료
    const [userIdCorrect, setUserIdCorrect] = useState(false);
    const [userPwCorrect, setUserPwCorrect] = useState(false);
    const [userNameCorrect, setUserNameCorrect] = useState(false);
    // eslint-disable-next-line
    const [userEmailCorrect, setUserEmailCorrect] = useState(false);
    const [userLanCorrect, setUserLanCorrect] = useState(false);

    //아이디 유효성
    const onIdJoinHandler = (e) => {
        const value = e.target.value;
        setUserIdJoin(value);
        //정규식
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;
        //유효성 검사
        if(regex.test(value)){
            setIdValid(true);
        }else{
            setIdValid(false);
        }
    }

    //아이디 중복 확인
    const onCheckId = (e) => {
        e.preventDefault();
        //아이디가 빈 문자일 때
        if(userIdJoin === ""){
            Swal.fire({
                icon: "warning",
                title: "아이디를 입력해주세요",
                // showCancelButton: true,
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
                // cancelButtonText: "취소",
            })
        }else if(userIdJoin.length !== 0 && idValid){
            axios.get(`${BACKEND_URL}/api/v1/user/existId/${userIdJoin}`)
            .then((response)=>{
                setUserIdCorrect(true);
                console.log(response);
                console.log(response.data)
                console.log(response.data.message);


                Swal.fire({
                    icon: "success",
                    title: "사용가능한 아이디입니다.",
                    text: `다음 회원가입 절차를 진행해주세요!`,
                    confirmButtonColor: '#90dbf4',
                    // confirmButtonText: "확인",
                })
            })
            .catch((error)=>{
                // console.error("에러발생",error);
                Swal.fire({
                    icon: "warning",
                    title: "이미 사용 중인 아이디입니다.",
                    text: `다른 아이디를 입력해주세요!`,
                    confirmButtonText: "확인",
                    confirmButtonColor: '#90dbf4',
                })
            })
        }else{
            Swal.fire({
                icon: "warning",
                title: "아이디 입력 조건을 확인해주세요!",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
            })
        }
    }

    //비밀번호
    const onPwJoinHandler = (e) => {
        const value = e.target.value;
        setUserJoinPw(value);
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
    const onConfirmPwHandler = (e) => {
        setUserPwConfirm(e.target.value);

        if(e.target.value === userPwJoin){
            setPwConfirmMsg("비밀번호가 일치합니다.");
            setUserPwCorrect(true);
        }else{
            setPwConfirmMsg("비밀번호가 일치하지 않습니다.");
            setUserPwCorrect(false);
    }}

    //이름
    const onNameHandler = (e) => {
        setUserName(e.target.value);
        if(e.target.value.length !== 0){
            setUserNameCorrect(true);
        }else{
            setUserNameCorrect(false);
        }
    }

    //Prefix 이메일
    const onEmailPrefixHandler = (e) => {
        setUserEmailPrefix(e.target.value);
        setUserEmail(`${e.target.value}@${userEmailDomain}`);
    }

    //Domain 이메일
    const onEmailDomainHandler = (e) => {
        setUserEmailDomain(e.target.value);

        const em = e.target.value;

        if(em === "gmail.com" || em === "hotmail.com" || em === "outlook.com" || em === "yahoo.com" || em === "icloud.com" ||
        em === "naver.com" || em === "daum.net" || em === "nate.com" || em === "hanmail.com"){
            // setEmailValid(true);
            setEmailSelect(true);
        }else{
            // setEmailValid(false);
            setEmailSelect(false);
        }

        setUserEmail(`${userEmailPrefix}@${e.target.value}`);
    }

    //이메일 인증코드 입력
    const onEmailVerify = (e) => {
        setEmailConfirm(e.target.value);
    }

    //이메일 인증 확인
    const checkEmail = async (e) => {
        e.preventDefault();

        console.log("여기 안 오니?")

        console.log(userEmailDomain);
        console.log(userEmailDomain.length);
        console.log(userEmailPrefix.length);
        
        if(userEmailDomain !== "default" && userEmailDomain.length !== 0 && userEmailPrefix.length !== 0){
            setEmailConfirmWindow(true);
            
            const requestBody = {
                userEmail
            };
            const requestBodyJSON = JSON.stringify(requestBody);
            console.log(requestBodyJSON);
    
            await axios
            .post(`${BACKEND_URL}/api/v1/user/checkEmail`, requestBodyJSON, {headers})
            .then((response) =>{
             console.log(response.data.code);
             setEmailConfirmServer(response.data.code);
            // 백으로부터 메세지가 올 것임
            console.log('성공');
            })
            .catch((error) => {
            console.log("에러 발생", error);
            })
        }else{
            Swal.fire({
                icon: "warning",
                title: "이메일을 빠짐없이 입력해주세요!",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
            })
        }
    }

    const checkEmailVerify = (e) => {
        e.preventDefault();

        console.log("입력 인증 번호 ", emailConfirm);
        console.log("서버 인증", emailConfirmServer);

        if(emailConfirm === emailConfirmServer){
            
            setEmailConfirmWindow(false);
            setEmailButton("인증 완료");
            setButtonDisabled(true);
            setUserEmailCorrect(true);
            Swal.fire({
                icon: "success",
                title: "이메일 인증에 성공했습니다.",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
                timer: 2000,
                timerProgressBar: true,
            })
            
        }else{
            console.log("여기 안올겨?");
            Swal.fire({
                icon: "warning",
                title: "인증 번호가 올바르지 않습니다.",
                text: "다시 확인해주세요.",
                confirmButtonText: "확인",
                confirmButtonColor: '#90dbf4',
                timer: 2000,
                timerProgressBar: true,
            })
        }
    }

    //언어
    const onLanHandler = (e) => {
        setUserLan(e.target.value);
        if(e.target.value.length !== 0){
            setUserLanCorrect(true);
        }
    }

    //가입하기
    const onSingUp = (e) => {
        e.preventDefault();

        console.log(userIdCorrect);
        console.log(userPwCorrect);
        console.log(userNameCorrect);
        console.log(userEmailCorrect);
        console.log(userLanCorrect);
     
        if(userIdCorrect && userPwCorrect && userNameCorrect && userEmailCorrect && userLanCorrect){
            try{
                const requestBody = {
                    userIdJoin,
                    userName,
                    userPwJoin,
                    userEmail,
                    userLan,
                };
     
                console.log(requestBody);
     
                const requestBodyJSON = JSON.stringify(requestBody);
     
                const response = axios.post(`${BACKEND_URL}/api/v1/user/join`, requestBodyJSON, {headers});
                //  alert("회원 가입 성공");
                 Swal.fire({
                    icon: "success",
                    title: "회원 가입 성공",
                    text: `TalkTopia의 친구가 되어주셔서 감사합니다 👨🏾‍🤝‍👨🏻`,
                    confirmButtonText: "확인",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: '#90dbf4',
                }).then((result) => {
                    setChange(false);
                })
                 console.log(response.data);
             } catch(error){
                 console.error("에러 발생",error);
                 alert("회원가입 실패");
             }   
            }else{
                Swal.fire({
                    icon: "warning",
                    title: "빠짐 없이 입력해주세요 😃",
                    confirmButtonText: "확인",
                    confirmButtonColor: '#90dbf4',
                })
            //  alert("빠짐 없이 입력해주세요 😃");
            }
     
         }



    ///////////////////////////////////////////////////////////////////////////////////
    //로그인, 회원가입 체인지
    const [change, setChange] = useState(false);

    const handleToggleSignUp = () => {
        setChange((prevState) => !prevState);
    };

    /////////////////////////////////////////////////////////////////////////////////
    const onCheckEnter = (e) => {
        // e.preventDefault();
        if(e.key === 'Enter') {
            console.log("들어오니")
            onLogin();
        }
      }

      return (
        <div className={`${style.background}`}>
        <div className={`${style.cont} ${change ? style["s--signup"] : ""}`}>
            <div className={`${style.form} ${style["sign-in"]}`} >
                <h2 className={`${style["h2-Font"]}`}>TalkTopia에 오신걸 환영해요! 🌏</h2>
                <div className={`${style.login}`}>
                    <span className={`${style["login-sub"]}`}>아이디</span>
                    <input type="text" value={userId} onChange={onIdHandler} onKeyPress={onCheckEnter}/>
                </div>
                <div className={`${style.login}`}>
                    <span className={`${style["login-sub"]}`}>비밀번호</span>
                    <input type="password" value={userPw} onChange={onPwHandler} onKeyPress={onCheckEnter}/>
                </div>
                
                <button type="button" className={`${style.submit}`} onClick={onLogin}>로그인</button>
                <button></button>
                <div className={`${style.line}`}>SNS계정으로 로그인</div>
                <button type="button" className={`${style["ka-btn"]}`}><span>카카오톡</span>으로 로그인</button>
                <button type="button" className={`${style["go-btn"]}`}><span>구글</span><span className={`${style["span-red"]}`}>로</span> 로그인</button>
                <span className={style["forgot-pass"]} onClick={()=>{navigate('/findId')}}>아이디 찾기</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className={style["forgot-pass"]} onClick={()=>{navigate('/findPassword')}}>비밀번호 찾기</span>
            </div>
            <div className={style["sub-cont"]}>
                <div className={style.img}>
                    <div className={`${style["img__text"]} ${style["m--up"]}`}>
                        <h2 className={`${style["h2-Font"]}`}>만나서 반가워요</h2>
                        <p>새로운 친구들과 함께할 준비가 되셨나요? 😊<br/> 지금 로그인하고 TalkTopia의 다양한 서비스를 즐겨보세요!</p>
                    </div>
                    <div className={`${style["img__text"]} ${style["m--in"]}`}>
                        <h2 className={`${style["h2-Font"]}`}>처음이신가요?</h2>
                        <p>여러분의 새로운 시작을 환영합니다 💙 <br/> 가입하고 전세계의 새로운 친구들을 사겨보세요!</p>
                    </div>
                    <div className={style["img__btn"]} onClick={handleToggleSignUp}>
                        <span className={`${style["m--up"]} ${change ? style.active : ""}`}>회원가입 하러가기</span>
                        <span className={`${style["m--in"]} ${change ? "" : style.active}`}>로그인 하러가기</span>
                    </div>
                </div>

                <div className={`${style.form} ${style.sign} ${style.up}`}>
                    <h2 className={`${style["h2-Join"]}`}>새로운 모험이 시작됩니다! <br/> 함께 멋진 시간을 만들어가요! 🚀</h2>
                    <div className={style["div-join-container-isButton"]}>
                        <div className={style["div-join"]}>
                            <span className={`${style["span-join"]}`}>아이디 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="text" value={userIdJoin} onChange={onIdJoinHandler} className={style["div-input"]}></input>
                            <button className={`${style.buttonId}`} onClick={onCheckId}>중복 확인</button>
                        </div>
                    </div>
                    <div>
                        {
                            !idValid && userIdJoin.length >=0 && 
                            (<><br/><div className={`${style.guide}`}>영문, 숫자 조합으로 6~12자리 입력해주세요.</div></>)
                        }
                    </div>
                    <div className={style["div-join-container"]}>
                        <div className={style["div-join"]}>
                            <span className={`${style["span-join"]}`}>비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="password" value={userPwJoin} onChange={onPwJoinHandler} className={style["div-input"]}></input>
                        </div>
                    </div>
                    <div>
                        {
                            !pwValid && userPwJoin.length >=0 &&
                            (<><br/><div className={`${style.guide}`}>영문, 숫자, 특수기호 조합으로 8~16자리 입력해주세요.</div></>)
                        }
                    </div>
                    <div className={style["div-join-container"]}>
                        <div className={style["div-join"]}>
                            <span className={`${style["span-join"]}`}>비밀번호 확인</span>
                            <input type="password" value={userPwConfirm} onChange={onConfirmPwHandler} className={style["div-input"]}></input>
                        </div>
                    </div>
                    <div>
                        <br/><div className={`${style["guide-pass"]} ${userPwCorrect ? style["guide-pass-correct"] : ""}`}>{pwConfirmMsg}</div>
                    </div>
                    <div className={style["div-join-container"]}>
                        <div className={style["div-join"]}>
                            <span className={`${style["span-join"]}`}>이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="text" value={userName} onChange={onNameHandler} className={style["div-input"]}></input>
                        </div>
                    </div>


                    <div className={style["div-join-container-isButton"]}>
                        <div className={style["div-join"]}>
                            <span className={`${style["span-join"]}`}>이메일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="text" value={userEmailPrefix} onChange={onEmailPrefixHandler} className={`${style["div-input-email"]} ${style["email-input"]}`}></input>
                            <span>@</span>
                            {
                            emailSelect === true ? 
                            <>
                            <select className={`${style.selectEmail} ${style["div-input-email"]}`} value={userEmailDomain} onChange={onEmailDomainHandler}>
                                <option value="default" disabled>선택하세요</option>
                                <option value="">직접입력</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="hotmail.com">hotmail.com</option>
                                <option value="outlook.com">outlook.com</option>
                                <option value="yahoo.com">yahoo.com</option>
                                <option value="icloud.com">icloud.com</option>
                                <option value="naver.com">naver.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="nate.com">nate.com</option>
                                <option value="hanmail.com">hanmail.com</option>
                            </select>
                            <button onClick={checkEmail} className={`${style.buttonId}`} disabled={isButtonDisabled}>{emailButton}</button><br/>
                            
                            </>
                            :
                            <>
                                <input type="text" value={userEmailDomain} onChange={onEmailDomainHandler} className={`${style["div-input-email"]}`}></input>
                                <p className={`${style["out-email"]}`} onClick={()=> {setEmailSelect(true); setUserEmailDomain("default")}}>✖</p>
                                <button onClick={checkEmail} className={`${style.buttonId}`}>{emailButton}</button><br/>
                                
                                {/* <p className={`${style.buttonId} ${style["buttonId-1"]}`}>인증 완료</p> */}
                            </>
                            
                        }
                        </div>
                    </div>
                        {
                            emailConfirmWindow === true ?
                            <>
                                <div className={style["div-join-container"]}>
                                    <div className={style["div-join"]}>
                                        <div className={`${style["guide-email"]}`}>이메일로 전송된 인증코드를 입력해주세요</div>
                                    </div>
                                </div>
                                <div className={style["div-join-container-isButton-1"]}>
                                    <div className={style["div-join"]}>
                                        <input type="text" value={emailConfirm} onChange={onEmailVerify} className={style["div-input-email"]}></input>
                                        <button onClick={checkEmailVerify} className={`${style.buttonId}`}>인증 번호 확인</button>
                                    </div>
                                </div>
                                {/* <p>입력 시간</p> */}
                            </>
                            : 
                            null
                        }

                    <div className={style["div-join-container"]}>
                        <div className={style["div-join"]}>
                            <span className={`${style["span-join"]}`}>사용 언어&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <select className={`${style.selectLan} ${style["div-input"]}`} value={userLan} onChange={onLanHandler}>
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
                            <option value="pt-PT">중국어</option>
                            <option valye="pt-TW">대만어</option>
                            <option value="hi-IN">힌두어</option>
                        </select>
                        </div>
                    </div>
                    <button className={`${style["submit-1"]}`} onClick={onSingUp}>회원가입</button>
                </div>
            </div>
        </div>
        </div>
      );
      
}

export default JoinLogin;