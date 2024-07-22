import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import{login as authLogin} from '../store/authSlice';
import{useDispatch} from 'react-redux';
import{Button,Input,Logo} from './index';
import authService from "../appwrite/auth";
import {useForm} from 'react-hook-form';

function Login(){
    const[error, setError]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const{register,handleSubmit}=useForm()

    const login=async(data)=>{
        setError('')
        try{
        const session=await authService.login(data)
        if(session){
            const userData=await authService.getCurrentUser()
            if(userData){
                dispatch(authLogin(userData));
                navigate('/')
            }
        }
        }catch(error){
            setError(error.message)
        }
    }
    return(
        <>
        <div className="flex items-center justify-center w-full">
           <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
           <div className="mb-2 flex justify-center ">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%"/>
                    
            </span>

           </div>
                 <h2 className="text-center text-2xl font-bold leading-tight ">
                    Signin to your account

                 </h2>
                 <p className="mt-2 text-center text-base text-black/60 ">
                      Don&apos;t have any account ? &nbsp;
                      <Link to='/signup'
                      className="font-medium text-primary transition-all duration-200 hover:underline"
                      >Signup</Link> 
                      </p>
                  {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                  <form onSubmit={handleSubmit(login)}
                  className="mt-8">
                    <div className="space-y-5">

                        <Input
                        label='Email:'
                         type='email'
                         placeholder='Enter a email'
                         {...register('email',{
                            required:true,
                         })}
                        />
                      <Input 
                      label='Password'
                      type='password'
                      placeholder='Enter a password'
                      {...register('password',{
                        required:true,
                      })}
                      />

                      <Button type='submit'
                      className='w-full'
                      >signin</Button>
                    </div>

                  </form>
                     
           </div>
        </div>
        </>
    )
}
export default Login