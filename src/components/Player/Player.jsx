import React, { useEffect, useRef, useState } from 'react';
import "./Player.css"

import SoundNoMuted from "../../assets/sf_volume.svg"
import SoundMuted from "../../assets/sf_soundmuted.svg"

import Play from "../../assets/sf_play.svg"
import Pause from "../../assets/sf_pause.svg"

import Aleatorio from "../../assets/sf_randon.svg"
import Back from "../../assets/sf_back.svg"
import Next from "../../assets/sf_next.svg"
import Repeat from "../../assets/sf_repeat.svg"

const musicHistory = []; 

function YoutubePlayer({ videoId, nomeMusica, FotoMusica, artista, allMusicas, trocarMusica }) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = allMusicas.findIndex(m => m.id === videoId);
    return idx >= 0 ? idx : 0;
  });

  const currentVideo = allMusicas[currentIndex];
  const playerRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playerReady, setPlayerReady] = useState(false); 
  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allMusicas.length;
    setCurrentIndex(nextIndex);
    trocarMusica(allMusicas[nextIndex]);
  };

  const handleBack = () => {
    const prevIndex = (currentIndex - 1 + allMusicas.length) % allMusicas.length;
    setCurrentIndex(prevIndex);
    trocarMusica(allMusicas[prevIndex]);
  };


  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    function createPlayer() {
      console.log(videoId)
      const randomIndex = Math.floor(Math.random() * allMusicas.length);
      const randomMusic = allMusicas[randomIndex];
      console.log(randomMusic)
      playerRef.current = new window.YT.Player('player', {
        videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady(event) {
      setPlayerReady(true);
      setDuration(event.target.getDuration());
      setCurrentTime(event.target.getCurrentTime());
      setVolume(event.target.getVolume());
      setMuted(event.target.isMuted());
      playerRef.current.playVideo()
    }

function onPlayerStateChange(event) {
  if (event.data === window.YT.PlayerState.PLAYING) {
    setPlaying(true);

    const music = {
      id: videoId,
      nome: nomeMusica,
      artista,
      foto: FotoMusica,
      data: new Date().toISOString()
    };

    const alreadyInHistory = musicHistory.some((m) => m.id === videoId);
    if (!alreadyInHistory) {
      musicHistory.push(music);
    }
  } else {
    setPlaying(false);
  }

  if (event.data === window.YT.PlayerState.ENDED) {
    if (isLooping && playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    } else {
      handleNext(); // chama a próxima música automaticamente
    }
  }

}

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
        setPlayerReady(false);
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (!playing || !playerRef.current) return;

    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        setCurrentTime(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  const formatTime2 = (seconds, seconds2) => {
    const sub = seconds - seconds2
    const m = Math.floor(sub / 60).toString().padStart(2, '0');
    const s = Math.floor(sub % 60).toString().padStart(2, '0');
    return `-${m}:${s}`;
  };

  const handleProgressChange = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      setMuted(false);
    } else {
      playerRef.current.mute();
      setMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      if (newVolume === 0) {
        playerRef.current.mute();
        setMuted(true);
      } else {
        playerRef.current.unMute();
        setMuted(false);
      }
    }
  };

  return (
    <div>
      <div id="player" style={{ display: "none" }}></div>

      {playerReady && videoId != null ? (
        <section className='player-container'>
        <div className="cover" style={{ backgroundImage: `url(${FotoMusica})` }}></div>

        <div className="info-music-all">

        <div className="info-music">
          <div className="info">
            <h1 className="music-name">{nomeMusica}</h1>
            <p className="artist-name">{artista}</p>
          </div>

          <div className="controls-c">
            <button className="btn-icon">
              <img src={Aleatorio} alt="Shuffle" />
            </button>
            <button className="btn-icon" onClick={handleBack}>
              <img src={Back} alt="Previous" />
            </button>
            <button onClick={togglePlayPause} className="btn-play">
              <img src={isPlaying == true ? Pause: Play} alt="Play/Pause" />
            </button>
            <button className="btn-icon" onClick={handleNext}>
              <img src={Next} alt="Next" />
            </button>
           <button className="btn-icon" onClick={toggleLoop}>
              <img
                src={Repeat}
                alt="Repeat"
                style={{ filter: isLooping ? "brightness(2)" : "none" }}
              />
            </button>
          </div>
        
          <div className="sound-control">
            <button onClick={toggleMute}>
              <img src={muted ? SoundMuted : SoundNoMuted} alt="Som" />
            </button>
            <input
              className="slider volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
          <div className="current-container">
            <span>{formatTime(currentTime)}</span>
              <input
                className="slider progress progress-all"
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
              />
            <span>{formatTime2(duration, currentTime)}</span> 
          </div>
        </div>
      </section>

      ) : (
       ""
      )}
    </div>
  );
}

export default YoutubePlayer;
export { musicHistory };