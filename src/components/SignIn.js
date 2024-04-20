import React, { useContext, useState } from 'react'
import '../css/Sign.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { LoginContext } from '../context/LoginContext'

const SignIn = () => {
    const {setUserLogin} = useContext(LoginContext)
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const navigate = useNavigate()
    // context api variable


    // ===== regex syntax for checking email ===
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


      //===== Toast function ====
    // ṭoast function for error
    const notifyA  = (msg)=>{
        toast.error(msg)
    }
    // toast function for success
    const notifyB = (msg)=>{
        toast.success(msg)
    }

    // ==========to post data in backend for signin=======
    
    const postData = ()=>{
        // checking email
        if(!emailRegex.test(email)){
            console.log("email is not valid")
            notifyA("Please enter valid email")
            return

        }

        console.log({email,password},"SIGNIN DATA!!!")


 //====sending data to the server====

        fetch("https://instaclone-ball.onrender.com/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
     //===== to send the data in the json formate======
            body:JSON.stringify({
              
                email:email,
                password:password
            })
        }).then((res)=>res.json()).then(data=>{
            if(data.error){
                notifyA(data.error)
            }else{
                notifyB("Signed In Successfully")

                console.log(data,"Token!!")
                localStorage.setItem("jwtInsta",data.token)
                localStorage.setItem("userInsta",JSON.stringify(data.user))
                setUserLogin(true)
                navigate('/')
                

            }
           
            console.log(data)})


    }


    
  return (
    <div className='signIn'>
        <div>
            <div className="loginForm">
                <img 
                className='signUpLogo'
                src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png" alt="" />
                <div>
                <input type="email" name='email'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder='Email'
                id='email' />
                </div>
                <div>
                    <input 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    type="password"name='password' id='password' placeholder='password' />
                </div>
                <input type="submit"
                id='login-btn'
                value="Sign In" 
                onClick={()=>postData()}
                />


            </div>
<div className="loginForm2">
    Don't have an account ?
    <Link to="/signup">
        
    <span style={{color:"blue", cursor:"pointer"}}>Sign Up</span>
    </Link>
</div>

        </div>

      
    </div>
  )
}

export default SignIn
