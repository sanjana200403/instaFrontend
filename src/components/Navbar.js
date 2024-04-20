import React, { useContext } from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({login}) => {
  const { setModalOpen } = useContext(LoginContext)
  const navigate = useNavigate()
  const loginStatus = ()=>{
    const token = localStorage.getItem("jwtInsta")
    console.log(token,"instagram clone token")
    if(token || login){
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
            </Link>
            <Link to="/createPost">
            <li>CreatePost</li>
            </Link>
            <Link style={{marginLeft:"20px"}} to="/followingpost">
            <li>My Following </li>
            </Link>
            <Link to={""}>
            <button className='primaryBtn'
            onClick={()=>setModalOpen(true)}
            >Log Out</button>
            </Link>
        
        </>
      ]
    }else{
     return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
            </Link>
            <Link to="/signin">
            <li>Sign In</li>
            </Link>
        </>
      ]
    }

  }
  const loginStatusMobile = ()=>{
    const token = localStorage.getItem("jwtInsta")
    console.log(token,"instagram clone token")
    if(token || login){
      return [
        <>
         <Link to="/">
            <li>
              <span className='material-symbols-outlined'>
                home
              </span>
            </li>
            </Link>
          <Link to="/profile">
            <li> <span className='material-symbols-outlined'>
                account_circle
              </span></li>
            </Link>
            <Link to="/createPost">
            <li><span className='material-symbols-outlined'>
                add_box
              </span></li>
            </Link>
            <Link style={{marginLeft:"20px"}} to="/followingpost">
            <li>
              <span className='material-symbols-outlined'>
            explore
              </span></li>
            </Link>
            <Link to={""}>
            <li className='primaryBtn'
            onClick={()=>setModalOpen(true)}
            ><span className='material-symbols-outlined'>
            logout
          </span></li>
            </Link>
        
        </>
      ]
    }else{
     return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
            </Link>
            <Link to="/signin">
            <li>Sign In</li>
            </Link>
        </>
      ]
    }

  }
 
  return (
    <div className='navbar'>
    
        <img 
        id='insta-logo'
        style={{cursor:"pointer"}}
        onClick={()=>{
          navigate("/")
        }}
        src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png" alt="" />
   
        <ul className='nav-menu'>{loginStatus()}
</ul>
<ul className='nav-mobile'>
          {loginStatusMobile()}

        </ul>
      
    </div>
  )
}

export default Navbar
