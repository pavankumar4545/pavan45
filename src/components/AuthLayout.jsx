import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import{useSelector} from 'react-redux';

export default function Protected({children,authentication=true}){
    const[loader,setLoader]=useState()
    const navigate=useNavigate()

    const authStatus=useSelector(state=>state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus!==authentication){
                  navigate('/login')
        }
        else if(!authentication && authStatus !==authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,authentication,navigate])

return loader? <h1>Loading...</h1>:<>{children}</>

}