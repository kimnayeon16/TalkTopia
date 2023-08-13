import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoChatLogTable from './VideoChatLogTable';

const VideoChatLogView = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // 백엔드에서 데이터 가져오기
        axios.get('https://talktopia.site:10001/api/v1/manage/logList').then(response => {
            setData(response.data);
        });
    }, []);

    return (
        <div>
            <h2>화상채팅방 로그</h2>
            <VideoChatLogTable data={data} />
        </div>
    );
}

export default VideoChatLogView;
