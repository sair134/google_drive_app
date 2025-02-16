
import {useState, useEffect} from 'react';
import Section from './Section';


export default function Video ({access}){

const [data, setData] = useState({})    
const [files, setFiles] = useState()
const [thubnails, setThumbnails] = useState()
const [currsec, setCurrsec] = useState('All')

useEffect(()=>{
    const getVideos = async()=>{
        try{
            const response = await fetch(`http://localhost:5000/files`, {credentials: "include"})
            const res = await response.json()
            if(response.statusText == 'OK')setData(res)
            console.log(res)
        }catch(e){console.error(e)}
    }

getVideos()

}, [])


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