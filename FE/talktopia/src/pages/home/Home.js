import { useSelector } from "react-redux";
import IsTokenValid from "../../utils/tokenUtils";
import NewToken from "../../utils/newToken";
import "../../App.css";

function Home(){
    const user = useSelector((state) => state.userInfo);
    
    
    //요청 보낼 때.
    if(IsTokenValid()){
        //원래 보내려고 했던 요청 보내기
        
    }else{
        //토큰 재발급
        NewToken()
        //원래 보내려고 했던 요청 보내기
    }
    

    return(
        <div>
            <h4>메인페이지</h4>
            <p>{user.userId}</p>
            <p>{user.accessToken}</p>
            <p>{user.expiredDate}</p>


        </div>
    )
}

export default Home;