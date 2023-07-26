import { useNavigate } from "react-router-dom";

function Start(){
    let navigate = useNavigate();

    return(
        <div>
            <h4>시작페이지</h4>
      <button onClick={()=>{navigate('/login')}}>지금 바로 시작해보세요</button>
      <button onClick={()=>{navigate('/join2')}}>회원가입</button>
        </div>
    )
}

export default Start;