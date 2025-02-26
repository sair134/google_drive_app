import {useState, useEffect} from 'react';
import download from './download.jfif'
import { useNavigate } from 'react-router';
import Spinner from './Spinner';
import Error from './Error';


export default function Book({setError}){
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, SetError] = useState(false)

    
    useEffect(()=>{
        // if(files) return;
        const fetchfiles = async()=>{
            try{
            const resp = await fetch('https://videotool.onrender.com/books', {credentials: "include"})
                
            if(resp.status){
                const file = await resp.json( )
                setFiles(file)
            }
            setLoading(false)
          }catch(e){
                setError('Loading Books failes')
                setLoading(false)
            }
        }
        fetchfiles()
    }, [])


    if(loading)return <Spinner />

    return(<div  className='books_self'  >
         {files?.map((e) => {
                
                  return (
                    
                      <div
                        className="vid-box"
                        key ={e.id}
                        onClick={() => {
                          navigate(`./${e.id}`)
                        }}
                      >
                        <img
                          src={download }
                          height="200px"
                          alt="no Image"
                        /> 
                        <p>{e.name}</p>     
        
                      </div>
                   
                  );
                })}
    </div>)


}