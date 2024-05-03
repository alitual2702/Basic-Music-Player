import React, { useRef, useState } from "react";
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from "react-icons/fa";

const Audio = () => {
  //  States and Variables--------------------------------------------------
  
  
  const [converter, setconverter] = useState("0");
  const [durationsound, setdurationsound] = useState("0");
  const [index, setIndex] = useState(0);
  const [truthy, settruthy] = useState(false);
  let progressref = useRef(null);
  let numref = useRef(null);
  let durationref = useRef(null);
  let songref = useRef(null);

  // Song Updating --------------------------------------------------------
  function timeUpdate() {
    
    let durationMinutes = Math.floor(songref.current.duration / 60);
    let durationSeconds = Math.floor(songref.current.duration % 60);
    if (durationSeconds < 10) {
      setdurationsound(durationMinutes + ":0" + durationSeconds);
    } else {
      setdurationsound(durationMinutes + ":" + durationSeconds);
    }

    let minutes = Math.floor(songref.current.currentTime / 60);
    let seconds = Math.floor(songref.current.currentTime % 60);
    if (seconds < 10) {
      setconverter(minutes + ":0" + seconds);
    } else {
      setconverter(minutes + ":" + seconds);
    }

    progressref.current.style.left =
      Math.floor(
        (songref.current.currentTime / songref.current.duration) * 100
      ) + "%";
    }

  // All Musics ----------------------------------------------------

  let musicsAll = [
    {
      key: 0,
      title: "Alone",
      artist: "Alan Walker",
      url: "/allmusics/alone.mp3",
      img: "/Images/alan.jpeg",
    },
    {
      key: 1,
      title: "Amplifiar",
      artist: "Imran Khan",
      url: "/allmusics/amplifiar.mp3",
      img: "/Images/imk.jpg",
    },
    {
      key: 2,
      title: "Gangsta",
      artist: "Coolio",
      url: "/allmusics/gangsta.mp3",
      img: "/Images/coolio.jpeg",
    },
    {
      key: 3,
      title: "Go Gyal",
      artist: "Ahzee",
      url: "/allmusics/go-gyal.mp3",
      img: "/Images/ahzee-sing.jpg",
    },
    {
      key: 4,
      title: "Imaginary",
      artist: "Imran Khan",
      url: "/allmusics/imaginary.mp3",
      img: "/Images/imk.jpg",
    },
    {
      key: 5,
      title: "Kuthu",
      artist: "Thalapathy Vijay",
      url: "/allmusics/kuthu.mp3",
      img: "/Images/vijay.jpg",
    },
    {
      key: 6,
      title: "Love me like you do",
      artist: "Ellie Goulding",
      url: "/allmusics/love-me-like-you-do.mp3",
      img: "/Images/elie.jpeg",
    },
    {
      key: 7,
      title: "Middle of the night",
      artist: "Elley Duhé",
      url: "/allmusics/middle-off-the-night.mp3",
      img: "/Images/duhe.jpg",
    },
    {
      key: 8,
      title: "That's My Name",
      artist: "Akcent",
      url: "/allmusics/thats-my-name.mp3",
      img: "/Images/akcent-sing.jpg",
    },
    {
      key: 9,
      title: "Jalaaludin",
      artist: "khwarzmi",
      url: "/allmusics/jalaal.mp3",
      img: "/Images/jalalm.jpg",
    },
    {
      key: 10,
      title: "Subscribe",
      artist: "youtube",
      url: "/allmusics/subscribe.mp3",
      img: "/Images/share.jpg",
    },
  ];

  // Handle Forward Button

  const handleforward = () => {
    if (index >= musicsAll[musicsAll.length - 1].key) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }

    if (songref.current.play() && truthy == false) {
      songref.current.pause();
    } else {
      settruthy((truthy) => !truthy);
    }
  };

  // Handle Backward Button

  const handlebackward = () => {
    if (index <= musicsAll[0].key) {
      setIndex(0);
    } else {
      setIndex(index - 1);
    }
    if (songref.current.play() && truthy == false) {
      songref.current.pause();
    } else {
      settruthy((truthy) => !truthy);
    }
  };

  // Play Music and Conrol Play Button

  function playit() {
    songref.current.play();

    settruthy((val) => !val);

    let outIt = setInterval(() => {
      if (songref.current.currentTime >= songref.current.duration) {
        clearInterval(outIt);
        setconverter(0);
        progressref.current.style.left = 0 + "%";
        settruthy(false);

        // Clear the Time Interval
      } else {
        timeUpdate();

        // time Interval Start
      }
    }, 1000);
  }

  // Pause Music

  function pauseit() {
    songref.current.pause();
    settruthy((val) => !val);

    
  }

  return (
    <div className="audio-section">
      <audio ref={songref} src={musicsAll[index].url} type="audio/mpeg"></audio>
      {/* -------------------------------------------------- */}
      <h1>{musicsAll[index].title}</h1>
      {/* ---------------------------------- */}
      <p>{musicsAll[index].artist}</p>
      {/* ---------------------------------- */}
      <img src={musicsAll[index].img} />
      {/* ---------------------------------- */}
      <div className="progress">
        <span ref={numref} className="time">
          {converter}
        </span>

        <span ref={durationref} className="duration">
          {durationsound}
        </span>

        <span ref={progressref} className="moving"></span>
      </div>
      {/* --------------------------------- */}
      <div className="btn-music">
        <FaStepBackward
          className="btn-icons"
          onClick={() => handlebackward()}
        />
        {/* --------------------------------- */}
        {truthy == true ? (
          <FaPause className="block" onClick={() => pauseit()} />
        ) : (
          <FaPlay className="open" onClick={() => playit()} />
        )}
        {/* --------------------------------- */}
        <FaStepForward className="btn-icons" onClick={() => handleforward()} />
      </div>
    </div>
  );
};

export default Audio;
