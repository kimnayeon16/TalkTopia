import { configureStore, createSlice } from '@reduxjs/toolkit'

let userInfo = createSlice({
    name : 'userInfo',
    initialState : {
        userId: '',
        accessToken: '',
        expiredDate: '',
        
    },
    reducers: {
        reduxUserInfo(state, action){
            const {userId, accessToken, expiredDate} = action.payload;
            state.userId = userId;
            state.accessToken = accessToken;
            state.expiredDate = expiredDate;
        }
    }
})


export let { reduxUserInfo } = userInfo.actions;

export default configureStore({
  reducer: {
    userInfo: userInfo.reducer,

   }
})