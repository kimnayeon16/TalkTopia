import { FiCamera } from "react-icons/fi";          // video on
import { FiCameraOff } from "react-icons/fi";       // Video off
import { BsMic } from "react-icons/bs";             // Mic on
import { BsMicMute } from "react-icons/bs";         // Mic off
import { ImExit } from "react-icons/im";          // Leave

import style from "./ToolbarComponent.module.css"


function ToolbarComponent(props) {
    return (
        <>
            <div className={style['video-call-actions']}>
                {props.audioEnabled ? (
                    <button className={`${style['video-action-button']}`} onClick={props.toggleAudio}>
                        <BsMic size="24" color="black" />
                    </button>
                ) : (
                    <button className={`${style['video-action-button']}`} onClick={props.toggleAudio}>
                        <BsMicMute size="24" color="grey"/>
                    </button>
                ) }

                {props.videoEnabled ? (
                    <button className={style['video-action-button']} onClick={props.toggleVideo}>
                        <FiCamera size="24" color="black" />
                    </button>
                ) : (
                    <button className={style['video-action-button']} onClick={props.toggleVideo}>
                        <FiCameraOff size="24" color="grey"/>
                    </button>
                )}

                <button className={style['video-action-button']} onClick={props.leaveSession}>
                    <ImExit size="24" color="black" />
                </button>
            </div>
        </>
    )
};

export default ToolbarComponent;