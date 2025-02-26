import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faVolumeXmark,
  faVolumeHigh,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
// import Delete from "./Delete";
import Spinner from "./Spinner";
import axios from 'axios';

export default function Highlight({ data, close, user, name, setError}) {
  const ref = useRef();
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [play, setPlay] = useState(false);
  const [width, setWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const [delbox, setDelbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bg, setBg] = useState("white");

  useEffect(() => {
    ref.current.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  }, [ref]);



    


  useEffect(() => {
    if (data) {
      const video = videoRef.current;
      video.addEventListener("loadedmetadata", () => {
        getWidth();
        setDuration(video.duration);
        setVolume(video.volume);
      });

      video.addEventListener("canplay", () => {
        setIsLoading(false);
        setBg("rgba(0,0,0,0)");
      });
    }
  }, [data]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    play ? video.pause() : video.play();
    setPlay(!play);
  };

  const getWidth = () => {
    setWidth(videoRef.current?.offsetWidth);
  };
  const timeFormat = (t) => {
    
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    return min + ":" + String(sec).padStart(2, '0');
  };

  const handleFullScreen = () => {
    const video = videoRef.current;
    if (fullScreen) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
    // setFullScreen(!fullScreen);
  };

  const download = async(filename, fileId)=>{
    try{
    const response = await axios.get(`https://videotool.onrender.com/download/${fileId}`, {
      responseType: 'blob',
  });

  // Create a URL for the blob response
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        link.remove();
        window.URL.revokeObjectURL(url);}
        catch(e){
          setError('Something went wrong')
        }
  }

  return (
    <div
      className="back-highlight"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close(false);
        }
      }}
      ref={ref}
    >
      {loading && <Spinner />}
      <div className="highlight">
        <div className="highlight-close" onClick = {()=>{close(false)}}><FontAwesomeIcon icon={faClose} /></div>
        <div className="player">
          {isLoading ? (
            <div className="video-loading" style={{ background: bg }}>
              <div className="loader"></div>
            </div>
          ) : (
            !play && (
              <div className="play-pause" onClick={handlePlayPause}>
                <FontAwesomeIcon icon={faPlay} />
              </div>
            )
          )}

          {data && (
            <video
              // poster={data.imageURL}
              //preload="metadata"
              ref={videoRef}
              onClick={handlePlayPause}
              onTimeUpdate={() => {
                setCurrentTime(videoRef.current.currentTime);
              }}
              controlsList="nodownload"
              onWaiting={() => {
                setIsLoading(true);
              }}
            >
              <source src={`https://videotool.onrender.com/url/${data}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="controls" style={{ width: width + "px" }}>
            <div className="time-control">
              <input
                type="range"
                id="duration-slider"
                className="duration-slider"
                step="0.001"
                value={currentTime}
                min="0"
                max={duration}
                onChange={(e) => {
                  videoRef.current.currentTime = e.target.value;
                  setCurrentTime(e.target.value);
                }}
              />
            </div>
            <div
              className="play-pause-btn"
              onClick={() => {
                handlePlayPause();
              }}
            >
              {play ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </div>
            <div className="volume-control">
              {volume == 0 ? (
                <FontAwesomeIcon
                  icon={faVolumeXmark}
                  onClick={() => {
                    let v = window.localStorage.getItem("volume");
                    setVolume(v);
                    videoRef.current.volume = v;
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faVolumeHigh}
                  onClick={() => {
                    setVolume(0);
                    videoRef.current.volume = 0;
                    window.localStorage.setItem("volume", volume);
                  }}
                />
              )}
              <input
                type="range"
                id="duration-slider"
                className="duration-slider"
                step="0.1"
                value={volume}
                min="0"
                max="1"
                onChange={(e) => {
                  videoRef.current.volume = e.target.value;
                  setVolume(e.target.value);
                }}
              />
            </div>
            <div className="time">
              {timeFormat(currentTime)}/{timeFormat(duration)}
            </div>
            <div className="fullScreen" onClick={handleFullScreen}>
              {fullScreen ? (
                <FontAwesomeIcon icon={faExpand} />
              ) : (
                <FontAwesomeIcon icon={faCompress} />
              )}
            </div>
          </div>
        </div>
        <div
          id="special-btn"
          className="title-flex"
          style={{
            marginTop: "0px",
            justifyContent: "space-between",
            width: width ? width + "px" : "400px",
          }}
        >
         
         {(user == 'download' && !isLoading) && <button
            className="download-btn"
            onClick={() => {
              download(name, data)
              
            }}
            
          >Download
           {/* <a style ={{textDecoration:"none", color:"white"}} download={name} href={`https://videotool.onrender.com/download/${data}`}> Download</a> */}
          </button>}
          
        </div>
       
      </div>
    </div>
  );
}
