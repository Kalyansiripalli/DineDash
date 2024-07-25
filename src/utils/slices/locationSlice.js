import { createSlice } from "@reduxjs/toolkit";

const locationSlice=createSlice({
    name:"location",
    initialState:{
        cityName:"Hyderabad",
        secondaryAddress:"Telangana, India",
        lat:"17.360589",
        lng:"78.4740613"
    },
    reducers:{
        slelectCity:(state,action)=>{
            state.cityName=action.payload.cityName;
            state.secondaryAddress=action.payload.secondaryAddress;
            state.lat=action.payload.lat;
            state.lng=action.payload.lng;
            
        }
    }
})

export const {slelectCity}=locationSlice.actions;
export default locationSlice.reducer;