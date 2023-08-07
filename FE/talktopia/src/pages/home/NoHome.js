import { useSelector } from "react-redux";
import IsTokenValid from "../../utils/tokenUtils";
import NewToken from "../../utils/newToken";
import "../../App.css";

import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import axios from "axios";


function NoHome(){
    const user = useSelector((state) => state.userInfo);

    // const headers = {
    //     'Content-Type' : 'application/json',
    //     'Authorization' : `Bearer ${user.accessToken}`,
    // }

    // console.log(headers);



    //로그아웃
    // const logout = () => {
    //     axios.get(`${BACKEND_URL}/api/v1/user/logout/${user.userId}`, headers)
    //         .then((response)=>{
    //            console.log("로그아웃");
    //         })
    //         .catch((error)=>{
    //             console.log(headers);
    //             console.log("로그아웃 실패", error);
    //         })
    // }
    
    
    //요청 보낼 때.
    if(IsTokenValid()){
        //원래 보내려고 했던 요청 보내기
        
    }else{
        //토큰 재발급
        NewToken()
        //원래 보내려고 했던 요청 보내기
    }
    
    // 화상 채팅방 입장
    let navigate = useNavigate();

    const handleButtonClick = async (e) => {
        const headers = {
            'Content-Type' : 'application/json'
        }
        console.log(e);

        const requestBody = {
            userId: user.userId,
            vr_max_cnt: e
        };
        

        const requestBodyJSON = JSON.stringify(requestBody);
        await axios
        .post(`${BACKEND_URL}/api/v1/room/enter`, requestBodyJSON, {headers})
        .then((response) => {
            console.log(response.data.token)
            navigate('/joinroom', {
                state: {
                    myUserName: user.userId,
                    mySessionId: response.data.vrSession,
                    token: response.data.token
                }
            });
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
    }

    const buttonStyle = {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return(
        <div>
            <h4>메인페이지</h4>
            <p>{user.userId}</p>
            <p>{user.accessToken}</p>
            <p>{user.expiredDate}</p>

            {/* <button style={buttonStyle} onClick={logout}>로그아웃</button><br/> */}

            <button style={buttonStyle}
                onClick={()=>{handleButtonClick(2)}}
            >랜덤 2인</button>

            <button style={buttonStyle}
                            onClick={()=>{handleButtonClick(4)}}
                        >랜덤 4인</button>

            <button style={buttonStyle}
                            onClick={()=>{handleButtonClick(6)}}
                        >랜덤 6인</button>
            
            <button style={buttonStyle} onClick={()=>{navigate('/start')}}>옛날 시작페이지</button>
        </div>
    )
}

export default NoHome;