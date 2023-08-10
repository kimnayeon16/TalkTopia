import { configureStore, createSlice } from '@reduxjs/toolkit'

let userInfo = createSlice({
    name : 'userInfo',
    initialState : {
        userId: '',
        userName: '',
        accessToken: '',
        expiredDate: '',
        sttLang: '',
        transLang: '',
        fcmToken: '',
    },
    reducers: {
        reduxUserInfo(state, action){
            const {userId, userName, accessToken, expiredDate, sttLang, transLang, fcmToken} = action.payload;
            state.userId = userId;
            state.userName = userName;
            state.accessToken = accessToken;
            state.expiredDate = expiredDate;
            state.sttLang = sttLang;
            state.transLang = transLang;
            state.fcmToken = fcmToken;
        }
    }
})


let findMyInfo = createSlice({
    name : 'findMyInfo',
    initialState : {
        userName: '',
        userEmail: '',
    },
    reducers: {
        reduxFindMyInfo(state, action){
            const {userName, userEmail} = action.payload;
            state.userName = userName;
            state.userEmail = userEmail;
        }
    }
})

export let { reduxUserInfo } = userInfo.actions;
export let { reduxFindMyInfo } = findMyInfo.actions;

export default configureStore({
  reducer: {
    userInfo: userInfo.reducer,
    findMyInfo: findMyInfo.reducer,
   }
})