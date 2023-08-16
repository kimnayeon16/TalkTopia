import style from './Error.module.css';
import { useNavigate } from 'react-router-dom';

function Error(){
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // 이전 페이지로 이동
    };

    return(
        <div className={`${style.background}`}>
            <h2 className={`${style.h2}`}>존재하지 않는 페이지입니다.</h2>
            <button className={`${style.button}`} onClick={goBack}>이전 화면</button>
        </div>
    )
}

export default Error;