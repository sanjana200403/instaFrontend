
import React, { useState, useEffect } from "react";
import "../css/CreatePost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    var picLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5xOqrU8FSzOWqq0PdYzn793sx4d33qcOXZtt-oEdZA&s"
    const [body, setBody] = useState("");
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
  
    // Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
  
  
    useEffect(() => {
  
      // saving post to mongodb
      if (url) {
          setLoading(true)
        fetch("https://instaclone-ball.onrender.com/createPost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwtInsta")
          },
          body: JSON.stringify({
            body,
            pic: url
          })
        }).then(res => res.json())
          .then(data => {
            setLoading(false)
            if (data.error) {
              notifyA(data.error)
            } else {
              notifyB("Successfully Posted")
              navigate("/")
            }
          })
          .catch(err => console.log(err))
      }
  
    }, [url])
  
  
    // posting image to cloudinary
    const postDetails = () => {
  
      console.log(body, image)
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "insta-clone")
      data.append("cloud_name", "dzou03k4g")
      setLoading(true)
      fetch("https://api.cloudinary.com/v1_1/dzou03k4g/image/upload", {
        method: "post",
        body: data
      }).then(res => res.json())
        .then(data => {
          setLoading(false)
          setUrl(data.url)})
        .catch(err => console.log(err))
      console.log(url)
  
    }
  
//   ===FUNCTION FOR UPLOAD FILE
    const loadfile = (event) => {
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
          URL.revokeObjectURL(output.src); // free memory
        };

    };
    if(loading){
     return(<>
      <h1 style={{textAlign:"center"}}>Uploading Post...</h1>
      </>)
    }
  return (
    <div className="createPost">
    {/* //header */}
    <div className="post-header">
      <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
      <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
    </div>
    {/* image preview */}
    <div className="main-div">
      <img
        id="output"
        src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          loadfile(event);
          setImage(event.target.files[0])
        }}
      />
    </div>
    {/* details */}
    <div className="details">
      <div className="card-header">
        <div className="card-pic">
          <img
            src={(JSON.parse(localStorage.getItem("userInsta")).name)?JSON.parse(localStorage.getItem("userInsta")).Photo:picLink}
            alt=""
          />
        </div>
        <h5>{JSON.parse(localStorage.getItem("userInsta")).name}</h5>
      </div>
      <textarea value={body} onChange={(e) => {
        setBody(e.target.value)
      }} type="text" placeholder="Write a caption...."></textarea>
    </div>
  </div>
  )
}

export default CreatePost
