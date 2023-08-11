import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useNavigate } from 'react-router-dom';

function FCMModalComponent(props) {
    const user = useSelector((state) => state.userInfo);
    const navigate = useNavigate();

    
    const handleConfirmClick = () => {
        console.log("확인 버튼이 클릭되었습니다.");
        enterFriendRoom(6)
        props.closeModal();
        //   setShowModal(false);
    };
    const enterFriendRoom = async (e) => {
        const headers = {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }

        const requestBody = {
            userId: user.userId,
            vr_max_cnt: e
        };

        const requestBodyJSON = JSON.stringify(requestBody);
        await axios
        .post(`${BACKEND_URL}/api/v1/room/enterFriend`, requestBodyJSON, {headers})
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

  return (
    <>
        {props.showModal && (
            <div className="fcm-modal">
                <div className="fcm-modal-content">
                    {props.modalContent}
                    <button className="fcm-modal-content-button" onClick={handleConfirmClick}>확인</button>
                    <button className="fcm-modal-content-button" onClick={props.closeModal}>닫기</button>
                </div>
            </div>
        )}
    </>
  )
}

export default FCMModalComponent