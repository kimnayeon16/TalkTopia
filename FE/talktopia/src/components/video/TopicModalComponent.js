import { useEffect, useState } from 'react';
import style from './InviteModalComponent'

function TopicModalComponent(props) {
    const [message, setMessage] = useState(undefined);
    console.log('응답받은 메세지', message)
    useEffect(() => {
        props.mainStreamManager.stream.session.on('signal:topic', (event) => {
            const data = JSON.parse(event.data);
            const topicData = props.topicList.find(item => item.topicId === data.message);
            console.log(topicData)
            setMessage(() => (topicData.topicConent))
        })
    }, [])

    useEffect(() => {
        sendMessage(props.topic);
    }, [props.topic])


    const sendMessage = (message) => {
        const data = {
            message: message.topicId
        }
        props.mainStreamManager.stream.session.signal({
            data: JSON.stringify(data),
            to: [],
            type: 'topic',
        })
        .then(() => {
            console.log('메세지가 성공적으로 보내졌습니다.')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div className={style['report-modal-content']}>
                <h1>주제에 대해 자유롭게 이야기해보세요</h1>
                <button className={style['report-modal-close']} onClick={props.closeTopicModal}>close</button>
                <h2>{message}</h2>
            </div>
        </>
    )

}

export default TopicModalComponent;