import { useNavigate } from 'react-router-dom';
import style from './Nav.module.css';

function Admin() {
    const navigate = useNavigate();

    return (
        <div className={`${style["admin-space"]}`}>
            <button className={`${style["admin"]}`} onClick={()=>{navigate('/Admin')}}>
                <p>관리자</p>
            </button>
        </div>
    ) 
};

export default Admin;