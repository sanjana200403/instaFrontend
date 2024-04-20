import './App.css';
import Navbar from './components/Navbar';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Home from './screens/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './screens/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './screens/CreatePost';
import { LoginContext } from './context/LoginContext';
import { useState } from 'react';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';


function App() {
  const [userLogin,setUserLogin] = useState(false)
  const [modalOpen,setModalOpen] = useState(false)
  return (
    <BrowserRouter>
   <div className='App'>
    <LoginContext.Provider value={
    {userLogin,
    setUserLogin,
    setModalOpen}}>

  
   <Navbar login={userLogin}/>
 
   <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/signup' element={<SignUp/>}/>
    <Route exact path='/signin' element={<SignIn/>}/>
    <Route exact path="/profile" element={<Profile/>} />
    <Route exact path='/createPost' element={<CreatePost/>}/>
    <Route exact path='/profile/:id' element={<UserProfile/>}/>
    <Route exact path='/followingpost' element={<MyFollowingPost/>}/>
    {/* <Route path=''/> */}

   </Routes>

   {/* toast container */}
   <ToastContainer
   theme='dark'
   />
   {/* modal */}
   {
    modalOpen && <Modal 
    setModalOpen={setModalOpen}
    />
   }
  </LoginContext.Provider>

   
   </div> 
   </BrowserRouter>
  );
}

export default App;
