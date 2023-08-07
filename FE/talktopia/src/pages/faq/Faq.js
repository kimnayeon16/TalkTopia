import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

function Faq(){
    const navigate = useNavigate();

    return(
        <div>
            <h2>FAQ 및 문의</h2>
            <span onClick={navigate('/faq')}>FAQ</span>
            <span onClick={navigate('/counsel')}>1:1 문의</span>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>자주하는 질문 1</Accordion.Header>
                    <Accordion.Body>
                    내용
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>자주하는 질문 2</Accordion.Header>
                    <Accordion.Body>
                    내용
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Faq;