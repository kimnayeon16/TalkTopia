import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import style from './PostDetail.module.css'; 
import { BACKEND_URL } from '../../utils';
import Swal from 'sweetalert2';
import { reduxUserInfo } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../../nav/Nav';


function PostDetail() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  const [userId, setUserId] = useState("");
  const [userAccessToken, setUserAccessToken] = useState("");

  const { postNo } = useParams();

  const [detailedPost, setDetailedPost] = useState(null);
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태

  // const [userInfo, setUserInfo] = useState("");
  const [itsme, setItsme] = useState([]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    setUserId(userInfo.userId);
    setUserAccessToken(userInfo.userAccessToken);
    setItsme(userInfo)
    console.log(itsme)
    console.log("ㅇ 앰어리ㅏ머라엚알 너 여기 오낭 모라ㅣ ?")
    dispatch(reduxUserInfo(userInfo));
}, []);



  useEffect(() => {
    fetchData();
  }, [postNo]);

  
  const fetchData = async () => {
    const userInfoString = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);

    console.log(`${BACKEND_URL}/api/v1/ask/list/detail?userId=${userInfo.userId}&postNo=${postNo}`)
    try {
      await axios
      .get(`${BACKEND_URL}/api/v1/ask/list/detail?userId=${userInfo.userId}&postNo=${postNo}`,{
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.accessToken}`
        }
      })
      .then((response) => {
        console.log(response);
        setDetailedPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.error('에러', error);
    }
  };


  const handleCommentSubmit = async () => {
    const userInfoString = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/comment/answer`,
        {
          userId: userInfo.userId,
          postNo: postNo,
          contentContent: newComment
        },
        {
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.accessToken}`
          }
        }
      ).then((response) =>{
        setNewComment(""); // 새로운 댓글 입력 상태 초기화
        Swal.fire({
          icon: "success",
          title: "댓글이 등록되었습니다.",
          confirmButtonText: "확인",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: '#90dbf4',
        })
        fetchData(); // 새로운 댓글을 등록한 후에 데이터를 다시 가져옴

      }).catch((error) => {
        console.log(error.response.data.message);
        const message = error.response.data.message
        Swal.fire({
          icon: "error",
          title: message,
          confirmButtonText: "확인",
          confirmButtonColor: '#90dbf4',
        })
        console.log("댓글 등록 실패");
      })
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleDeleteButtonClick = () => {
    Swal.fire({
      icon: "warning",
      title: "게시글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      timer: 2000,
      confirmButtonColor: '#90dbf4',
      cancelButtonColor: '#ec1c57',
    }).then((result) => {
      const userInfoString = localStorage.getItem("UserInfo");
      const userInfo = JSON.parse(userInfoString);

      if (result.isConfirmed) {
        const handleDeleteConfirm = async () => {
          try {
            await axios.get(
              `${BACKEND_URL}/api/v1/ask/list/delete?userId=${userInfo.userId}&postNo=${postNo}`,
              {
                headers : {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userInfo.accessToken}`
                }
              }
            ).then((response) => {
              Swal.fire({
                icon: "success",
                title: "게시글이 성공적으로 삭제되었습니다.",
                confirmButtonText: "확인",
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: '#90dbf4',
              }).then((result) =>{
                // if(result.isConfirmed){
                  navigate('/counsel');
                // }
              })

            }).catch((error) => {
              console.log("삭제 실패")
            })
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        };
        handleDeleteConfirm();
      }
    })
  };



  if (!detailedPost) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${style.background1}`}>
      <Nav/>
        <div className={`${style.container1}`}>
          <h2 className={`${style.question}`}>질문</h2>
            <div className={`${style.box1}`}>
              <div className={`${style.header}`}>
                <h2 className={`${style.h2}`}>{detailedPost.postTitle}</h2>
                <p className={`${style["post-content"]}`}>{detailedPost.postContent}</p>
              </div>
            </div>
            <button className={`${style["delete-button"]}`} onClick={handleDeleteButtonClick}>게시글 삭제</button>
        </div>

        <div className={`${style.container2}`}>
          <h2 className={`${style.question}`}>답변</h2>
          <div className={`${style.box1}`}>
            <div className={`${style["answer-posts"]}`}>
                <ul>
                  {detailedPost.answerPosts.map((answerPost, index) => (
                      <li className={`${style.li}`} key={index}>
                        <span className={`${style.answer1}`}>답변 {index + 1}</span>
                        <p className={`${style.answer}`}>{answerPost.contentContent}</p>
                      </li>
                  ))}
                </ul>
            </div>
          </div>
            <div className={`${style["comment-section-container"]}`}>
                  <div className={`${style["comment-section"]}`}>
                      <input className={`${style["comment-input"]}`} type="text" placeholder="댓글을 입력하세요" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                      <button className={`${style["comment-button"]}`} onClick={handleCommentSubmit}>등록</button>
                  </div>
              </div>
        </div>
        <img className={`${style.grass1}`} src="/img/grass/grass2.png" alt=""></img>
            <img className={`${style.grass5}`} src="/img/grass/grass5.png" alt=""></img>
            <img className={`${style.fish7}`} src="/img/fish/fish7.png" alt=""></img>
            <img className={`${style.fish6}`} src="/img/fish/fish6.png" alt=""></img>
            <img className={`${style.bubble1}`} src="/img/bubble/bubble1.png" alt=""></img>
            <img className={`${style.bubble2}`} src="/img/bubble/bubble2.png" alt=""></img>
            <img className={`${style.bubble3}`} src="/img/bubble/bubble3.png" alt=""></img>
    </div>
  );
}

export default PostDetail;
