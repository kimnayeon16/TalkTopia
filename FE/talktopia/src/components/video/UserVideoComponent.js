import { useSelector } from "react-redux";
import axios from 'axios';

import OpenViduVideoComponent from './OvVideo';
import { FaUserPlus } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

import style from './UserVideoComponent.module.css'
import { BACKEND_URL } from '../../utils';


function UserVideoComponent (props) {

    const user = useSelector((state) => state.userInfo);    // Redux 정보

    const friendAdd = async () => {

        const headers = {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }

        const requestBody = {
            friendId: props.userId,     // 친구추가하려는 아이디
            userId: user.userId         // 본인 아이디
        };
        const requestBodyJSON = JSON.stringify(requestBody);

        await axios
        .post(`${BACKEND_URL}/api/v1/fcm/sendFriendMessage`, requestBodyJSON, {headers})
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
    }

    const reportUser = (e) => {
        e.preventDefault();
        props.openReportModal(props.userId);
    }

    return (
        <>
            <div className={style['name-tag']}>
                <span>{props.userName}</span>
                <span>{props.roomRole}</span>
            </div>
            
            {props.streamManager !== undefined ? (
                <div>                
                    <OpenViduVideoComponent 
                        streamManager={props.streamManager} 
                        participantCount={ props.participantCount } 
                    />
                </div>
            ) : null}

            {user.userId !== props.userId ? (
                <div className={style['participant-actions']}>
                    <button className={style['participant-actions-button']} onClick={ friendAdd }>
                        <FaUserPlus size="14"/>
                    </button>
                    <button className={style['participant-actions-button']} onClick={ reportUser }>
                        <FaUserTimes size="14"/>
                    </button>
                </div>
            ) : null}
        </>
    );
}

export default UserVideoComponent;