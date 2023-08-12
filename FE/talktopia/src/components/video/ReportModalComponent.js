import { useCallback, useState } from 'react'
import { useSelector } from "react-redux";
import { BACKEND_URL } from '../../utils';
import axios from 'axios';

import style from './ReportModalComponent.module.css'


const checkBoxList = ['혐오발언', '성희롱', '인종차별', '기타']

function ReportModalComponent(props) {
    const user = useSelector((state) => state.userInfo);


    const [checkedList, setCheckedList] = useState([]);     // 신고 카테고리
    const [isChecked, setIsChecked] = useState(false);
    const [textValue, setTextValue] = useState('')          // 신고 상세 내용

    const checkedItemHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }
    
        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
            return;
        }
        return;
    };

    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);;
    };

    const handleTextChange = (e) => {
        setTextValue(e.target.value);
    };

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('checkdList: ', checkedList)
        console.log('text: ', textValue)

        reportSubmit(checkedList, textValue);
    }, [checkedList, textValue]);

    const reportSubmit = async (category, reportText) => {
        const headers = {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
        
        const requestBody = {
            ruReporter: user.userId,
            ruBully: props.reportUserId,
            ruCategory: category,
            ruBody: reportText,
            vrSession: props.vrSession
        };

        const requestBodyJSON = JSON.stringify(requestBody);
        await axios
        .post(`${BACKEND_URL}/api/v1/manage/report`, requestBodyJSON, {headers})
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log("에러 발생", error);
        })
    };


    return (
        <>
            <div className={style['report-modal-content']}>
                <h1>유저 신고: {props.reportUserId}</h1>
                <button className={style['report-modal-close']} onClick={props.closeReportModal}>close</button>
                <form onSubmit={onSubmit}>
                    {checkBoxList.map((item, idx) => (
                        <div className={style['report-reason-content']} key={idx}>
                            <input 
                                type='checkbox' 
                                id={item}
                                checked={checkedList.includes(item)}
                                onChange={(e) => checkHandler(e, item)}
                            />
                            <label htmlFor={item} >{item}</label>
                        </div>
                    ))}

                    <textarea
                        value={textValue}
                        onChange={handleTextChange}
                        rows={4} // 원하는 줄 수로 설정
                        cols={50} // 원하는 열 수로 설정
                    />

                    <button type='submit'>신고하기</button>
                </form>
            </div>
        </>
    )
};

export default ReportModalComponent