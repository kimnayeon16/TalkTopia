import OpenViduVideoComponent from './OvVideo';
import { FaUserPlus } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

import style from './UserVideoComponent.module.css'

function VideoComponent (props) {
    // const userName = JSON.parse(props.streamManager.stream.connection.data).clientData
    let userName = '';

    try {
        const connectionData = JSON.parse(props.streamManager.stream.connection.data);
        userName = connectionData.clientData;
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }

    const friendAdd = () => {
        console.log(userName) // partId
        // userId는 redux에서 가져오면 될듯
    }

    return (
        <>
            <div className={style['name-tag']}>
                <span>{userName}</span>
            </div>
            
            {props.streamManager !== undefined ? (
                <div>                
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                </div>
            ) : null}

            <div className={style['participant-actions']}>
                <button className={style['participant-actions-button']} onClick={friendAdd}>
                    <FaUserPlus size="14"/>
                </button>
                <button className={style['participant-actions-button']}>
                    <FaUserTimes size="14"/>
                </button>
            </div>
        </>
    );

    // return (
    //     <>
    //         <div className={`${style.nickname}`}>
    //             <span>{userName}</span>
    //         </div>
    //         {props.streamManager !== undefined ? (
    //             <div>
    //                 <OpenViduVideoComponent streamManager={props.streamManager} />
    //             </div>
    //         ) : null}
    //     </>
    // );
}

export default VideoComponent;