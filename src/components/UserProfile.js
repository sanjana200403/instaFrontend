import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import PostDetail from './PostDetail'

const UserProfile = () => {
  const [loading,setLoading] = useState(false)
  
  var picLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5xOqrU8FSzOWqq0PdYzn793sx4d33qcOXZtt-oEdZA&s"
    const [show,setShow] = useState(false)
    const [post,setPost] = useState([])
    const [user,setUser] = useState("")
     const [item,setItem] = useState()
    const [isFollow,setIsFollow] = useState(false)

    //==== getting id ====
    const {id} = useParams()
    console.log(id ,"USER PROFILE ID")


    // == to show profile details======
    const toggleDetails = (posts)=>{
        if(show){
          setShow(false)
        }
      
       
        else{
          
          console.log("DEAILS!!",posts)
          setItem(posts)
          setShow(true)
        }
      }

      // =====FUNCTION FOR FOLLOW USER ====
      const  followUser = (userId)=>{
         fetch("https://instaclone-ball.onrender.com/follow",{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+ localStorage.getItem("jwtInsta")
          },
          body:JSON.stringify({
            followId:userId
          })
         }).then((res)=>res.json()).then((data)=>{
         
            setIsFollow(true)
             console.log("FOLLOW USER DATA!!",data)
         }).catch((err)=>{
          console.log("ERROR IN FOLLOW " ,err)
         })
      }
         // =====FUNCTION FOR UNFOLLOW USER ====
         const  unfollowUser = (userId)=>{
          fetch("https://instaclone-ball.onrender.com/unfollow",{
           method:"put",
           headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+ localStorage.getItem("jwtInsta")
           },
           body:JSON.stringify({
             followId:userId
           })
          }).then((res)=>res.json()).then((data)=>{
           
            setIsFollow(false)
              console.log("UNFOLLOW USER DATA!!",data)
          }).catch((err)=>{
           console.log("ERROR IN UNFOLLOW " ,err)
          })
       }
  
   
  
    useEffect(()=>{
  setLoading(true)
      // ========FETCHING THE  USER PROFILE DATA========
  fetch(`https://instaclone-ball.onrender.com/user/${id}`,{
    headers:{
      
      "Authorization":"Bearer "+ localStorage.getItem("jwtInsta")
    },
  }).then((res)=>res.json())
  .then((result)=>{
    setLoading(false)
    setPost(result.posts)
    setUser(result.user)
    if(result.user.followers.includes(JSON.parse(localStorage.getItem('userInsta'))._id)){
      setIsFollow(true)
    }
    console.log(result,"PARTICULAR ID DATA!!")})
  .catch((err)=>console.log("ERROR IN FETCHING MYPOST!!!",err))
    },[isFollow])
if(loading){
  return(
    <>
    <h1>Loading...</h1>
    </>
  )
}

  return (
    <div className='profile'>
    {/* profile frame */}
    <div className="profile-frame">
      {/* profile pic */}
      <div className="profile-pic">
        <img 
        
        src={user.Photo ? user.Photo : picLink} alt="" />

      </div>
      {/* profile data */}
      <div className="profile-data">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1>{user?.userName}</h1>
      
      {
        !(user._id  == (JSON.parse(localStorage.getItem('userInsta'))._id)) &&
        <button className='followBtn'
        onClick={()=>
          {
            if(isFollow){
              unfollowUser(user._id)
            }else{
              followUser(user._id)}
            }
          
            
        }

        >
          {isFollow?"Unfollow":"Follow"}
          </button>
      }
       
        </div>
          
        <div className="profile-info" style={{display:'flex'}}>
          <p>{post ? post.length : "0"} posts</p>
          <p>{user.followers ? user.followers.length:"0"} followers</p>
          <p>{user.following ? user.following.length:"0"} following</p>
        </div>


      </div>

    </div>
    <hr style={{width:"90%", opacity:"0.8", margin:"25px auto"}} />
    {/* Gallery */}
    <div className="gallery">
   {/* myposts */}
    {post?.map((pics)=>(
      <img 
      onClick={()=>toggleDetails(pics)}
      key={pics?._id}
      src={pics?.photo}
      alt="" />

    ))}
   
   

    </div>
    {/* profile details */}
    {show &&   <PostDetail toggleDetails={toggleDetails} item={item}  />}
  

    
  </div>
  )
}

export default UserProfile
