export default function AudioLibrary({ tracks, selectedTrackId, playingTrackId, onSelectTrack }) {
  return (
    <section className="library" aria-label="Songs and stories">
      {tracks.map((track, index) => {
        const isSelected = track.id === selectedTrackId;
        const isPlaying = track.id === playingTrackId;

        return (
          <button
            className={[
              'track-card',
              isSelected ? 'is-selected' : '',
              isPlaying ? 'is-playing' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={track.id}
            type="button"
            aria-pressed={isSelected}
            aria-label={`Play ${track.title}`}
            onClick={() => onSelectTrack(index)}
          >
            <span className="track-emoji" aria-hidden="true">
              {track.emoji}
            </span>
            <span className="track-title">{track.title}</span>
            <span className="track-status" aria-hidden="true">
              {isPlaying ? 'Playing' : isSelected ? 'Ready' : 'Tap'}
            </span>
          </button>
        );
      })}
    </section>
  );
}
