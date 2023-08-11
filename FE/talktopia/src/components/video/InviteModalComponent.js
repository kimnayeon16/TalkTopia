import { useCallback, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { BACKEND_URL } from '../../utils';

import style from './InviteModalComponent.module.css'


function InviteModalComponent(props) {
    const user = useSelector((state) => state.userInfo);    // Redux 정보
    const checkBoxList = props.inviteFriendsList

    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const checkedItemHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }
    
        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
            return;
        }
        return;
    };

    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);;
    }

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        console.log('checkdList: ', checkedList)
        
        const headers = {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }

        const requestBody = {
            friendId: checkedList,
            vrSession: props.vrSession,
            userId: user.userId,        // 본인 아이디
        };
        const requestBodyJSON = JSON.stringify(requestBody);

        await axios
        .post(`${BACKEND_URL}/api/v1/fcm/sendVroomMessage`, requestBodyJSON, {headers})   // 여기부터 다시 수정해야함.
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
        // props.closeInviteModal();
    }, [checkedList]);

    return (
        <>
            <div className={style['report-modal-content']}>
                <h1>친구 목록</h1>
                <button className={style['report-modal-close']} onClick={props.closeInviteModal}>close</button>
                <form onSubmit={onSubmit}>
                    {checkBoxList.map((item, idx) => (
                        <div className={style['report-reason-content']} key={idx}>
                            <input 
                                type='checkbox' 
                                id={item.userId}
                                checked={checkedList.includes(item.userId)}
                                onChange={(e) => checkHandler(e, item.userId)}
                            />
                            <label htmlFor={item.userId} >{item.userId}</label>
                        </div>
                    ))}

                    <button type='submit'>초대하기</button>
                </form>
            </div>
        </>
    )
};

export default InviteModalComponent