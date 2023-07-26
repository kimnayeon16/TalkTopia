import { useState } from "react";
import { useSelector } from "react-redux";
import IsTokenValid from "../../utils/tokenUtils";

function Home(){
    const user = useSelector((state) => state.userInfo);
    // eslint-disable-next-line
    const [a, setA] = useState(true);

    return(
        <div>
            <h4>메인페이지</h4>
            <p>{user.userId}</p>
            <p>{user.accessToken}</p>
            <p>{user.expiredDate}</p>

            

            if({a}){
                IsTokenValid()
            }

            {/* 
            ex)
            const userId = useSelector((state) => state.userInfo.userId);

            const click = (e) => {
                 e.preventDefault();

                 if(IsTokenValid()){
                    //내가 보내야하는 api 요청 보내면 됨.
                 }else{
                    //토큰을 재발급 받아야함.
                    const requestBody = {
                        userId,
                        refreshToken
                    };

                    const requestBodyJSON = JSON.stringify(requestBody);

                    axios
                    .post(`${BACKEND_URL}/api/v1/user/reqNewToken`, requestBodyJSON, {headers})
                    .then((response)=>{
                        console.log(response.data);
                        dispatch(reduxUserInfo({
                            userId: response.data.userId,
                            accessToken: response.data.accessToken,
                            expiredDate: response.data.expiredDate
                        }));

                        Cookies.set('refreshToken', response.data.refreshToken);
                    })
                    .catch((error)=>{
                        console.log("에러",error);
                    })
                    
                    //원래 보내고자 했던 api 호출하기
                    }
                }
            
            */}

            


        </div>
    )
}

export default Home;