import ProgressBar from './ProgressBar.jsx';
import SpeedDial from './SpeedDial.jsx';
import VolumeControl from './VolumeControl.jsx';

export default function Player({
  track,
  isPlaying,
  isLoading,
  error,
  currentTime,
  duration,
  speed,
  volume,
  isLooping,
  onPlayPause,
  onPrevious,
  onNext,
  onToggleLoop,
  onSeek,
  onSpeedChange,
  onVolumeChange,
}) {
  return (
    <section className="player-shell" aria-label="Player">
      <div className="now-playing">
        <span className="now-emoji" aria-hidden="true">
          {track.emoji}
        </span>
        <div>
          <p className="now-label">{isLoading ? 'Loading...' : 'Now playing'}</p>
          <h2>{track.title}</h2>
        </div>
      </div>

      {error ? (
        <p className="friendly-error" role="status">
          Couldn't play this one 🎵
        </p>
      ) : null}

      <div className="transport" aria-label="Playback controls">
        <button className="round-button side-button" type="button" onClick={onPrevious} aria-label="Previous track">
          <span aria-hidden="true">⏮</span>
        </button>
        <button className="round-button play-button" type="button" onClick={onPlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <span aria-hidden="true">{isPlaying ? '⏸' : '▶'}</span>
        </button>
        <button className="round-button side-button" type="button" onClick={onNext} aria-label="Next track">
          <span aria-hidden="true">⏭</span>
        </button>
      </div>

      <button
        className={`loop-button ${isLooping ? 'is-looping' : ''}`}
        type="button"
        aria-pressed={isLooping}
        onClick={onToggleLoop}
      >
        <span aria-hidden="true">{isLooping ? '🔁' : '➡️'}</span>
        <span>{isLooping ? 'Loop on' : 'Loop off'}</span>
      </button>

      <ProgressBar currentTime={currentTime} duration={duration} onSeek={onSeek} />

      <SpeedDial value={speed} onChange={onSpeedChange} />

      <VolumeControl value={volume} onChange={onVolumeChange} />
    </section>
  );
}
