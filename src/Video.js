
import {useState, useEffect} from 'react';
import Section from './Section';
import Spinner from './Spinner';
import Error from './Error';


export default function Video ({access}){

const [data, setData] = useState({})    
const [files, setFiles] = useState()
const [loading, setLoading ] = useState(true)
const [currsec, setCurrsec] = useState('All')
const [error, setError] = useState(false)


useEffect(()=>{
    const getVideos = async()=>{
        try{
            const response = await fetch(`https://videotool.onrender.com/files`, {credentials: "include"})
            const res = await response.json()
            if(response.status){setData(res)}
            else{
              setError(true)
            }
            console.log(res)
          setLoading(false)
        }catch(e){console.error(e)
          setLoading(false)
          setError(true)
        }
    }

getVideos()

}, [])


if(loading)return <Spinner />
if(error)return <Error />


    return(<>

         <div>
        <div
          id="title-flex"
          style={{ alignItems: "end", flexDirection: "column" }}
        >
          <div>
            <label htmlFor="choose-sec">Choose the section:</label>
            <select
              id="choose-sec"
              value={currsec}
              onChange={(eve) => {
                setCurrsec(eve.target.value);
              }}
            >
              <option value="All">All videos</option>

              {Object.keys(data).map((e,i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
{
              Object.keys(data).map((e,i)=>{
                if (currsec != 'All' && currsec != e)return ;
                return(
                    <Section key ={i} name={e} data = {data[e]} access={access} />
                    )
              })}
        </div>
    </>)
}