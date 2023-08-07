import { useNavigate } from 'react-router-dom';

function Counsel(){
    const navigate = useNavigate();

    return(
        <div>
            <h2>FAQ 및 문의</h2>
            <span onClick={navigate('/faq')}>FAQ</span>
            <span onClick={navigate('/counsel')}>1:1 문의</span>
        </div>
    )
}

export default Counsel;