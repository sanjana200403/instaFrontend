import React, { useEffect, useState } from 'react'
import '../css/profile.css'
import PostDetail from '../components/PostDetail'
import ProfilePic from '../components/ProfilePic'

const Profile = () => {
  var picLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5xOqrU8FSzOWqq0PdYzn793sx4d33qcOXZtt-oEdZA&s"
  const [pic,setPic] = useState([])
  const [show,setShow] = useState(false)
  const [post,setPost] = useState([])
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState
  ("")
  const [changePic,setChangePic] = useState(false)

  // =========to show and hide comments======
  const toggleDetails = (posts)=>{
    if(show){
      setShow(false)
    }else{
      
      console.log("DEAILS!!",posts)
      setPost(posts)
      setShow(true)
    }
  }
// ==function for change profile====
const changeprofile = ()=>{
  if(changePic){
    setChangePic(false)
  }else{
    setChangePic(true)
  }
}

  useEffect(()=>{
    setLoading(true)

    // ========FETCHING THE MYPOST========
fetch(`https://instaclone-ball.onrender.com/user/${JSON.parse(localStorage.getItem("userInsta"))._id}`,{
  headers:{
    
    "Authorization":"Bearer "+ localStorage.getItem("jwtInsta")
  },
}).then((res)=>res.json())
.then((result)=>{
  setLoading(false)
  setPic(result.posts)
  setUser(result.user)
  console.log(result,"ALLMYPOST DATA!!")})
.catch((err)=>console.log("ERROR IN FETCHING MYPOST!!!",err))
  },[])
  if(loading){
    return(<>
    <h1 style={{textAlign:'center'}}>Loading...</h1>
    </>)
  }
  return (
    <div className='profile'>
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img 
          style={{cursor:"pointer"}}
          onClick={()=>changeprofile()}
          src={user.Photo ? user.Photo : picLink} alt="" />

        </div>
        {/* profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("userInsta")).name}</h1>
          <div className="profile-info" style={{display:'flex'}}>
            <p>{pic?.length} posts</p>
            <p>{user.followers ? user.followers.length:"0"} followers</p>
            <p>{user.following ? user.following.length:"0"} following</p>
          </div>


        </div>

      </div>
      <hr style={{width:"90%", opacity:"0.8", margin:"25px auto"}} />
      {/* Gallery */}
      <div className="gallery">
     {/* myposts */}
      {pic?.map((pics)=>(
        <img 
        onClick={()=>toggleDetails(pics)}
        key={pics?._id}
        src={pics?.photo}
        alt="" />

      ))}
     
     

      </div>
      {/* profile details */}
      {show &&   <PostDetail toggleDetails={toggleDetails} item={post}  />}
    
      {
        changePic && 
        <ProfilePic changeprofile={changeprofile} />
      }
      
    </div>
  )
}

export default Profile
