import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import { Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'



const Home = () => {
  var picLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5xOqrU8FSzOWqq0PdYzn793sx4d33qcOXZtt-oEdZA&s"
  const [loadig,setLoading] = useState(false)
  const [data,setData] = useState([])
  const [comment,setComment] = useState("")
const [show,setShow] = useState(false)
const [item ,setItem] = useState([])
let limit = 10
let skip = 0


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


  // === useEffect====
  useEffect(()=>{
    const token = localStorage.getItem("jwtInsta")
    if(!token){
navigate("/signin")
}
fetchPosts()
window.addEventListener("scroll",handleScroll)
return ()=>{
  window.removeEventListener("scroll",handleScroll)
}

  },[])
const handleScroll = ()=>{
  if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
    skip = skip +10
    fetchPosts()
  }

}

  // ======fetching all the posts=====

const fetchPosts =()=>{
 
  fetch(`https://instaclone-ball.onrender.com/allposts?limit=${limit}&skip=${skip}`,{
  headers:{
   
    "Authorization":"Bearer "+ localStorage.getItem("jwtInsta")
  }
}).then((res)=>res.json())
.then((result)=>{
 
   setData((data)=>[...data,...result])
  console.log(result,"ALL POSTS DATA!!")
  })
.catch((err)=>console.log(err))
}

  // =========to show and hide comments======
  const toggleComment = (posts)=>{
    if(show){
      setShow(false)
    }else{
      setItem(posts)
      console.log("Comments!!",posts)
      setItem(posts)
      setShow(true)
    }
  }
  // ====== FUNCTION FOR LIKE POST ======
const likePost = (id)=>{
fetch("https://instaclone-ball.onrender.com/like",{
  method:"put",
  headers:{
    "Content-Type":"application/json",
    Authorization:"Bearer "+ localStorage.getItem("jwtInsta")
  },
  body:JSON.stringify({
    postId:id
  })
}).then((res)=>res.json()).then((result)=>{
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
  console.log("LIKE POST RESULT",result)
}).catch((err)=>console.log("ERROR IN LIKING",err))
}
// ========== FUNCTION FOR UNLIKE POST =====
const unlikePost = (id)=>{
  fetch("https://instaclone-ball.onrender.com/unlike",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+ localStorage.getItem("jwtInsta")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then((res)=>res.json()).then((result)=>{
    const newData = data.map((posts)=>{
      if(posts._id == result._id ){
        return result
      }else{
        return posts
      }
    })
    setData(newData)
    console.log(result,"UNLIKE POST RESULT")
  }).catch((err)=>console.log(err,"ERROR IN UNLIKE POST"))
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
      console.log(result,"ALL COMMENT DATA!!")
      })
    .catch((err)=>console.log(err))

    }
   
  return (
    <div className='home'>
      {data?.map((data)=>{
        return(
         
          
      <div className="card">
        {/* card header */}
        <div className="card-header">
          <div className="card-pic">
            <img src={(data?.postedBy?.Photo)? (data?.postedBy?.Photo):picLink} alt="" />
          </div>
         
          <h5>
          <Link to={`/profile/${data.postedBy._id}`}>{data?.postedBy?.name}
          </Link>
          </h5>
        </div>
        {/* main content */}
        <div className="card-image">
          <img src={data?.photo} alt="" />
        </div>
        {/* card content */}
        <div className="card-content">
          {/* LIKE AND UNLIKE FUNCTIONALITY */}
          {/* {  console.log(data?.likes?.includes(JSON.parse(localStorage.getItem('userInsta'))._id)) } */}
          {
          
             data?.likes?.includes(JSON.parse(localStorage.getItem('userInsta'))._id) ?  <span onClick={()=>unlikePost(data._id)} className="material-symbols-outlined  material-symbols-outlined-red">
             favorite</span>:  <span 
        onClick={()=>likePost(data._id)}
        className="material-symbols-outlined">
        favorite</span>
          }
       
      
        <p>{data?.likes.length} Likes</p>
        <p>{data?.body}</p>
        <p 
        onClick={()=>toggleComment(data)}
        style={{fontWeight:"bold",cursor:"pointer"}}>View all comments</p>
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
onClick={()=>{
  makeComment(comment,data._id)
}}
>Post</button>
        </div>

      </div>
        
        )
      })}

      {/*============== SHOW COMMENTS============= */}
{show && 
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
 <h5>{item?.postedBy.name}</h5>
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
  toggleComment()
  }}
>Post</button>
</div>

     </div>
 

 </div>
 <div className="close-comment"
  onClick={()=>{
  toggleComment()
  
  }}>
   <span className='material-symbols-outlined material-symbols-outlined-comment'>close</span>
 </div>
</div>
}
        
     
      
    </div>
  )
}

export default Home
