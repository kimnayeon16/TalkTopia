import {useSelector} from "react-redux";

function IsTokenValid(){
    //accessToken
    const accessToken = useSelector((state) => {return state.userInfo.accessToken});
    //accessToken dead 시간
    const expiredDate = useSelector((state) => {return state.userInfo.expiredDate});
    console.log("accessToken: ", accessToken);
    console.log("server expiredDate: ", expiredDate);

    //현재 시간 UTC
    const currentTime = new Date();
    const utcTimeString = currentTime.toISOString();
    console.log("current time: ", utcTimeString);

    //30초 이하로 남으면 재요청 날릴 것이기 때문에
    //30초를 더한 값을 현재 시간이라고 가정
    const deadDate = new Date(currentTime.getTime() + 5 * 60 * 1000).toISOString();
    console.log("30초 뒤 시간: ", deadDate);

    //accesToken dead 시간, 현재시간(+30초) 비교하기
    const expiredDateTime = new Date(expiredDate);
    const deadDateTime = new Date(deadDate);
    console.log("server 시간: ", expiredDateTime);
    console.log("현재 시간: ", deadDateTime);

    if(deadDateTime < expiredDateTime){
        //아직 시간이 남아있다면 true 리턴
        return true;
    }else{
        //시간이 남아있지 않다면 false 리턴
        return false;
    }
}

export default IsTokenValid;