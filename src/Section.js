import {useState, useEffect} from 'react';
import download from './download.jfif'
import Highlight from './Highlight';

export default function ({data, name, access}){
    const [videos, setVideos] = useState({});
    const [images, setImages] = useState({});
    const [detail, setDetail] = useState();
    const [highlight, setHighlight] = useState(false);
  
    useEffect(() => {
      const imageMap = {};
      const videoMap = {};
  
      data.forEach((e) => {
        const key = e.name.split(".")[0]; // Remove extension
        if (/image/.test(e.mimeType)) {
          imageMap[key] = e.id; // Store in temp object
        } else {
          videoMap[key] = e.id;
        }
      });
  
      setImages(imageMap);
      setVideos(videoMap);
    }, [data]);

    return(<>
        <div>
      <p className="sec-title">{name}</p>
      <div className="video-box">
        {data?.length == 0 && (
          <div className="empty-box">
            No videos available at this time
          </div>
        )}

        {highlight && (
          <Highlight
            data={detail}
            close={setHighlight}
            user={access}
            
          /> //highlight
        )}

        {Object.keys(videos)?.map((e, i, arr) => {
        
          return (
            
              <div
                className="vid-box"
                key ={i}
                onClick={() => {
                  setDetail(videos[e]);
                  setHighlight(true);
                }}
              >
                <img
                  src={ images[e] ? `http://localhost:5000/download/${images[e]}`: download }
                  height="200px"
                  alt="no Image"
                /> 
                <p>{e}</p>     

              </div>
           
          );
        })}

      </div>
    </div>
    </>)
}