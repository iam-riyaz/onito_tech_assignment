
import { createSlice, PayloadAction, } from "@reduxjs/toolkit";


export interface User{
    name:string;
    age:number;
    sex:string;
    mobile:string
    idType:string;
    idNumber:string;
    address:string;
    state:string;
    city:string;
    country:string;
    pincode:number;
}

interface IinitialState{
    usersData:User[]
}

const initialState:IinitialState={
    usersData:[]
}

const formSlice= createSlice({
    name:"form",
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<User>)=>{
            state.usersData.push(action.payload)
        }
    }

})

export const {addUser} = formSlice.actions

export default formSlice.reducer;