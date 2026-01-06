import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // the goal of the state is to keep track whether the user is loggedin or not
    status:false,
    userData:null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload //we are sending obj here
        },
        logout:(state)=>{
            state.status=false
        }
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;