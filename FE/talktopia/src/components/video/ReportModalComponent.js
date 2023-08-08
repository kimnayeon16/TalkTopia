import { useCallback, useState } from 'react'
import style from './ReportModalComponent.module.css'


const checkBoxList = ['혐오발언', '성희롱', '인종차별', '기타']

function ReportModalComponent(props) {

    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

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
    }

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('checkdList: ', checkedList)
    }, [checkedList]);

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

                    <button type='submit'>신고하기</button>
                </form>
            </div>
        </>
    )
};

export default ReportModalComponent