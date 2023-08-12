import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useNavigate } from 'react-router-dom';

function FCMModalComponent(props) {
    const user = useSelector((state) => state.userInfo);
    const navigate = useNavigate();

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