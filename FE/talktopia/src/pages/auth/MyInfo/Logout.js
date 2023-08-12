import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    return(
        <div>
            <p>로그아웃 페이지지롱</p>
            <p>펭귄 나오는거 시간 남으면? 시간 안 남으면 로그아웃 페이지 없음.</p>
            <button onClick={()=>{navigate('/')}}>TalkTopia 홈으로 가기</button>
        </div>
    )
}
export default Logout;