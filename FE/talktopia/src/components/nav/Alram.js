import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../utils";

// import addFriendIcon from "../../../public/img/dding/addFriendIcon.png"
// import inviteRoomIcon from "../../../public/img/dding/inviteRoomIcon.png"

import style from './Nav.module.css';

function Alram(){
    const user = useSelector((state) => state.userInfo);
    const [notifications, setNotifications] = useState([]);

    const [ddingModalVisible, setDdingModalVisible] = useState(false);

    useEffect(() => {
        if (ddingModalVisible) {
            fetchNotifications();
        }
    }, [ddingModalVisible]);

    // 알림 데이터를 가져오는 함수
    const fetchNotifications = async () => {
        // console.log("fetchNotifications");
        try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/notice/list/${user.userId}`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        });
        setNotifications(response.data); // 데이터 배열에 직접 접근
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const refreshNotifications = () => {
        fetchNotifications();
      };

    // 유형에 따른 css class명 반환
    const getNotificationClass = (type) => {
        if (type === "화상채팅방 초대") return style["notification-chat-invite"];
        if (type === "친구 추가 요청") return style["notification-friend-request"];
        return "";
    };
    const getNotificationIcon = (type) => {
        if (type === "화상채팅방 초대") return "img/dding/inviteRoomIcon.png"
        if (type === "친구 추가 요청") return "img/dding/addFriendIcon.png"
        return null;
    };

    const handleDdingMouseOver = () => {
        setDdingModalVisible(true);
      };
    
      const handleDdingMouseOut = () => {
        setDdingModalVisible(false);
      };


    return(
        <div className={`${style["dding-space"]}`} onMouseOver={handleDdingMouseOver} onMouseOut={handleDdingMouseOut}>
            <img className={`${style.dding}`} src="/img/nav/dding.png" alt=""></img>
                {
                ddingModalVisible && (
                    <div className={style["ddingModal"]} onMouseOver={handleDdingMouseOver} onMouseOut={handleDdingMouseOut} >
                        <div className={style["refresh-button"]} onClick={refreshNotifications}>
                            <span className={style["refresh-icon"]}>⟳</span> 새로고침
                        </div>
                        {notifications.map((notification, index) => (
                        <div key={index} className={`${style["notification-item"]} ${getNotificationClass(notification.rmType)}`}>
                            <img src={getNotificationIcon(notification.rmType)} alt="notification icon" />
                            {notification.rmContent}
                        </div>
                        ))}
                  </div>
                )}
        </div>
    )
}

export default Alram;