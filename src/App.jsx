import { useCallback, useEffect, useRef, useState } from 'react';
import AudioLibrary from './components/AudioLibrary.jsx';
import Player from './components/Player.jsx';
import { getAudioUrl, tracks } from './data/tracks.js';

const DEFAULT_SPEED = 1;
const DEFAULT_VOLUME = 0.8;
const DEFAULT_LOOPING = true;

export default function App() {
  const audioRef = useRef(null);
  const trackIndexRef = useRef(0);
  const speedRef = useRef(DEFAULT_SPEED);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const loopRef = useRef(DEFAULT_LOOPING);

  const [trackIndex, setTrackIndex] = useState(0);
  const [hasPickedTrack, setHasPickedTrack] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isLooping, setIsLooping] = useState(DEFAULT_LOOPING);

  const currentTrack = tracks[trackIndex];

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = DEFAULT_VOLUME;
    audio.playbackRate = DEFAULT_SPEED;
    audio.loop = DEFAULT_LOOPING;
    audioRef.current = audio;

    function handleLoadedMetadata() {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsLoading(false);
    }

    function handleTimeUpdate() {
      setCurrentTime(audio.currentTime);
    }

    function handleCanPlay() {
      setIsLoading(false);
    }

    function handleWaiting() {
      setIsLoading(true);
    }

    function handlePlay() {
      setIsPlaying(true);
      setError('');
      setIsLoading(false);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleError() {
      setIsPlaying(false);
      setIsLoading(false);
      setError('audio-error');
    }

    function handleEnded() {
      if (audio.loop) {
        return;
      }

      setIsPlaying(false);
      setIsLoading(false);
      setCurrentTime(Number.isFinite(audio.duration) ? audio.duration : 0);
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const loadTrack = useCallback((index) => {
    const audio = audioRef.current;
    const track = tracks[index];

    if (!audio || !track) {
      return null;
    }

    trackIndexRef.current = index;
    setTrackIndex(index);
    setHasPickedTrack(true);
    setCurrentTime(0);
    setDuration(0);
    setError('');
    setIsLoading(true);

    audio.pause();
    audio.src = getAudioUrl(track.file);
    audio.currentTime = 0;
    audio.volume = volumeRef.current;
    audio.playbackRate = speedRef.current;
    audio.loop = loopRef.current;
    audio.load();

    return audio;
  }, []);

  const playTrack = useCallback(
    (index) => {
      const audio = loadTrack(index);

      if (!audio) {
        return;
      }

      const playPromise = audio.play();

      if (playPromise) {
        playPromise.catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
          setError('audio-error');
        });
      }
    },
    [loadTrack],
  );

  function handleSelectTrack(index) {
    playTrack(index);
  }

  function handlePlayPause() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!hasPickedTrack || !audio.src) {
      playTrack(trackIndex);
      return;
    }

    if (audio.paused) {
      setIsLoading(true);
      audio.play().catch(() => {
        setIsLoading(false);
        setError('audio-error');
      });
    } else {
      audio.pause();
    }
  }

  function handlePrevious() {
    const previousIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    playTrack(previousIndex);
  }

  function handleNext() {
    const nextIndex = (trackIndex + 1) % tracks.length;
    playTrack(nextIndex);
  }

  function handleSeek(nextTime) {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(nextTime)) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function handleSpeedChange(nextSpeed) {
    const audio = audioRef.current;
    speedRef.current = nextSpeed;
    setSpeed(nextSpeed);

    if (audio) {
      audio.playbackRate = nextSpeed;
    }
  }

  function handleVolumeChange(nextVolume) {
    const audio = audioRef.current;
    volumeRef.current = nextVolume;
    setVolume(nextVolume);

    if (audio) {
      audio.volume = nextVolume;
    }
  }

  function handleToggleLoop() {
    const audio = audioRef.current;
    const nextLooping = !isLooping;

    loopRef.current = nextLooping;
    setIsLooping(nextLooping);

    if (audio) {
      audio.loop = nextLooping;
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <p>Songs & Stories</p>
        <h1>Adam's Jukebox <span aria-hidden="true">🎵</span></h1>
      </header>

      <AudioLibrary
        tracks={tracks}
        selectedTrackId={hasPickedTrack ? currentTrack.id : ''}
        playingTrackId={isPlaying ? currentTrack.id : ''}
        onSelectTrack={handleSelectTrack}
      />

      <Player
        track={currentTrack}
        isPlaying={isPlaying}
        isLoading={isLoading}
        error={error}
        currentTime={currentTime}
        duration={duration}
        speed={speed}
        volume={volume}
        isLooping={isLooping}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToggleLoop={handleToggleLoop}
        onSeek={handleSeek}
        onSpeedChange={handleSpeedChange}
        onVolumeChange={handleVolumeChange}
      />
    </main>
  );
}
