import { useEffect, useState } from "react";
import { resturantMenuURL } from "./constants";
import { useSelector } from "react-redux";

const useFetchResturantMenu=(resturantId)=>{
    const latitude=useSelector((store)=>store.location.lat)
    const longitude=useSelector((store)=>store.location.lng)
    const [resInfo,setResInfo]=useState(null)
    useEffect(()=>{
        fetchResturantMenu()
    },[]);
    const fetchResturantMenu= async ()=>{
        // const res=await fetch(`${resturantMenuURL}lat=${latitude}&lng=${longitude}&restaurantId=${resturantId}`);

        const res=await fetch(`https://dine-dash-server-ten.vercel.app/api/menu?lat=${latitude}&lng=${longitude}&restaurantId=${resturantId}`);
        const json=await res.json();
        setResInfo(json.data);
    }
    return resInfo;
}

export default useFetchResturantMenu;

