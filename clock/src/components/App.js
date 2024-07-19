import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import "./app.css";
import Progressbar from './Progress_bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [quote,setQuote]=useState("Life does not agree with philosophy: There is no happiness that is not idleness, and only what is useless is pleasurable.");
  const [time, setTime] = useState(new Date());
  const url = 'https://type.fit/api/quotes';
  const [intervalId, setIntervalId] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(50);
 
  // Get progress from URL query parameter if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const progressFromUrl = params.get('progress');
    const timeFromUrl = params.get('time');

    if (progressFromUrl) {
      setProgress(Number(progressFromUrl));
    }
    if (timeFromUrl) {
      const parsedTime = new Date(decodeURIComponent(timeFromUrl));
      if (!isNaN(parsedTime)) {
        setTime(parsedTime);
      }
    }

  }, [location.search]);

  const handleShare = () => {
    const currentTime=time.toISOString();
    const currentUrl = `${window.location.origin}/home?progress=${progress}&time=${encodeURIComponent(currentTime)}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("URL copied to clipboard", { position:'top-center'  ,autoClose: 2000 });
    });
  };


  const handleClick = (e) => {
    const bar = e.target.getBoundingClientRect();
    const clickPosition = e.clientX - bar.left;
    const newProgress = (clickPosition / bar.width) * 100;
    setProgress(Math.round(newProgress));
  };
  
  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then(res => res.json()) 
        .then(data => {
          const randomIndex = Math.floor(Math.random() * 16); // generate a random index between 0 and 15
          setQuote(data[randomIndex].text); 
        })
        .catch(err => {
          console.log(`error ${err}`);
        });
    };

    fetchData(); 
    const intervalId = setInterval(fetchData, 5000); 
    return () => clearInterval(intervalId); 
  }, []);
  
  useEffect(() => {
    const updateTime = () => {
      setTime(prevTime => new Date(prevTime.getTime() - 1000)); // Update time forward by 1 second
    };

    // Clear existing interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Calculate interval time based on progress
    const intervalTime = 1000 * ( 50/progress); // Adjust interval based on progress

    // Set new interval
    const newIntervalId = setInterval(updateTime, intervalTime);
    setIntervalId(newIntervalId);

    return () => clearInterval(newIntervalId); // Cleanup interval on component unmount
  }, [progress]);
  
   
  const splitQuote = quote.split(' ');
  const mainPart = splitQuote.slice(0, -2).join(' ');
  const lastTwoWords = splitQuote.slice(-2).join(' ');

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourRotation = ((30 * hours) + (minutes / 2)) ; // 30 degrees per hour + half degree per minute
  const minuteRotation = 6 * minutes; // 6 degrees per minute
  const secondRotation = 6 * seconds ; // 6 degrees per second


  return (
    
      <div>
          
        <div className='bg-1'>
          <img src='images/bg1.jpg'></img>
        </div> 
        <div className='bg2'>
          <img src='images/bg2.jpg'></img>
        </div>
         
        <div className='clockContainer'>
            
            <div className='quotes'>
              <div className='heading'>
               <span className="heading-color">🤩 Award-winning quotes</span>
              </div> 

              <div className='quote'>
                <h3>{mainPart} <span className="highlight">{lastTwoWords}</span></h3>
              </div>
            </div>

            <div className='clockProgress'>   
              <div id="clock">
                <div id="hour" style={{ transform: `rotate(${hourRotation}deg)` }}></div>
                <div id="minute" style={{ transform: `rotate(${minuteRotation}deg)` }}></div>
                <div id="second" style={{ transform: `rotate(${secondRotation}deg)` }}></div>
              </div>
            </div>

            <div className='progress' onClick={handleClick}>
              <Progressbar cursor="pointer"  bgcolor="#1fde6d" progress={progress} height={24} />
            </div>

            <div class="buttons">
                  <button class="blob-btn"  onClick={handleShare}>
                    Share
                    <span class="blob-btn__inner">
                      <span class="blob-btn__blobs">
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                      </span>
                    </span>
                  </button>
                  <br/>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                      <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                  </defs>
                </svg>
                </div>
        
            </div> 
            <ToastContainer />
      </div>
  )
}

export default App