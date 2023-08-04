import React, { useEffect, useRef, useState } from "react";
import style from './Chat.module.css';

function Chat(props) {

    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const chatScroll = useRef(null);

    useEffect(() => {
        // Receiver of the message (usually before calling 'session.connect')
        props.mainStreamManager.stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            let newMessageList = ({
                connectionId: event.from.connectionId,  // Connection object of the sender 
                nickname: data.nickname, 
                message: data.message                   // Message
            });
            setMessageList((prev) => ([...prev, newMessageList]))
            scrollToBottom();
        });
    }, []);

    // 아래는 메세지 보내는 것 관련 -----------------------------
    const messageChangeHandler = (e) => {
        setMessage(e.target.value)
    };

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // 연결된 모든 참가자에게 broadcast message로 메세지 보내기 
    const sendMessage = () => {
        let newMessage = message.replace(/ +(?= )/g, '');
        if (newMessage !== '' && newMessage !== ' ') {
            const data = {
                message: message, 
                nickname: props.myUserName, 
                streamId: props.mainStreamManager.stream.streamId
            };
            // Sender of the message (after 'session.connect')
            props.mainStreamManager.stream.session.signal({
                data: JSON.stringify(data), // Any string (optional)
                to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
                type: 'chat',               // The type of message (optional)
            })
            .then(() => {
                console.log('메세지가 성공적으로 보내졌습니다.');
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setMessage('');
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            try {
                chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

    return (
        <>
            <div id={`${ style.chatContainer }`}>
                <div id={`${ style.chatComponent }`}>
                    <div id={`${ style.chatToolbar }`}>
                        <span>CHAT</span>
                    </div>

                    <div className={`${ style.message_wrap }`} ref={chatScroll}>
                        {messageList.map((data, i) => (
                            <div 
                                key={`${i}-Chat`}
                                id="remoteUsers"
                                className={
                                    `${style.message} ${ data.connectionId !== props.mainStreamManager.session.connection.connectionId ? style.left : style.right }`
                                }
                            >
                                <div className={ `${style.msg_detail }`}>
                                    <div className={ `${style.msg_info }`}>
                                        <p> {data.nickname}</p>
                                    </div>
                                    <div className={ `${style.msg_content }`}>
                                        {/* <span className={ `${style.triangle }`} /> */}
                                        <p className={ `${style.text }`}>{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div id={ `${style.messageInput }`}>
                        <input
                            placeholder="메세지를 보네세요"
                            id={ `${style.chatInput }`}
                            value={message}
                            onChange={messageChangeHandler}
                            onKeyPress={keyPressHandler}
                        />
                    </div>
                </div>


            </div>
        </>
    )

};

export default Chat;