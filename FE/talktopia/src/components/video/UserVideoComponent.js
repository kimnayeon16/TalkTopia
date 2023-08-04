import style from './UserVideoComponent.module.css'
import OpenViduVideoComponent from './OvVideo';

function VideoComponent (props) {
    // const userName = JSON.parse(props.streamManager.stream.connection.data).clientData
    let userName = '';

    try {
        const connectionData = JSON.parse(props.streamManager.stream.connection.data);
        userName = connectionData.clientData;
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }

    return (
        <>
            <div className={`${style.nickname}`}>
                <span>{userName}</span>
            </div>
            {props.streamManager !== undefined ? (
                <div>
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                </div>
            ) : null}
        </>
    );
}

export default VideoComponent;