import { useNavigate } from 'react-router-dom';
import style from './Nav.module.css';
import { useState } from 'react';

function Admin() {
    const navigate = useNavigate();

    const [adminModalVisible, setAdminMoalVisible] = useState(false);

    const handleAdminMouseOver = () => {
        setAdminMoalVisible(true);
      }
    
      const handleAdminMouseOut = () => {
        setAdminMoalVisible(false);
      }

    return (
        <div className={`${style["admin-space"]}`} onClick={()=>{navigate('/Admin')}} onMouseOver={handleAdminMouseOver} onMouseOut={handleAdminMouseOut}>
            {/* <button className={`${style["admin"]}`} onClick={()=>{navigate('/Admin')}}> */}
            <img className={`${style.admin}`} src="/img/nav/admin.png" alt="" onMouseOver={handleAdminMouseOver} onMouseOut={handleAdminMouseOut}></img>
            {
            adminModalVisible &&
                <div onClick={()=>{navigate('/Admin')}} onMouseOver={handleAdminMouseOver} onMouseOut={handleAdminMouseOut}>
                    <div className={`${style.adminModal}`}>
                        <p className={`${style.countrytext}`}>관리자페이지입니다</p>
                    </div>
                </div>
            }
            {/* </button> */}
        </div>
    ) 
};

export default Admin;