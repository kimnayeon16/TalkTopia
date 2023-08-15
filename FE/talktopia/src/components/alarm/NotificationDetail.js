// NotificationDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import './NoficitaionDetail.css';
import AcceptButton from "./AcceptButton.js"; // "수락" 버튼 컴포넌트를 가져옵니다.
import DenyButton from "./DenyButton.js";


function NotificationDetail({ rmNo, closeModal }) {
    const [notificationData, setNotificationData] = useState(null);

    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                const userInfoString = localStorage.getItem("UserInfo");
                const userInfo = JSON.parse(userInfoString);
                
                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/notice/${rmNo}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.accessToken}`
                        }
                    }
                );
    
                setNotificationData(response.data);
            } catch (error) {
                console.error("Error fetching notification data:", error);
            }
        };
    
        fetchNotificationData();
    }, [rmNo]);
    

    if (!notificationData) {
        return <div>Loading...</div>;
    }

    // notificationData를 사용하여 컴포넌트 내용 구성
    return (
        <div className="NotificationDetailDiv">
            <div className="NotificationModalHeader">
                <div className="NotificationCloseButton" onClick={closeModal}>X</div>
            </div>
            <div className="NotificationBody">
            {notificationData.rmVrSession !== "NONE" ? (
                        <div className="NotificationDetailH1">Room Request Message</div>
                    ) : notificationData.rmVrSession === "NONE" ? (
                        <div className="NotificationDetailH1">Friend Request Message</div>
                    ) : null}
                <div className="NotificationDetailP">
                    <div className="NotificationDetailLabel">Notification Content</div>
                    <div className="NotificationDetailLabelChildren"> {notificationData.rmContent}</div>
                </div>    
                <div className="NotificationDetailP">
                    <div className="NotificationDetailLabel">Notification Status</div>
                    <div className="NotificationDetailLabelChildren">{notificationData.rmType}</div>
                </div>
                <div className="NotificationDetailP">
                    <div className="NotificationDetailLabel">Notification Sender</div>
                    <div className="NotificationDetailLabelChildren"> {notificationData.rmHost}</div>
                </div>
                <div className="NotificationDetailP">
                    {notificationData.rmVrSession !== "NONE" ? (
                        <>
                        <div className="NotificationDetailLabel">Notification VR Session</div>
                        <div className="NotificationDetailLabelChildren"> {notificationData.rmVrSession}</div>
                        </>
                    ) : null}
                </div>
                                {/* 여기에 나머지 데이터 표시 */}
            </div>
            <div className="buttonStatus">
                <AcceptButton notification={notificationData} closeModal={closeModal} />
                <DenyButton notification={notificationData} closeModal={closeModal} />
            </div>
        </div>
    );
}

export default NotificationDetail;