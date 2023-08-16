import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useNavigate } from 'react-router-dom';
import NotificationDetailModal from '../alarm/NotificationDetail.js';
import React, { useState, useEffect } from 'react'; // useState를 임포트하세요.

function FCMModalComponent(props) {
    const user = useSelector((state) => state.userInfo);
    const navigate = useNavigate();
    const [selectedNotification, setSelectedNotification] = useState(null);
    console.log("selectedNotification:", selectedNotification);
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
    }
    
    const handleConfirmClick = () => {
        console.log("확인 버튼이 클릭되었습니다.");
        if ('vrSession' in props.modalData) {
            props.closeModal();
            joinFriend(props.modalData.vrSession)
        } else if ('friendId' in props.modalData) {
            props.closeModal();
            friendAdd(props.modalData.userId)
        } else {
            props.closeModal();
        }
        // enterFriendRoom(6)
        //   setShowModal(false);
    };
    const joinFriend = async (sessionId) => {
        const requestBody = {
            userId: user.userId,
            vrSession: sessionId
        };

        const requestBodyJSON = JSON.stringify(requestBody);
        await axios
        .post(`${BACKEND_URL}/api/v1/room/joinFriend`, requestBodyJSON, {headers})
        .then((response) => {
            console.log(response.data.token)
            navigate('/joinroom', {
                state: {
                    // myUserName: user.userId,
                    mySessionId: response.data.vrSession,
                    token: response.data.token,
                    roomRole: response.data.roomRole,
                    roomType: 'friend'
                }
            });
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
    };

    const friendAdd = async (friendId) => {
        const requestBody = {
            userId: user.userId,        // 본인 아이디
            partId: friendId            // 친구추가하려는 아이디
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
    useEffect(() => {
        // 알림을 받았을 때의 조건을 설정해야 합니다.
        // 예를 들어, props.modalData에 알림 데이터가 있는지 확인하거나, 특정 상태가 true인지 확인하는 등의 조건을 설정합니다.
        if (props.modalData) {
            setSelectedNotification(props.modalData);
            console.log(props.modalData.rmNo);
        } else {
            setSelectedNotification(null); // 알림이 없는 경우 상태를 null로 초기화
        }
    }, [props.modalData]);

  return (
    <>

        {props.showModal && selectedNotification && (
            <NotificationDetailModal rmNo={parseInt(props.modalData.rmNo)} closeModal={() => setSelectedNotification(null)} />
        )}
    </>
  )
}

export default FCMModalComponent