import { useSelector } from "react-redux";
import axios from 'axios';

import OpenViduVideoComponent from './OvVideo';
import { FaUserPlus } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

import style from './UserVideoComponent.module.css'
import { BACKEND_URL } from '../../utils';


function VideoComponent (props) {
    // const userName = JSON.parse(props.streamManager.stream.connection.data).clientData
    // let userName = '';

    // try {
    //     const connectionData = JSON.parse(props.streamManager.stream.connection.data);
    //     userName = connectionData.clientData;
    // } catch (error) {
    //     console.error('Error parsing JSON data:', error);
    // }
    const user = useSelector((state) => state.userInfo);    // Redux 정보


    const friendAdd = async () => {

        const headers = {
            'Content-Type' : 'application/json'
        }

        const requestBody = {
            userId: user.userId,        // 본인 아이디
            partId: props.userName      // 친구추가하려는 아이디
        };
        const requestBodyJSON = JSON.stringify(requestBody);

        await axios
        .post(`${BACKEND_URL}/api/v1/friend/add`, requestBodyJSON, {headers})   // 여기부터 다시 수정해야함.
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
    }

    const reportUser = () => {
        console.log('모달창띄워야할듯')
    }

    return (
        <>
            <div className={style['name-tag']}>
                <span>{props.userName}</span>
            </div>
            
            {props.streamManager !== undefined ? (
                <div>                
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                </div>
            ) : null}

            <div className={style['participant-actions']}>
                <button className={style['participant-actions-button']} onClick={ friendAdd }>
                    <FaUserPlus size="14"/>
                </button>
                <button className={style['participant-actions-button']} onClick={ reportUser }>
                    <FaUserTimes size="14"/>
                </button>
            </div>
        </>
    );
}

export default VideoComponent;