
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Menubar({ width, setError, setPage, page, setMenu, setAuth }) {
  const navigator = useNavigate();

  const logout =async ()=>{
    try{
    const resp = await axios.post(
        "http://localhost:5000/logout",{},
        { withCredentials: true }
      );

      if(resp.status){navigator('/login', {replace:true}); setAuth({}); localStorage.removeItem('data')}
      }catch(e){
        setError(e.message)
      }

  }



  return (
    <div
      className="menu-bar"
      style={{ width: width }}
      onClick={() => {
        setMenu(false)
      }}
    >
      <ul>
        <li
          className={page == "videos" ? "current-color" : ""}
          onClick={() => {
            console.log('called videos')
            if (page == "videos") return;
            navigator("/videos");
           setPage("videos")
          }}
        >
          Videos
        </li>
        <li
          className={page == "books" ? "current-color" : ""}
          onClick={() => {
            setPage("books")
            navigator("/books");
          }}
        >
          Books
        </li>
        <li
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}
