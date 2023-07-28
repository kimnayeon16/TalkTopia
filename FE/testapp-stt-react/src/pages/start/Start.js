import { useNavigate } from "react-router-dom";

function Start(){
    let navigate = useNavigate();

    return(
        <div>
            <h4>시작페이지</h4>
            <button onClick={()=>{navigate('/translation')}}>번역 입장</button>
            <button onClick={()=>{navigate('/webspeechapi')}}>stt 입장</button>
        </div>
    )
}

export default Start;