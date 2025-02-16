import {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
  

export default function Login({setAuth}){

  const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === "Enter") {
            setIsLoading(true);
            delayedFun(user, password);
          }
        };
    
        document.body.addEventListener("keyup", handleKeyPress);
    
        return () => {
          document.body.removeEventListener("keyup", handleKeyPress);
        };
      }, [user, password]);

      const handleSignin = async (user, password) => {
        try{
        const resp = await axios.post(
          "http://localhost:5000/login",
          { email:user, password },
          { withCredentials: true }
        );
        if(resp.status){
          console.log(resp)
          const data = await resp.data
          localStorage.setItem('data', JSON.stringify(data))
          setAuth(data)
          navigate('/videos', {replace:true})
        }
      }catch(e){
        setError(e.message)
      }
      setIsLoading(false)
        
        
      };

      function delayed(func,delay){
        let timer = null
       
        return (...args)=>{
            if(timer) return
            
            timer = setTimeout(()=>{
            clearTimeout(timer)
        }, delay)
        return func(...args)
        }
      }
    
      const delayedFun = delayed(handleSignin, 100);

    
    const debounce = (func, delay) => {
        let timer = null;
        return (...args) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay);
        };
      };



    return (
        
            <div className="login-page">
              <div className="login-box">
                <p className="login-email">Email</p>
                <input
                  type="email"
                  onChange={debounce((e) => {
                    setUser(e.target.value);
                  }, 100)}
                />
                <p>Password</p>
                <input
                  type="password"
                  onChange={debounce((e) => {
                    setPassword(e.target.value);
                  }, 100)}
                />
        
                <button
                  className="login-button btn-primary"
                  onClick={() => {if(!user && !password){setError('Fields should not be empty'); return}
                    setIsLoading(true);
                    handleSignin(user, password);
                  }}
                >
                  {isLoading ? <div className="loader"></div> : "Login"}
                </button>
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translate(-50%, 20%)",
                    textWrap: "nowrap",
                  }}
                >
                  {error}
                </p>
              </div>
            </div>
    )
}