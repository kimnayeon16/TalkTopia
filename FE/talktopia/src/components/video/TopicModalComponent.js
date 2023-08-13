import { useEffect, useState } from 'react';
import style from './TopicModalComponent.module.css'

function TopicModalComponent(props) {
    const [message, setMessage] = useState(undefined);
    const [isTopicModal, setIsTopicModal] = useState(false)
    const [topicIdx, setTopicIdx] = useState(0)
    console.log('응답받은 메세지', message)

    useEffect(() => {
        props.mainStreamManager.stream.session.on('signal:topic', (event) => {
            const data = JSON.parse(event.data);
            const topicData = props.topicList.find(item => item.topicId === data.message);
            console.log(topicData)
            setMessage((prev) => (topicData.topicConent))
            setIsTopicModal(true)
        })
    }, [])

    useEffect(() => {
        if (topicIdx === 0) {
            
            setTopicIdx((prev)=>(prev+1))
        } else {
            sendMessage(topicIdx);
            setTopicIdx((prev)=>(prev+1))
        }
    }, [props.isTopic])


    const sendMessage = (Idx) => {
        const newIdx = Idx % props.topicList.length
        const data = {
            message: props.topicList[newIdx].topicId
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
    };

    const closeTopicModal = () => {
        setIsTopicModal(false)
    }

    const preventCloseTopicModal = (e) => {
        e.stopPropagation();
    }

    return (
        <>
            {isTopicModal ? (
                <div className={style['report-modal-window']} onClick={closeTopicModal}>
                    <div className={style['report-modal-content']} onClick={preventCloseTopicModal}>
                        <h1>주제에 대해 자유롭게 이야기해보세요</h1>
                        <button className={style['report-modal-close']} onClick={closeTopicModal}>close</button>
                        <h2>{message}</h2>
                    </div>
                </div>
            ) : null}
        </>
    )

}

export default TopicModalComponent;