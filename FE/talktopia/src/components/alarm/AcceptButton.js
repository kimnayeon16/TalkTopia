import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import "./AcceptButton.css"
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function AcceptButton({ notification, closeModal }) {
    const navigate = useNavigate();
    const handleAccept = async () => {
        try {
            const userInfoString = localStorage.getItem("UserInfo");
            const userInfo = JSON.parse(userInfoString);

            // Mark the notification as read
            const readAccessData = {
                rmType: notification.rmType,
                rmVrSession: notification.rmVrSession,
                rmHost: notification.rmHost,
                rmGuest: notification.rmGuest,
                receiverNo: notification.receiverNo,
            };
            await axios.post(`${BACKEND_URL}/api/v1/notice/read/access`, readAccessData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.accessToken}`
                }
            });

            // Perform the appropriate action based on rmType
            if (notification.rmType === "Room Request") {
                const joinFriendData = {
                    vrSession: notification.rmVrSession,
                    userId: notification.rmGuest,
                };
                console.log("이거들어가냐?");
                console.log(notification.rmVrSession);
                console.log(notification.rmGuest);
                await axios.post(`${BACKEND_URL}/api/v1/room/joinFriend`, joinFriendData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userInfo.accessToken}`
                    }
                }).then((response) => {
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
                }).catch((error)=> {

                    console.log("에러:", error);
                    if (error.response  && error.response.data.message === "방이 꽉찼어요") {
                        // "방이 꽉찼어요" 에러 처리
                        Swal.fire({
                            icon: "error",
                            title: "방이 꽉 찼어요",
                            text: "더 이상 참여할 수 없는 방입니다.",
                            confirmButtonText: "확인",
                            confirmButtonColor: '#f47b7b',
                            timer: 2000,
                        timerProgressBar: true,
                        });
                    } else {
                        // 다른 에러 처리
                        Swal.fire({
                            icon: "error",
                            title: "에러",
                            text: "오류가 발생했습니다.",
                            confirmButtonText: "확인",
                            confirmButtonColor: '#f47b7b',
                            timer: 2000,
                        timerProgressBar: true,
                        });
                    }
                })
            } else if (notification.rmType === "Friend Request") {
                const addFriendData = {
                    userId: notification.rmHost,
                    partId: notification.rmGuest,
                };
                await axios.post(`${BACKEND_URL}/api/v1/friend/add`, addFriendData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userInfo.accessToken}`
                    }
                }).then((response) => {

                    Swal.fire({
                        icon: "success",
                        title: "친구 등록 완료",
                        text: "친구와 토크토피아 세상을 함께 누려주세요 !",
                        confirmButtonText: "확인",
                        confirmButtonColor: '#90dbf4',
                        timer: 2000,
                        timerProgressBar: true,
                      })
                }).catch((error) => {
                    if (error.response && error.response.status === 500 && error.response.data.message === "중복된 친구입니다.") {
                        // 서버에서 RunTimeException을 던진 경우 처리
                        Swal.fire({
                            icon: "error",
                            title: "중복 친구 오류",
                            text: "중복된 친구입니다.",
                            confirmButtonText: "확인",
                            confirmButtonColor: '#f47b7b',
                            timer: 3000,
                            timerProgressBar: true,
                        });
                    } else {
                        console.log("에러", error);
                        Swal.fire({
                            icon: "error",
                            title: "알수 없는 에러",
                            text: "알수 없는 에러로 친구 추가가 안됐습니다.",
                            confirmButtonText: "확인",
                            confirmButtonColor: '#f47b7b',
                            timer: 3000,
                            timerProgressBar: true,
                        });
                    }
                })
            }

            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    if (notification.rmType === "Done.") {
        return null;
    }

    return (
        <button className="AcceptButton" onClick={handleAccept}>
            <img className ="NotificationImg" src="img/dding/doneRequestIcon.png" alt="Accept Icon" />
            Accept
        </button>
    );
}

export default AcceptButton;
