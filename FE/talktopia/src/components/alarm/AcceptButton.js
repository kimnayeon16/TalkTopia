import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";

function AcceptButton({ notification, closeModal }) {
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
                await axios.post(`${BACKEND_URL}/api/v1/room/joinFriend`, joinFriendData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userInfo.accessToken}`
                    }
                });
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
                });
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
            Accept
        </button>
    );
}

export default AcceptButton;
