import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import style from './SearchFind.module.css'
import AddFriendButton from '../../components/search/AddFriendButton' // 추가된 부분
import useTokenValidation from '../../utils/useTokenValidation';

function FriendSearch(searchVisible, onShowSearchFind) {
  useTokenValidation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchNickname, setSearchNickname] = useState('');
  const [searchType, setSearchType] = useState('ID'); // 초기값으로 'ID' 설정
  const [searchResults, setSearchResults] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(''); // 선택된 언어
  const languageOptions = [ // 언어 옵션들을 배열로 정의
  '한국어', '독일어', '러시아어', '스페인어', '영어',
  '이탈리아어', '인도네시아어', '일본어', '중국어_간체',
   '중국어_번체', '태국어', '포르투갈어', '프랑스어'
];



const [modal, setModal] = useState(searchVisible);

// setModal(searchVisible);
  const fetchUserResults = async () => {
    if (searchNickname.trim() === '' && searchType!=='LANG') {
      // 입력값이 비어있다면 요청하지 않음
      setSearchResults([]);
      return;
    }
  
    try {
      const response = await axios.post(
        'https://talktopia.site:10001/api/v1/friend/findUserId',
        {
          search: searchNickname,
          findType: searchType,
          userId: "talktopia1",
          language: selectedLanguage
        }
      );
      console.log(searchNickname);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // 검색어 또는 검색 타입 변경 시에 fetchUserResults 함수 호출
  useEffect(() => {
    fetchUserResults();
  }, [searchNickname, searchType,selectedLanguage]);

  const handleInputChange = (e) => {
    setSearchNickname(e.target.value);
    // 백스페이스를 눌렀을 때 요청하지 않음
    if (e.target.value === '') {
      setSearchResults([]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchNickname('');
    setSearchResults([]);
  };
  const addFriend = (userId) => {
    // 친구 추가 로직을 구현해야 함
    console.log(`친구 추가 버튼 클릭: userId=${userId}`);
  };
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); // 선택된 언어 업데이트
  };
  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <p>검색 결과에 매칭되는 유저가 없습니다.</p>;
    }
};

useEffect(()=>{
  setModal(searchVisible);
},[])

const modalChange = () => {
  setModal(!modal);
  onShowSearchFind(false);
}

  return (
    <>

    {modal &&
    <div className={`${style.janjan}`}>
        <div>
          <h2 className={`${style.modaltitle}`}>사용자 검색</h2>
          <img src="/img/main/out.png" alt="" onClick={modalChange} className={`${style.out}`}/>
        </div>
        <div className={`${style.button1}`}>
          <button className={`${style["button-change"]}`} onClick={() => setSearchType('ID')}>아이디로 검색</button>
          <button className={`${style["button-change"]}`} onClick={() => setSearchType('EMAIL')}>이메일로 검색</button>
          <button className={`${style["button-change"]}`} onClick={() => setSearchType('LANG')}>언어로 검색</button>
        </div>
        <div className={`${style["button-input"]}`}>
            {
              searchType === 'LANG' && ( // 언어 검색일 때만 드롭다운 메뉴 표시
              <select className={`${style.iSelect}`} value={selectedLanguage} onChange={handleLanguageChange}>
                <option value=''>언어 선택</option>
                {languageOptions.map((language, index) => (
                  <option key={index} value={language}>{language}</option>
                ))}
              </select>
            )}
            {
            searchType !== 'LANG' && ( // 언어 검색이 아닐 때는 입력 창 표시
              <input
                type="text"
                value={searchNickname}
                onChange={handleInputChange}
                placeholder={searchType === 'ID' ? '아이디를 입력하세요' : '이메일을 입력하세요'}
                className={`${style.iInput}`}
              />
            )}
        </div>
        <div className={`${style["search-resultss"]}`}>
          <h2 className={`${style.modaltitle1}`}>검색 결과</h2>
          <div className={`${style.container}`}>
            <div className={`${style.container1}`}>
              <div className={`${style.image}`}>img</div>
              <div className={`${style.idd}`}>idd</div>
              <div className={`${style.name}`}>name</div>
              <div className={`${style.language}`}>language</div>
              <div className={`${style.status}`}>status</div>
              <div className={`${style.add}`}>add</div>
            </div>
            <div className={`${style.container2}`}>
              <div className={`${style.container3}`}>
                {
                searchResults.length > 0 ? (
                  <div className={`${style["table-container"]}`}>
                    {searchResults.map((user, index) => (
                      <div className={`${style.row}`} key={index}>
                        <div className={`${style.image1}`}>
                          <img src={user.userImg} alt={`프로필 이미지 ${user.userImg}`} className={`${style["img-small"]}`}/>
                        </div>
                        <div className={`${style.idd1}`}>{user.userId}</div>
                        <div className={`${style.name1}`}>{user.userName}</div>
                        <div className={`${style.language1}`}>{user.userLng}</div>
                        <div className={`${style.status1}`}>{user.userStatus}</div>
                        <div className={`${style.add1}`}>
                          <AddFriendButton userId="talktopia1" friendId={user.userId} />    
                        </div>
                      </div>
                    ))}
                  </div>) 
                  : 
                  (
                    <p className={`${style["no-results-message"]}`}>검색 결과에 일치하는 사용자가 없습니다.</p>
                  )
                }
              </div>
            </div>
          </div>
        </div>
    </div>
    }
    </>
  );
}
export default FriendSearch;