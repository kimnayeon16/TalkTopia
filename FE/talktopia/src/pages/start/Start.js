import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Start(){
    let navigate = useNavigate();
    const[i,setI] = useState(0);

    const plush = () => {
        setI(i+1);
    }
    // console(i);

    return(
        <div>
            <h4>시작페이지</h4>
            <button onClick={()=>{navigate('/login')}}>지금 바로 시작해보세요</button>
            <button onClick={()=>{navigate('/translation')}}>번역 입장</button>
            <button onClick={()=>{navigate('/stt')}}>음성 인식 입장</button>
            <button onClick={plush}>1 증가</button>
            {i}
            <button onClick={()=>{navigate('/sample')}}>샘플stt</button>
            
        </div>
    )
}

export default Start;