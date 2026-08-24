export default function VolumeControl({ value, onChange }) {
  return (
    <div className="volume-control">
      <span aria-hidden="true">🔈</span>
      <label className="sr-only" htmlFor="volume">
        Volume
      </label>
      <input
        id="volume"
        className="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ '--volume': `${value * 100}%` }}
      />
      <span aria-hidden="true">🔊</span>
    </div>
  );
}
