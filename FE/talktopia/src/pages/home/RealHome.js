import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import style from './RealHome.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BACKEND_URL } from '../../utils';
import { useEffect, useState } from 'react';

function RealHome(){
    const user = useSelector((state) => state.userInfo);

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user.accessToken}`,
    }

    const [mylang, setMylang] = useState("");

    useEffect(()=>{
        if(user.sttLang === `ko-KR`){
            setMylang("한국어");
        }else if(user.sttLang === `en-US`){
            setMylang("영어");
        }else if(user.sttLang === `de-DE`){
            setMylang("독일어");
        }else if(user.sttLang === `ru-RU`){
            setMylang("러시아어");
        }else if(user.sttLang === `es-ES`){
            setMylang("스페인어");
        }else if(user.sttLang === `it-IT`){
            setMylang("이탈리아어");
        }else if(user.sttLang === `id-ID`){
            setMylang("인도네시아어");
        }else if(user.sttLang === `ja-JP`){
            setMylang("일본어");
        }else if(user.sttLang === `fr-FR`){
            setMylang("프랑스어");
        }else if(user.sttLang === `zh-CN`){
            setMylang("중국어 간체");
        }else if(user.sttLang === `zh-TW`){
            setMylang("중국어 번체");
        }else if(user.sttLang === `pt-PT`){
            setMylang("포르투갈어");
        }else if(user.sttLang === `hi-IN`){
            setMylang("힌디어");
        }
        
    },[])






    // console.log(headers);


    //로그아웃
    const logout = () => {
        axios.get(`${BACKEND_URL}/api/v1/user/logout/${user.userId}`, headers)
            .then((response)=>{
               console.log("로그아웃");
            })
            .catch((error)=>{
                console.log(headers);
                console.log("로그아웃 실패", error);
            })
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
                            <NavDropdown.Item href="#action/3.1">이름</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/myinfo/passwordConfirm')}}>내 정보 보기</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#memes">알림</Nav.Link>
                        <NavDropdown title="사이트 언어 변경" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">한국어</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">영어</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="FAQ" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">FAQ</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">1:1 문의</NavDropdown.Item>
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
                <button className={`${style["button-together-1"]}`} onClick={()=>{handleButtonClick(2)}}>랜덤 2인</button>
                <button className={`${style["button-together-1"]}`} onClick={()=>{handleButtonClick(4)}}>랜덤 4인</button>
                <button className={`${style["button-together-1"]}`} onClick={()=>{handleButtonClick(6)}}>랜덤 6인</button>
            </div>
        </div>
    )
}

export default RealHome;