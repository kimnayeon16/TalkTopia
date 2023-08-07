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
            <div className={style['chat-title']}>
                <p className={style['chat-title-text']}>Chat</p>
            </div>

            <div className={style['chat-div-line']}></div>


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
                                <p className={ `${style.text }`}>{data.message}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className={style['message-input-container']}>
                <input
                    placeholder="메세지를 보내세요"
                    className={style['message-input']}
                    value={message}
                    onChange={messageChangeHandler}
                    onKeyPress={keyPressHandler}
                />
                <button className={style['sendButton']}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send" viewBox="0 0 24 24">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                </button>
            </div>

        </>
    );

    // return (
    //     <>
    //         <div id={`${ style.chatContainer }`}>
    //             <div id={`${ style.chatComponent }`}>
    //                 <div id={`${ style.chatToolbar }`}>
    //                     <span>CHAT</span>
    //                 </div>

    //                 <div className={`${ style.message_wrap }`} ref={chatScroll}>
    //                     {messageList.map((data, i) => (
    //                         <div 
    //                             key={`${i}-Chat`}
    //                             id="remoteUsers"
    //                             className={
    //                                 `${style.message} ${ data.connectionId !== props.mainStreamManager.session.connection.connectionId ? style.left : style.right }`
    //                             }
    //                         >
    //                             <div className={ `${style.msg_detail }`}>
    //                                 <div className={ `${style.msg_info }`}>
    //                                     <p> {data.nickname}</p>
    //                                 </div>
    //                                 <div className={ `${style.msg_content }`}>
    //                                     {/* <span className={ `${style.triangle }`} /> */}
    //                                     <p className={ `${style.text }`}>{data.message}</p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     ))}

    //                 </div>

    //                 <div id={ `${style.messageInput }`}>
    //                     <input
    //                         placeholder="메세지를 보네세요"
    //                         id={ `${style.chatInput }`}
    //                         value={message}
    //                         onChange={messageChangeHandler}
    //                         onKeyPress={keyPressHandler}
    //                     />
    //                 </div>
    //             </div>


    //         </div>
    //     </>
    // )

};

export default Chat;