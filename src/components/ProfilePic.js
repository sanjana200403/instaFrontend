import React, { useEffect, useRef, useState } from 'react'

const ProfilePic = ({changeprofile}) => {
    const [image,setImage] = useState()
    const [url,setUrl] = useState()
    const hiddenFileInput  = useRef(null)
 // ==== FUNCTION FOR POST PIC ====== 
const postPic = ()=>{
    console.log(url)
 
        //============== TO POST DATA IN BACEND ==========
      fetch("https://instaclone-ball.onrender.com/uploadProfilePic",{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwtInsta")
        },
        body:JSON.stringify({
           pic: url,
        
        })
        }).then(res=>res.json())
        .then(data=>{
            console.log(url + "url pic")
          console.log(data)
          changeprofile()
          window.location.reload()
        //   if(data.error){
        //     notifyA(data.error)
        //   }else{
        //     notifyB("Successfully Posted")
        //     navigate("/")
        //   }
        
        })
        .catch(err=>console.log(err,"error in posting"))
 
    

}

//==== FUNCTION FOR HANDLE CLICK ====
const handleClick = ()=>{
hiddenFileInput.current.click()

}
//===== function for upload image on cloudinary ====


const postDetails = ()=>{
    console.log(image)
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","dzou03k4g")
    // ====MAKE THE IMAGE URL=====

  fetch("https://api.cloudinary.com/v1_1/dzou03k4g/image/upload",{
    method:"post",
    body:data
  }).then(res=>res.json()).then((data)=>setUrl(data.url)).catch((error)=>console.log(error,"error in uploading"))


  

   }
useEffect(()=>{
    if(image){

        postDetails()
    }
},[image])
useEffect(()=>{
    if(url){
        postPic()

    }
},[url])

  return (
    <div className='profilePic darkBg'>
      <div className="changePic centered">
        <div>
            <h2>Change Profile Photo</h2>
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
            <button 
            onClick={handleClick}
            className='upload-btn' style={{
                color:"#1EA1F7"
            }}>Upload Photo</button>
            <input type="file" 
            onChange={(e)=>{
               setImage(e.target.files[0])
            }}
            ref={hiddenFileInput}
            accept='image/*' style={{display:"none"}} />
        </div>
        <div style={{borderTop:"1px solid #00000030"}} >
           <button className='upload-btn'
           onClick={()=>{
            console.log(url)
            setUrl("https://cdn-icons-png.freepik.com/512/3177/3177440.png")
            postPic()
           }}
           style={{
            color:"#ED4956",
           
           }}
           >Remove Current Photo</button> 
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
           <button
           onClick={()=>changeprofile()}
           className=''style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px"}}> Cancel</button> 
        </div>

      </div>

    </div>
  )
}

export default ProfilePic
