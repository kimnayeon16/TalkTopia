// DenyButton.js
import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import "./DenyButton.css"

function DenyButton({ notification, closeModal }) {
    const handleDenyClick = async () => {
        const requestData = {
            rmType: notification.rmType,
            rmVrSession: notification.rmVrSession,
            rmHost: notification.rmHost,
            receiverNo: notification.receiverNo,
        };

        try {
            const userInfoString = localStorage.getItem("UserInfo");
            const userInfo = JSON.parse(userInfoString);
            await axios.post(`${BACKEND_URL}/api/v1/notice/read/deny`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.accessToken}`
                }
            });
            closeModal(); // Close the modal after denying
        } catch (error) {
            console.error("Error denying notification:", error);
            // Handle error here
        }
    };
    if (notification.rmType === "Done.") {
        return null;
    }

    return (
        <button className="DenyButton" onClick={handleDenyClick}>
            <img className ="NotificationImg" src="img/dding/failRequestIcon.png" alt="Fail Icon" />
            Deny
        </button>
    );
}

export default DenyButton;
