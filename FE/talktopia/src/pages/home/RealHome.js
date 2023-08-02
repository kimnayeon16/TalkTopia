import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import style from './RealHome.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

function RealHome(){

    let navigate = useNavigate();

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
                            <NavDropdown.Item href="#action/3.3">로그아웃</NavDropdown.Item>
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
        </div>
    )
}

export default RealHome;