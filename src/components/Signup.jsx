import React,{useState} from "react";
import {useDispatch} from 'react-redux'
import { Link,useNavigate } from "react-router-dom";
import{Button,Input,Logo} from './index';
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";

function Signup(){
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()

const signup=async(data)=>{
    setError('')
    try{
        const sessions=await authService.createAccount(data)
        if(sessions){
            const userData=await authService.getCurrentUser(userData)
            if(userData){
                dispatch(login(userData))
                navigate('/')
            }
        }

    } catch(error){
        console.log(error);
        setError(error.message)
    }
}      
return(
    <>
    <div className="flex items-center justify-center ">
        <div className={`max-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center ">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%"/>
                
            </span>

        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">SignUp to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
        Already have an account ? &nbsp;
        <Link to='/login'
        className="font-medium text-primary transition-all duration-200 hover:underline">
        Signin
        </Link>
        </p>
{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                  
             <form onSubmit={handleSubmit(signup)}>
                <div className="space-4">
                    <Input
                    label='Name:'
                    placeholder='Enter a Name'
                    type='name'
                    {...register('name',{
                        required:true
                    })}
                    />
                    <Input
                    label='Email:'
                    placeholder='Enter a Email'
                    type="email"
                    {...register('email',{
                        required:true
                    })}
                    />
                    <Input
                    label='password'
                    placeholder='Enter a password'
                    type='password'
                    {...register('password',{
                        required:true
                    })}
                    />
                    <Button type='submit' className='w-full'>Signup</Button>
                </div>
                </form>     

        </div>
    </div>
    </>
)

}
export default Signup