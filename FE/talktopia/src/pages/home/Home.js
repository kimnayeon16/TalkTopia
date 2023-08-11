// App.js
import React, { useEffect, useState } from 'react';
import BearGroup from '../../components/main/BearGroup';
import CoralGroup from '../../components/main/CoralGroup';
import FishGroup from '../../components/main/FishGroup';
import FriendGroup from '../../components/main/FriendGroup';
import FriendList from '../../components/main/FriendList';
import PenguinGroup from '../../components/main/PenguinGroup';
import WaterGroup from '../../components/main/WaterGroup';
import WhaleGroup from '../../components/main/WhaleGroup';
import style from '../../components/main/mainComponent.module.css';
import styles from "./Home.module.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils';
import { removeCookie } from '../../cookie';

function Home(){

  const [userModalVisible, setUserModalVisible] = useState(false);
  const [ddingModalVisible, setDdingMoalVisible] = useState(false);
  const [faqModalVisible, setFaqMoalVisible] = useState(false);

  const handleUserMouseOver = () => {
    setUserModalVisible(true);
  };

  const handleUserMouseOut = () => {
    setUserModalVisible(false);
  };

  const handleEarthMouseOver = () => {
    setDdingMoalVisible(true);
  }

  const handleEarthMouseOut = () => {
    setDdingMoalVisible(false);
  }

  const handleFaqMouseOver = () => {
    setFaqMoalVisible(true);
  }

  const handleFaqMouseOut = () => {
    setFaqMoalVisible(false);
  }

  return(
  <div className={`${style.body}`}>
    <span className={`${styles.title}`}>TalkTopia</span>
    <img className={`${styles.user}`} src="/img/nav/user.png" alt="" onMouseOver={handleUserMouseOver} onMouseOut={handleUserMouseOut}></img>
    {userModalVisible && <Me handleUserMouseOver={handleUserMouseOver} handleUserMouseOut={handleUserMouseOut}/>}
    <img className={`${styles.dding}`} src="/img/nav/dding.png" alt=""></img>
    <img className={`${styles.earth}`} src="/img/nav/earth.png" alt="" onMouseOver={handleEarthMouseOver} onMouseOut={handleEarthMouseOut}></img>
    {ddingModalVisible && <Earth handleEarthMouseOver={handleEarthMouseOver} handleEarthMouseOut={handleEarthMouseOut}/>}
    <img className={`${styles.faq}`} src="/img/nav/faq1.png" alt="" onMouseOver={handleFaqMouseOver} onMouseOut={handleFaqMouseOut}></img>
    {faqModalVisible && <Faq handleFaqMouseOver={handleFaqMouseOver} handleFaqMouseOut={handleFaqMouseOut}/>}
    <FishGroup />
    <PenguinGroup />
    <BearGroup />
    <FriendGroup />
    <WhaleGroup />
    <CoralGroup />
    <FriendList />
    <WaterGroup />
  </div>
  )
};

export default Home;


function Me(props){
  const navigate = useNavigate();

  const user = useSelector((state) => state.userInfo);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  
  useEffect(()=>{
    const userInfoString = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const name = userInfo.userName;
    const imgurl = userInfo.profileUrl;
    setUserName(name);
    setUserImg(imgurl);
  },[])

  const logout = () => {
    axios.get(`${BACKEND_URL}/api/v1/user/logout/${user.userId}`, {
        params: {
            name: user.userId
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
<<<<<<< Updated upstream
    })

    useEffect(() => {
        // 로컬 스토리지에서 저장된 사용자 정보 불러오기
        const storedUserInfo = localStorage.getItem('UserInfo');
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          // Redux 상태를 업데이트하는 액션 디스패치
          dispatch(reduxUserInfo(userInfo));
        }
      }, [dispatch]);

    //   useEffect(() => {
    //     // 로컬 스토리지에서 저장된 사용자 정보 불러오기
    //     const storedUserInfo = localStorage.getItem('UserInfo');
    //     if (storedUserInfo) {
    //       const userInfo = JSON.parse(storedUserInfo);
    //       // Redux 상태를 업데이트하는 액션 디스패치
    //       dispatch(reduxUserInfo(userInfo));
    //     }
    //   }, []);


    //로그아웃
    const logout = () => {
        axios.get(`${BACKEND_URL}/api/v1/user/logout/${user.userId}`, {
            params: {
                name: user.userId
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.accessToken}`
            }
          }).then((response)=>{
            removeCookie('refreshToken');
            localStorage.removeItem("UserInfo");
            console.log("로그아웃");
            
            navigate('/');
         })
         .catch((error)=>{
             console.log("로그아웃 실패", error);
         })
 }

    // 화상 채팅방 입장
    let navigate = useNavigate();

    const enterCommonRoom = async (e) => {
        const requestBody = {
            userId: user.userId,
            vr_max_cnt: e
        };

        const requestBodyJSON = JSON.stringify(requestBody);
        await axios
        .post(`${BACKEND_URL}/api/v1/room/enterCommon`, requestBodyJSON, {headers})
        .then((response) => {
            console.log(response.data.token)
            navigate('/joinroom', {
                state: {
                    // myUserName: user.userId,
                    mySessionId: response.data.vrSession,
                    token: response.data.token,
                    roomRole: response.data.roomRole,
                    roomType: 'common'
                }
            });
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
    };

    const enterFriendRoom = async (e) => {
        const requestBody = {
            userId: user.userId,
            vr_max_cnt: e
        };

        const requestBodyJSON = JSON.stringify(requestBody);
        await axios
        .post(`${BACKEND_URL}/api/v1/room/enterFriend`, requestBodyJSON, {headers})
        .then((response) => {
            console.log(response.data.token)
            navigate('/joinroom', {
                state: {
                    // myUserName: user.userId,
                    mySessionId: response.data.vrSession,
                    token: response.data.token,
                    roomRole: response.data.roomRole,
                    roomType: 'friend'
                }
            });
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
    };

    return(
        <div>
           <Navbar collapseOnSelect expand="lg" className="bg-transparent fixed-top">
            <Container>
                <Navbar.Brand href="#home">TalkTopia</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <NavDropdown title="사용자" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">{user.userName}</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/myinfo/passwordConfirm')}}>내 정보 보기</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#memes">알림</Nav.Link>
                        <NavDropdown title="사이트 언어 변경" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">한국어</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">영어</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="FAQ" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={()=>{navigate('/faq')}}>FAQ</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/counsel')}}>1:1 문의</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div>
                <p className={`${style.p}`}>세계를 하나로 잇는 깊은 바다처럼<br/>
                    <span className={`${style.span}`}>TalkTopia</span> 는 여러분의 여정을 시작할 특별한 항구가 될거에요. <br/>
                    원하는 인원 수를 설정하여 <span className={`${style.span}`}>{user.userName}</span> 님만의 특별한 항해를 떠날 수 있어요. 🚢 <br/>
                    마음에 맞는 다양한 국적의 사람들과 행운 넘치는 시간을 보내길 기원할게요.🍀
                </p>
                <p className={`${style["p-1"]}`}>내가 사용할 언어 : {mylang}</p>
            </div>
            <div className={`${style["button-together"]}`}>
                <button className={`${style["button-together-1"]}`} onClick={()=>{enterCommonRoom(2)}}>랜덤 2인</button>
                <button className={`${style["button-together-1"]}`} onClick={()=>{enterCommonRoom(4)}}>랜덤 4인</button>
                <button className={`${style["button-together-1"]}`} onClick={()=>{enterCommonRoom(6)}}>랜덤 6인</button>
                <button className={`${style["button-together-1"]}`} onClick={()=>{enterFriendRoom(6)}}>방 만들기</button>
                <button className={`${style["button-together-1"]}`} onClick={()=>{navigate('/friendList')}}>친구 목록 보기</button>
            </div>

            {/* <button style={buttonStyle} onClick={()=>{navigate('/friendList')}}>친구목록</button> */}
        </div>
    )
=======
      }).then((response)=>{
        removeCookie('refreshToken');
        localStorage.removeItem("UserInfo");
        console.log("로그아웃");
        
        navigate('/');
     })
     .catch((error)=>{
         console.log("로그아웃 실패", error);
     })
>>>>>>> Stashed changes
}


  return(
    <div className={`${styles.meModal}`}  onMouseOver={props.handleUserMouseOver} onMouseOut={props.handleUserMouseOut}>
      <img className={`${styles.img}`} style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden'}} src={userImg} alt=""/>
      <p className={`${styles.mytext}`}>{userName}</p>
      <hr/>
      <p className={`${styles.mytext}`} onClick={()=>{navigate('/myinfo/passwordConfirm')}}>내 정보 보기</p>
      <p className={`${styles.mytext}`} onClick={logout}>로그아웃</p>
    </div>
  )
}

function Earth(props){
  return(
    <div className={`${styles.earthModal}`} onMouseOver={props.handleEarthMouseOver} onMouseOut={props.handleEarthMouseOut}>
      <p className={`${styles.countrytext}`}>한국어</p>
      <p className={`${styles.countrytext}`}>영어</p>
    </div>
  )
}

function Faq(props){
  const navigate = useNavigate();
  return(
    <div className={`${styles.faqModal}`} onMouseOver={props.handleFaqMouseOver} onMouseOut={props.handleFaqMouseOut}>
    <p className={`${styles.faqtext}`} onClick={()=>{navigate('/faq')}}>FAQ</p>
    <p className={`${styles.faqtext}`} onClick={()=>{navigate('/counsel')}}>1:1 문의</p>
  </div>
  )
}