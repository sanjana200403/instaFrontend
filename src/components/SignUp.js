import React, { useState } from 'react'
import '../css/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"



const SignUp = () => {
    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [userName,setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    //===== Toast function ====
    // ṭoast function for error
    const notifyA  = (msg)=>{
        toast.error(msg)
    }
    // toast function for success
    const notifyB = (msg)=>{
        toast.success(msg)
    }
// ===== regex syntax for checking email ===
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // ==== regex syntax for checking password  ===

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    //==== send data to server ===
    const postData = ()=>{
        // checking email
        if(!emailRegex.test(email)){
            console.log("email is not valid")
            notifyA("Please enter valid email")
            return

        }else if(!passRegex.test(password)){
            notifyA("Password must contain at least 8 characters including at least one number and one includes both lower and upper letters and special character  ")
            return

        }

        console.log({name,email,userName,password},"SIGNUP DATA!!!")


 //====sending data to the server====

        fetch("https://instaclone-ball.onrender.com/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
     //===== to send the data in the json formate======
            body:JSON.stringify({
                name:name,
                userName:userName,
                email:email,
                password:password
            })
        }).then((res)=>res.json()).then(data=>{
            if(data.error){
                notifyA(data.error)
            }else{
                notifyB(data.message)
                navigate('/signin')
                

            }
           
            console.log(data)})


    }

  return (
    <div className='signUp'>
        <div className="form-container">
            <div className="form">
            <img  className="signUpLogo" src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png" alt="" />
            <p className='loginPara'>
                Sign up to see photos and videos <br />
                from your friends
            </p>
            <div>
                <input type="email" name='email' id='email'
                placeholder='Email'
                value={email}
                onChange={(e)=>{

                    setEmail(e.target.value)
                }}
                />
            </div>
            <div>
                <input type="text" name='name' id='name'
                placeholder='Full Name'
                value={name}
                onChange={(e)=>{

                    setName(e.target.value)
                }}
                />
            </div>
            <div>
                <input type="text" name='username' id='username'
                placeholder='Username'
                value={userName}
                onChange={(e)=>{

                    setUserName(e.target.value)
                }}
                />
            </div>
            <div>
                <input type="password" name='password' id='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>{

                    setPassword(e.target.value)
                }}
                />
            </div>
            <p className='loginPara' style={{fontSize:"12px", margin:"3px 0px"}}>
                By signing up, you agree to out Terms privacy policy and cookies policy
            </p>
            <input type="submit" 
            onClick={()=>{
                postData()
            }}
            id='submit-btn'
            value="Sign Up"
            />

            </div>
            <div className="form2">
                Already have an account ?
                <Link to="/signin">
                    <span style={{color:"blue",cursor:"pointer"}}>
                        Sign In

                    </span>
                </Link>

            </div>
           
           


        </div>
      
    </div>
  )
}

export default SignUp
