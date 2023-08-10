import { useCallback, useState } from 'react'
import style from './InviteModalComponent.module.css'



function InviteModalComponent(props) {
    const checkBoxList = props.inviteFriendsList

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
        // props.closeInviteModal();
    }, [checkedList]);

    return (
        <>
            <div className={style['report-modal-content']}>
                <h1>친구 목록</h1>
                <button className={style['report-modal-close']} onClick={props.closeInviteModal}>close</button>
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

                    <button type='submit'>초대하기</button>
                </form>
            </div>
        </>
    )
};

export default InviteModalComponent