import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import style from './PostForm.module.css'; // 스타일 파일을 import
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utils';

import Nav from '../../nav/Nav';
import { reduxUserInfo } from '../../store';

function PostForm() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const userInfoString = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    setUserId(userInfo.userId);
    setAccessToken(userInfo.accessToken);
    dispatch(reduxUserInfo(userInfo));
  },[])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  } 


  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if(postTitle.length === 0){
      Swal.fire({
        icon: "warnging",
        title: "제목을 입력해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: '#90dbf4',
        timer: 2000,
        timerProgressBar: true,
      })
    }else if(postContent.length === 0){
      Swal.fire({
        icon: "warnging",
        title: "문의 내용을 입력해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: '#90dbf4',
        timer: 2000,
        timerProgressBar: true,
      })
    }else{

      const userInfoString = localStorage.getItem("UserInfo");
      const userInfo = JSON.parse(userInfoString);

      const postData = {
        postTitle: postTitle,
        postContent: postContent,
        userId: userInfo.userId
      };
  
      const requestBodyJSON = JSON.stringify(postData);
  
      console.log(requestBodyJSON);

      try {
        axios.post(`${BACKEND_URL}/api/v1/ask/register`, requestBodyJSON, { headers })
        .then((response)=>{
          console.log(response.data.message);
          Swal.fire({
            icon: "success",
            title: "문의가 등록되었습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: '#90dbf4',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate('/counsel');
          });
        })
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    
    Swal.fire({
      icon: "success",
      title: "취소하시겠습니까?",
      text: "작성 내용은 저장되지 않습니다.",
      showCancelButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: '#f32f70',
      cancelButtonText: "취소",
      reverseButtons: true, 
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/counsel');
      }
    });
  }

//   const onCheckEnter = (e) => {
//     e.preventDefault();
//     if(e.key === 'Enter') {
//       handleSubmit();
//     }
// }


  return (
    <div className={`${style.background}`}>
      <Nav/>
      <h2 className={`${style.title}`}>문의하기</h2>
      <form className={`${style.form}`}>
        <p className={`${style.name}`}>제목</p>
        <input className={`${style.input}`} type="text" placeholder="제목을 입력해주세요." value={postTitle} onChange={e => setPostTitle(e.target.value)} />
        <p className={`${style.name1}`}>문의 내용</p>
        <textarea className={`${style.textarea}`}
          placeholder="문의 내용을 입력해주세요."
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
        <div className={`${style.buttonGroup}`}>
          <button className={`${style.button}`} onClick={cancel}>취소</button>
          <button className={`${style.button}`} onClick={handleSubmit}>등록하기</button>
        </div>
      </form>
            <img className={`${style.grass1}`} src="/img/grass/grass2.png" alt=""></img>
            <img className={`${style.grass5}`} src="/img/grass/grass5.png" alt=""></img>
            <img className={`${style.fish1}`} src="/img/fish/fish1.png" alt=""></img>
            <img className={`${style.fish34}`} src="/img/fish/fish34.png" alt=""></img>
            <img className={`${style.bubble1}`} src="/img/bubble/bubble1.png" alt=""></img>
            <img className={`${style.bubble2}`} src="/img/bubble/bubble2.png" alt=""></img>
            <img className={`${style.bubble3}`} src="/img/bubble/bubble3.png" alt=""></img>
    </div>
  );
}

export default PostForm;
