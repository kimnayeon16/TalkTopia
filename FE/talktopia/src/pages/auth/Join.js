// eslint-disable-next-line
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";

function Join(){
    const headers ={
        'Content-Type' : 'application/json'
    }

    const [userId, setUserId] = useState(''); //id 담을 state
    const [userPw, setUserPw] = useState(''); // pw 담을 state
    const [userPwConfirm, setUserPwConfirm] = useState(''); //확인 pw 담을 state
    const [userName, setUserName] = useState(''); //name 담을 state
    const [userEmailPrefix, setUserEmailPrefix] = useState(''); //email prefix 담을 state
    const [userEmailDomain, setUserEmailDomain] = useState('default'); //email domain 담을 state
    const [userEmail, setUserEmail] = useState(''); //email 형식 담을 state
    const [userLan, setUserLan] = useState(''); //lan 담을 state

 
    const [pwConfirmMsg, setPwConfirmMsg] = useState(''); //pw 일치 확인 메세지

    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    // const [emailValid, setEmailValid] = useState(false);

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

    //아이디
    const onIdHandler = (e) => {
        setUserId(e.target.value);
        //정규식
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;
        //유효성 검사
        if(regex.test(userId)){
            setIdValid(true);
        }else{
            setIdValid(false);
        }
    }

    //비밀번호
    const onPwHandler = (e) => {
        setUserPw(e.target.value);
        //정규식
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        //유효성 검사
        if(regex.test(userPw)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    //비밀번호 확인
    const onConfirmPwHandler = (e) => {
        setUserPwConfirm(e.target.value);

        if(e.target.value === userPw){
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

    //언어
    const onLanHandler = (e) => {
        setUserLan(e.target.value);
        if(e.target.value.length !== 0){
            setUserLanCorrect(true);
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

    return(
        <div>
            <h4>회원가입 페이지</h4>
            <form>
                <p>아이디</p>
                <input type="text" value={userId} onChange={onIdHandler}></input><button onClick={onCheckId}>중복확인</button>
                <div>
                    {
                        !idValid && userId.length >=0 && 
                        (<div>영문 또는 영문, 숫자 조합으로 6~12자리 입력해주세요.</div>)
                    }
                </div><br/>

                <p>비밀번호</p>
                <input type="password" value={userPw} onChange={onPwHandler}></input>
                <div>
                    {
                        !pwValid && userPw.length >=0 && 
                        (<div>영문, 숫자, 특수기호 조합으로 8~16자리 입력해주세요.</div>)
                    }
                </div><br/>
                <p>비밀번호 확인</p>
                <input type="password" value={userPwConfirm} onChange={onConfirmPwHandler}></input><br/>
                    {/* {!pwConfirmValid && (<div>비밀번호가 일치하지 않습니다.</div>)}
                    {pwConfirmValid && (<div>올바른 비밀번호입니다.</div>)}<br/> */}
                    {pwConfirmMsg}<br/><br/>
                
                <p>이름</p>
                <input type="text" value={userName} onChange={onNameHandler}></input>
            
                <p>이메일</p>
                <input type="text" value={userEmailPrefix} onChange={onEmailPrefixHandler}></input>
                @
                {/* <input type="text" value={userEmailDomain} onChange={onEmailDomainHandler} readOnly={emailValid}></input> */}
                {
                    emailSelect === true ? 
                    <>
                    <select value={userEmailDomain} onChange={onEmailDomainHandler}>
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
                    </select><br/>
                    <button onClick={checkEmail}>{emailButton}</button><br/>
                    </>
                    :
                    <>
                        <input type="text" value={userEmailDomain} onChange={onEmailDomainHandler}></input>
                        <p onClick={()=> {setEmailSelect(true); setUserEmailDomain("default")}}>X</p>
                    </>
                    
                }                
                
                
                {
                    emailConfirmWindow === true ? 
                    <>
                        <p>이메일로 전송된 인증코드를 입력해주세요</p>
                        {/* <input type="text"  onChange={onEmailVerify}></input> */}
                        <input type="text" value={emailConfirm} onChange={onEmailVerify}></input>
                            <button onClick={checkEmailVerify}>인증 번호 확인</button>
                            <p>입력 시간</p>
                        </>
                    : 
                    null
                }

                <p>사용 언어</p>
                <select value={userLan} onChange={onLanHandler}>
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
            </form>
            {/* 가입할 때 모든 정보가 true가 될 때만 가입할 수 있어야 함 */}
            <button onClick={onSingUp}>가입하기</button>
        </div>
    )
}

export default Join;