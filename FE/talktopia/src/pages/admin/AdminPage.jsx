import React, { useState } from 'react';
import UserView from './UserView';
import ReporterView from './ReporterView';
import VideoChatLogView from './VideoChatLogView';

const AdminPage = () => {
    const [selectedPage, setSelectedPage] = useState('userView'); // 초기 페이지를 'userView'로 설정

    return (
        <div>
            <h1>Admin Page</h1>
            
            <div>
                <button onClick={() => setSelectedPage('userView')}>유저 보기</button>
                <button onClick={() => setSelectedPage('reporter')}>신고자</button>
                <button onClick={() => setSelectedPage('videoChatLog')}>화상채팅방 로그보기</button>
            </div>

            {selectedPage === 'userView' && <UserView />}
            {selectedPage === 'reporter' && <ReporterView />}
            {selectedPage === 'videoChatLog' && <VideoChatLogView />}
        </div>
    );
}

export default AdminPage;
