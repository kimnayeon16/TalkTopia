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
                <span className="NotificationCloseButton" onClick={closeModal}>X</span>
            </div>
            <h1 className="NotificationDetailH1">Notification Detail</h1>
            <p className="NotificationDetailP">Notification Content: {notificationData.rmContent}</p>
            <p className="NotificationDetailP">Notification Status: {notificationData.rmType}</p>
            <p className="NotificationDetailP">Sender : {notificationData.rmHost}</p>
            {/* 여기에 나머지 데이터 표시 */}
            <AcceptButton notification={notificationData} closeModal={closeModal} />
            <DenyButton notification={notificationData} closeModal={closeModal} />
        </div>
    );
}

export default NotificationDetail;