import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import style from './RealHome.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BACKEND_URL } from '../../utils';
import { useEffect, useState } from 'react';
import { removeCookie } from '../../cookie';
import { reduxUserInfo } from '../../store';

function Home(){
    const user = useSelector((state) => state.userInfo);
    let dispatch = useDispatch();

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
    }

    const [mylang, setMylang] = useState("");

    useEffect(()=>{
        const lang = user.sttLang;
        setMylang(lang);
        if(lang === `ko-KR`){
            setMylang("한국어");
        }else if(lang === `en-US`){
            setMylang("영어");
        }else if(lang === `de-DE`){
            setMylang("독일어");
        }else if(lang === `ru-RU`){
            setMylang("러시아어");
        }else if(lang === `es-ES`){
            setMylang("스페인어");
        }else if(lang === `it-IT`){
            setMylang("이탈리아어");
        }else if(lang === `id-ID`){
            setMylang("인도네시아어");
        }else if(lang === `ja-JP`){
            setMylang("일본어");
        }else if(lang === `fr-FR`){
            setMylang("프랑스어");
        }else if(lang === `zh-CN`){
            setMylang("중국어 간체");
        }else if(lang === `zh-TW`){
            setMylang("중국어 번체");
        }else if(lang === `pt-PT`){
            setMylang("포르투갈어");
        }else if(lang === `hi-IN`){
            setMylang("힌디어");
        }
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
            </div>

            {/* <button style={buttonStyle} onClick={()=>{navigate('/friendList')}}>친구목록</button> */}
        </div>
    )
}

export default Home;