import { useNavigate } from "react-router-dom";
import style from "./Leave.module.css";

function Leave(){
    let navigate = useNavigate();

    const confirm = ()=>{
        navigate('/');
    }

    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.logo}`}>TalkTopia</h2>
            <h2 className={`${style.title}`}>회원 탈퇴가 완료되었습니다.</h2>
            <p className={`${style.p}`}>TalkTopia를 이용해주시고 사랑해주셔서 감사했습니다.</p>
            <p className={`${style.p}`}>더욱 더 노력하고 발전하는 TalkTopia가 되겠습니다.</p>
            <button className={`${style.button}`} onClick={confirm}>확인</button>
        </div>
    )
}

export default Leave;