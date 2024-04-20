import React from 'react'
import '../css/PostDetail.css'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'



const PostDetail = ({item,toggleDetails}) => {
  const [comment,setComment] = useState("")
  const [data,setData] = useState([])
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
 // ========= FUNCTION FOR COMMENT ON A POST ===
 const makeComment = (text,id)=>{
  console.log(comment,"comment input")
  fetch("https://instaclone-ball.onrender.com/comment",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+ localStorage.getItem("jwtInsta")
    },
    body:JSON.stringify({
      text:text,
      postId:id
    })
  }).then((res)=>res.json())
  .then((result)=>{
    const newData = data.map((posts)=>{
      if(posts._id == result._id ){
        console.log("match",result)
        return result
      }else{
        console.log("post match",posts)
        return posts
      }
    })
    setData(newData)
     setComment("")
     notifyB("Commented posted")
     window.location.reload()
    console.log(result,"ALL COMMENT DATA!!")
    })
  .catch((err)=>console.log(err))

  }
// === FUNCTION FOR REMOVE POST========
const removePost = (postId)=>{
  if(window.confirm("do you really want to delete the post")){


  fetch(`https://instaclone-ball.onrender.com/deletePost/${postId}`,{
    method:"delete",
   
      headers:{
    "Authorization":"Bearer "+ localStorage.getItem("jwtInsta")
    
    },
  }).then((res)=>res.json()).then((result)=>{
  
    console.log(result,"DELETE POST SUCCESFULLY")
   
    navigate('/')
    notifyB("Post deleted successfully")
    toggleDetails()
  }).catch(err=>{
console.log("ERROR IN DELETING POST",err)
  })
}

}

  return (
    <div className="showComment">
    <div className="container">
      {/* == post pic == */}
      <div className="postPic">
        <img src={item?.photo} alt="" />
          </div>
      {/* ==details=== */}
        <div className="details">
          {/* card header */}
   <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
    <div className="card-pic">
      <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjExMjAtZWxlbWVudC0xOS5wbmc.png" alt="" />
    </div>
    <h5>{item?.postedBy?.name}</h5>
    <div className="deletePost" 
    onClick={()=>{
      removePost(item._id)
    }}>
       {console.log(JSON.parse(localStorage.getItem('userInsta'))._id ,"userid in detail")}
       {console.log(  item.postedBy._id,"posterid")}
      {
       
        item.postedBy._id == (JSON.parse(localStorage.getItem('userInsta'))._id) ? ( <span className='material-symbols-outlined'>delete</span>):""
      }
      {/* <span className='material-symbols-outlined'>delete</span> */}
    </div>

   </div>
   {/* comment section */}
   <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>
   
   {
     item?.comments?.map((comment)=>{
       return(
         <p className='comm'>
   <span className="commenter" style={{fontWeight:'bolder'}}>{comment?.postedBy.name}</span>
   <span className='commentText'>{" "}{comment.comment}</span>
   </p>
   
       )
     })
   }
   
   {/*  */}
   
   </div>
    {/* card content */}
    <div className="card-content">
    {/* LIKE AND UNLIKE FUNCTIONALITY */}
    
   
   
   <p>{item?.likes?.length} Likes</p>
   <p>{item?.body}</p>
   </div>
   {/* comment */}
   <div className="add-comment">
   <span className="material-symbols-outlined">mood
   </span>
   <input type="text" 
   placeholder='Add a comment'
   value={comment}
   onChange={(e)=>setComment(e.target.value)}
   />
   <button className='comment'
   onClick={()=>
   {
     makeComment(comment,item._id)
     toggleDetails()
     }}
   >Post</button>
   </div>
   
        </div>
    
   
    </div>
    <div className="close-comment"
     onClick={()=>{
     toggleDetails()
     
     }}>
      <span className='material-symbols-outlined material-symbols-outlined-comment'>close</span>
    </div>
   </div>
  )
}

export default PostDetail
