import {createSlice} from "@reduxjs/toolkit"

const UserReducer=createSlice({
    name:"User",
    initialState:{
        User:null,
        Uid:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.User=action.payload;
        },
        addUid:(state,action)=>{
            state.Uid=action.payload;
        },
    }
})

export const { addUser,addUid } = UserReducer.actions;
export default UserReducer.reducer;