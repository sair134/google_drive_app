import './App.css';
import Spinner from './Spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import Video from './Video';
import Login from './Login';
import { useState, useEffect } from 'react';
import Menubar from './Menubar';
import axios from 'axios';
import Book from './Book';
import Pdf from './Pdf';


function App() {
  const [menu, setMenu] = useState(false);
  const [auth, setAuth] = useState({}); // Assuming this controls some auth logic
  const [error, setError] = useState('');
  
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const [page, setPage] = useState(location.pathname.slice(1,))
  const navigate = useNavigate();
  
  useEffect(()=>{
    const checkLogin = async()=>{
      try{
      const resp = await axios.get('http://localhost:5000/verifyToken', {withCredentials: true})
      if(resp.statusText == 'OK'){  
      const data = JSON.parse(localStorage.getItem('data'))
        console.log(data)
        setAuth(data)
    
     
      if(location.pathname == '/login'){
        console.log(location.pathname)
        navigate('/books')
      }
      setLoading(false)}
    }catch(e){
      console.log(e)
      setLoading(false)
      navigate('/login', {replace:true})
    }}
    checkLogin()
  }, [])


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setError('')
    }, 1000)

    return ()=>{
      clearTimeout(timer)
    }
  }, [error])

  // Toggle menu visibility
  const toggleMenu = () => setMenu(!menu);

  return (
    <div className="app-container">
      {/* Optional Spinner */}
      {loading ?<Spinner bg={"white"} />:
        <>
      {(auth.username && !/\/books\/.{5,}/.test(location.pathname)) && (<>
        <header className="app-header">
          <p>IIM Nagpur - SMP05 Batch</p>
          <p style={{ fontSize: "26px" }} onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={faBars}
              className={`menu-icon ${menu ? "hide" : ""}`}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className={`menu-icon ${!menu ? "hide" : ""}`}
            />
          </p>
        </header>
        <Menubar setMenu = {setMenu} setError = {setError} width= {menu ? "150px" : "0px"} page={page} setPage={setPage} setAuth = {setAuth}  /></>
      )}

      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/videos" element={<ProtectedRoute auth={auth.username} Children={<Video access={auth.access} />}></ProtectedRoute>} />
        <Route path ="/books" element={<ProtectedRoute auth={auth.username} Children={<Book setError={setError} />} />} />
        <Route  path="/books/:id" element ={<ProtectedRoute auth={auth.username} Children={<Pdf  />} />} />
        <Route path="*" element={<ProtectedRoute auth={auth.username} Children={<Book setError={setError} />}></ProtectedRoute>} />

      </Routes>

      
      
      </>}
      {error && <p>{error}</p>}
    </div>
  );
}

function ProtectedRoute({Children, auth}){
  const navigate = useNavigate()
  useEffect(()=>{
    if(!auth){  
      console.log(auth)
      navigate('/login')
    }
  })
  return Children 

}

export default App;