function formatTime(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return '0:00';
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export default function ProgressBar({ currentTime, duration, onSeek }) {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const progress = safeDuration ? Math.min(currentTime / safeDuration, 1) * 100 : 0;

  return (
    <div className="progress-wrap">
      <label className="sr-only" htmlFor="audio-progress">
        Track progress
      </label>
      <input
        id="audio-progress"
        className="progress-slider"
        type="range"
        min="0"
        max={safeDuration || 0}
        step="0.1"
        value={safeDuration ? Math.min(currentTime, safeDuration) : 0}
        onChange={(event) => onSeek(Number(event.target.value))}
        disabled={!safeDuration}
        style={{ '--progress': `${progress}%` }}
      />
      <div className="time-row" aria-live="off">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
