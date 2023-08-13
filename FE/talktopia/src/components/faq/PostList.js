import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Link 컴포넌트 추가
import axios from 'axios';
import style from './PostList.module.css'; // 스타일 파일을 import
import { BACKEND_URL } from '../../utils';

function PostList() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);

    const fetchData = async () => {
      try {
        await axios.get(`${BACKEND_URL}/api/v1/ask/enter?userId=${userInfo.userId}`,{
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.accessToken}`
          }
        })
        .then((response) => {
          console.log("성공");
          console.log(response);
          setData(response.data);
        })
        .catch((error) => { 
          console.log("실패", error);
        })

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
      <div>
        <ul className={`${style.ul}`}>
          <div className={`${style.li}`}> 번호 &nbsp;&nbsp;&nbsp;&nbsp; 제목 </div>
        </ul>
        <ul className={`${style.ul}`}>
          {data.map((item,i) => (
            <li className={`${style.li}`} key={item.postNo} onClick={()=>{navigate(`/post/${item.postNo}`)}}>
              <span>{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{item.postTitle}</span>
            </li>
          ))}
        </ul>
      </div>
  );
}

export default PostList;
