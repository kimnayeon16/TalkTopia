import React, { Component } from 'react';

// import style from './UserVideoComponent.module.css'
import OpenViduVideoComponent from './OvVideo';

function VideoComponent (props) {
    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(props.streamManager.stream.connection.data).clientData;
    }

    return (
        <div>
            {props.streamManager !== undefined ? (
                <div className="streamcomponent">
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </div>
    );
}

export default VideoComponent;


// export default class VideoComponent extends Component {

//     getNicknameTag() {
//         // Gets the nickName of the user
//         return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
//     }

//     render() {
//         return (
//             <div>
//                 {this.props.streamManager !== undefined ? (
//                     <div className="streamcomponent">
//                         <OpenViduVideoComponent streamManager={this.props.streamManager} />
//                         <div><p>{this.getNicknameTag()}</p></div>
//                     </div>
//                 ) : null}
//             </div>
//         );
//     }
// }
