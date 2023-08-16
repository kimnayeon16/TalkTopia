import { useNavigate } from "react-router-dom";
import style from './Logout.module.css';
import { useEffect } from "react";
import { useState } from "react";

function Logout(){
    const navigate = useNavigate();
    const [is, setIs] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIs(true);
        }, 6000);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

      useEffect(() => {
        const timer = setTimeout(() => {
          setIs(false);
        }, 12000);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

    return(
        <div className={`${style.background}`}>
             <img className={`${style.cloud}`} src="/img/cloud/cloud4.png" alt=""/>
            <img className={`${style.cloud2}`} src="/img/cloud/cloud5.png" alt=""/>
            <img className={`${style.cloud3}`} src="/img/cloud/cloud6.png" alt=""/>
            <div className={`${style["start-header"]}`}>
            <h2 className={`${style.h2}`}>TalkTopia<span className={`${style.span}`}>에서 다양한 국적의 사람들과 <br/> 소통하며 즐거운 시간 보내셨나요?</span></h2>
            <p className={`${style.p}`}>또 만나요 우리 !</p>
            <button className={`${style.button}`} onClick={()=>{navigate('/')}}><span className={`${style.span}`}>💻</span> TalkTopia 홈으로 가기 <span className={`${style.span}`}>⛵</span></button>
            <img className={`${style.friend1}`} src="/img/start/friend4.png" alt=""></img>
            <img className={`${style.friend}`} src="/img/start/friend.png" alt=""></img>
            <img className={`${style.friend2}`} src="/img/start/friend5.png" alt=""></img>
            {
                is ? 
                <><img className={`${style.message}`} src="/img/start/message.png" alt=""></img>
                <p className={`${style.message1}`}>로그아웃 성공 !🙂</p></>
                : null
            }
            <img className={`${style.woodroad}`} src="/img/background/나무판자.png" alt=""/>
            <img className={`${style.wave}`} src="/img/boat/boat3.png" alt=""/>
            <img className={`${style.wave1}`} src="/img/boat/boat5.png" alt=""/>
            {/* <img className={`${splash ? style.splash : style.splash1 }`} src="/img/start/splash.png" alt=""/> */}
        </div>
        </div>
    )
}
export default Logout;