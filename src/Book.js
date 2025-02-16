import {useState, useEffect} from 'react';
import download from './download.jfif'
import { useNavigate } from 'react-router';



export default function Book({setError}){
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{

        const fetchfiles = async()=>{
            try{
            const resp = await fetch('http://localhost:5000/books', {credentials: "include"})
                
            if(resp.statusText=='OK'){
                const file = await resp.json( )
                setFiles(file)
            }}catch(e){
                setError('Loading Books failes')
            }
        }
        fetchfiles()
    }, [])

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