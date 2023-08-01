import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { reduxUserInfo } from "../../store.js";
import axios from "axios";
import Cookies from "js-cookie";
import style from "../../css/JoinLogin.module.scss";

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
    const onLogin = (e) => {
        e.preventDefault();

        const requestBody = {
            userId,
            userPw
        };

        const requestBodyJSON = JSON.stringify(requestBody);

        axios
        .post(`${BACKEND_URL}/api/v1/user/login`, requestBodyJSON, {headers})
        .then((response)=>{
            console.log(response.data);
            dispatch(reduxUserInfo({
                userId: response.data.userId,
                accessToken: response.data.accessToken,
                expiredDate: response.data.expiredDate
            }));

            Cookies.set('refreshToken', response.data.refreshToken);

            alert('로그인 성공');
            navigate('/home');
     
        })
        .catch((error)=>{
            console.log("에러",error);
        })

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

    //모든 정보가 입력됐을 때 회원가입 완료
    const [userIdCorrect, setUserIdCorrect] = useState(false);
    const [userPwCorrect, setUserPwCorrect] = useState(false);
    const [userNameCorrect, setUserNameCorrect] = useState(false);
    // eslint-disable-next-line
    const [userEmailCorrect, setUserEmailCorrect] = useState(false);
    const [userLanCorrect, setUserLanCorrect] = useState(false);

    //아이디 유효성
    const onIdJoinHandler = (e) => {
        setUserIdJoin(e.target.value);
        //정규식
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;
        //유효성 검사
        if(regex.test(userIdJoin)){
            setIdValid(true);
        }else{
            setIdValid(false);
        }
    }

    //아이디 중복 확인
    const onCheckId = (e) => {
        e.preventDefault();
        //아이디가 빈 문자일 때
        if(userId === ""){
            alert('아이디를 입력해주세요.');
        }
       
        axios.get(`${BACKEND_URL}/api/v1/user/existId/${userId}`)
        .then((response)=>{
            alert(response.data.msg);
            setUserIdCorrect(true);
            console.log(response);
            console.log(response.data)
            console.log(response.data.msg);
        })
        .catch((error)=>{
            alert("중복 아이디입니다.");
            // console.log(error);
            // console.error("에러발생",error);
        })
    }

    //비밀번호
    const onPwJoinHandler = (e) => {
        setUserJoinPw(e.target.value);
        //정규식
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        //유효성 검사
        if(regex.test(userPwJoin)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    //비밀번호 확인
    const onConfirmPwHandler = (e) => {
        setUserPwConfirm(e.target.value);

        if(e.target.value === userPwJoin){
            setPwConfirmMsg("올바른 비밀번호입니다.");
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
            alert('빠짐없이 입력해주세요.');
        }
    }

    const checkEmailVerify = (e) => {
        e.preventDefault();

        console.log("입력 인증 번호 ", emailConfirm);
        console.log("서버 인증", emailConfirmServer);

        if(emailConfirm === emailConfirmServer){
            setEmailConfirmWindow(false);
            setEmailButton("이메일 인증");
            setUserEmailCorrect(true);
            
        }else{
            alert('인증 번호가 올바르지 않습니다.');
        }
    }

    const [isInputMode, setIsInputMode] = useState(false);

    // "직접입력" 모드를 토글하는 함수
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setIsInputMode(selectedValue === ""); // 선택된 값이 빈 문자열이면 "직접입력" 모드로 설정
        onEmailDomainHandler(e); // select 요소의 value 변경 핸들러 호출
      };

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
                     userId,
                     userName,
                     userPw,
                     userEmail,
                     // userLan,
                 };
     
                 console.log(requestBody);
     
                 const requestBodyJSON = JSON.stringify(requestBody);
     
                 const response = axios.post(`${BACKEND_URL}/api/v1/user/join`, requestBodyJSON, {headers});
                 alert("회원 가입 성공");
                 console.log(response.data);
             } catch(error){
                 console.error("에러 발생",error);
                 alert("회원가입 실패");
             }   
            }else{
             alert("빠짐 없이 입력해주세요 😃");
            }
     
         }



    ///////////////////////////////////////////////////////////////////////////////////
    //로그인, 회원가입 체인지
    const [change, setChange] = useState(false);

    const handleToggleSignUp = () => {
        setChange((prevState) => !prevState);
      };


      return (
        <div className={`${style.cont} ${change ? style["s--signup"] : ""}`}>
            <div className={`${style.form} ${style["sign-in"]}`}>
                <h2>TalkTopia에 오신걸 환영해요! 🌏</h2>
                <label>
                    {/* <span>아이디</span> */}
                    <input type="text" value={userId} onChange={onIdHandler} placeholder="아이디" />
                    {/* <input type="text" value={userId} onChange={onIdHandler} /> */}
                </label><br />
                <label>
                    {/* <span>비밀번호</span> */}
                    <input type="password" value={userPw} onChange={onPwHandler} placeholder="비밀번호"/>
                    {/* <input type="password" value={userPw} onChange={onPwHandler}/> */}
                </label>
                
                <button type="button" className={`${style.submit}`} onClick={onLogin}>로그인</button>
                <button></button>
                <div className={`${style.line}`}>SNS계정으로 로그인</div>
                <button type="button" className={`${style["ka-btn"]}`}><span>카카오톡</span>으로 로그인</button>
                <button type="button" className={`${style["go-btn"]}`}><span>구글</span><span className={`${style["span-red"]}`}>로</span> 로그인</button>
                <span className={style["forgot-pass"]}>아이디 찾기</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className={style["forgot-pass"]}>비밀번호 찾기</span>
            </div>
            <div className={style["sub-cont"]}>
                <div className={style.img}>
                    <div className={`${style["img__text"]} ${style["m--up"]}`}>
                        <h2>만나서 반가워요</h2>
                        <p>새로운 친구들과 함께할 준비가 되셨나요? 😊<br/> 지금 로그인하고 TalkTopia의 다양한 서비스를 즐겨보세요!</p>
                    </div>
                    <div className={`${style["img__text"]} ${style["m--in"]}`}>
                        <h2>처음이신가요?</h2>
                        <p>여러분의 새로운 시작을 환영합니다 💙 <br/> 가입하고 전세계의 새로운 친구들을 사겨보세요!</p>
                    </div>
                    <div className={style["img__btn"]} onClick={handleToggleSignUp}>
                        <span className={`${style["m--up"]} ${change ? style.active : ""}`}>회원가입 하러가기</span>
                        <span className={`${style["m--in"]} ${change ? "" : style.active}`}>로그인 하러가기</span>
                    </div>
                </div>
                <div className={`${style.form} ${style.sign} ${style.up}`}>
                    <h2 className={`${style["h2-Join"]}`}>새로운 모험이 시작됩니다! <br/> 함께 멋진 시간을 만들어가요! 🚀</h2>
                    <label>
                        <span>아이디</span>
                        <input type="text" value={userIdJoin} onChange={onIdJoinHandler}></input><button className={`${style.buttonId}`} onClick={onCheckId}>중복확인</button>
                        <div>
                            {
                                !idValid && userIdJoin.length >=0 && 
                                (<div className={`${style.guide}`}>영문 또는 영문, 숫자 조합으로 6~12자리 입력해주세요.</div>)
                            }
                        </div><br/>
                    </label><br />
                    <label>
                        <span>비밀번호</span>
                        <input type="password" value={userPwJoin} onChange={onPwJoinHandler} ></input><br/>
                        <div>
                            {
                                !pwValid && userPwJoin.length >=0 && 
                                (<div className={`${style.guide}`}>영문, 숫자, 특수기호 조합으로 8~16자리 입력해주세요.</div>)
                            }
                        </div><br/>
                    </label><br />
                    <label>
                        <span>비밀번호 확인</span>
                        <input type="password" value={userPwConfirm} onChange={onConfirmPwHandler}></input><br/>
                        <span className={`${style.guide}`}>{pwConfirmMsg}</span><br/><br/>
                    </label><br />
                    <label>
                        <span>이름</span>
                        <input type="text" value={userName} onChange={onNameHandler}></input>
                    </label><br />
                   
                    <label>
      <span>이메일</span>
      <input type="text" value={userEmailPrefix} onChange={onEmailPrefixHandler} className={`${style["email-input"]}`} />
      <span>@</span>

      {/* div 요소로 select와 input을 묶어주고, isInputMode 상태에 따라 보여줄지 숨길지 결정 */}
      <div style={{ display: isInputMode ? "block" : "none" }}>
        <input type="text" value={userEmailDomain} onChange={onEmailDomainHandler}></input>
        <span onClick={() => setIsInputMode(false)}>X</span>
      </div>
      <div style={{ display: isInputMode ? "none" : "block" }}>
        <select className={`${style.selectEmail}`} value={userEmailDomain} onChange={handleSelectChange}>
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
      </div>

      {emailConfirmWindow === true ? (
        <>
          <p>이메일로 전송된 인증코드를 입력해주세요</p>
          <input type="text" value={emailConfirm} onChange={onEmailVerify}></input>
          <button onClick={checkEmailVerify} className={`${style.buttonId}`}>인증 번호 확인</button>
          <p>입력 시간</p>
        </>
      ) : null}
    </label><br />
                    <label>
                        <span>사용 언어</span><br/>
                        <select className={`${style.selectLan}`} value={userLan} onChange={onLanHandler}>
                            <option vaule="">선택하세요</option>
                            <option value="한국어">한국어</option>
                            <option value="독일어">독일어</option>
                            <option value="러시아어">러시아어</option>
                            <option value="스페인어">스페인어</option>
                            <option value="영어">영어</option>
                            <option value="이탈리아어">이탈리아어</option>
                            <option value="인도네시아어">인도네시아어</option>
                            <option value="일본어">일본어</option>
                            <option value="프랑스어">프랑스어</option>
                            <option value="포르투칼어">포르투칼어</option>
                            <option value="중국어">중국어</option>
                            <option value="힌두어">힌두어</option>
                        </select>
                    </label><br />
                    <button type="button" className={`${style.submit}`} onClick={onSingUp}>회원가입</button>
                </div>
            </div>
        </div>
      );
      
}

export default JoinLogin;