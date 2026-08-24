import { useCallback, useId, useRef } from 'react';

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
const MIN_ANGLE = -135;
const MAX_ANGLE = 135;

function speedToAngle(speed) {
  const index = SPEEDS.indexOf(speed);
  const fallbackIndex = SPEEDS.reduce((nearest, item, itemIndex) => {
    return Math.abs(item - speed) < Math.abs(SPEEDS[nearest] - speed) ? itemIndex : nearest;
  }, 0);
  const safeIndex = index === -1 ? fallbackIndex : index;
  const percent = safeIndex / (SPEEDS.length - 1);

  return MIN_ANGLE + percent * (MAX_ANGLE - MIN_ANGLE);
}

function angleToSpeed(angle) {
  const clamped = Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, angle));
  const percent = (clamped - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE);
  const index = Math.round(percent * (SPEEDS.length - 1));

  return SPEEDS[index];
}

function getPointerAngle(pointerEvent, element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const radians = Math.atan2(pointerEvent.clientY - centerY, pointerEvent.clientX - centerX);
  let degrees = (radians * 180) / Math.PI + 90;

  if (degrees > 180) {
    degrees -= 360;
  }

  return degrees;
}

export default function SpeedDial({ value, onChange }) {
  const dialId = useId();
  const dialRef = useRef(null);
  const angle = speedToAngle(value);

  const updateFromPointer = useCallback(
    (event) => {
      if (!dialRef.current) {
        return;
      }

      const nextSpeed = angleToSpeed(getPointerAngle(event, dialRef.current));
      onChange(nextSpeed);
    },
    [onChange],
  );

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  }

  function handleKeyDown(event) {
    const currentIndex = SPEEDS.indexOf(value);

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      onChange(SPEEDS[Math.max(0, currentIndex - 1)]);
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      onChange(SPEEDS[Math.min(SPEEDS.length - 1, currentIndex + 1)]);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      onChange(SPEEDS[0]);
    }

    if (event.key === 'End') {
      event.preventDefault();
      onChange(SPEEDS[SPEEDS.length - 1]);
    }
  }

  return (
    <div className="speed-section">
      <div className="speed-labels" aria-hidden="true">
        <span>🐢 Slow</span>
        <span>🚀 Fast</span>
      </div>

      <div className="dial-stage">
        {SPEEDS.map((speed) => {
          const markerAngle = speedToAngle(speed);
          const isNormal = speed === 1;

          return (
            <span
              className={`speed-marker ${isNormal ? 'is-normal' : ''}`}
              key={speed}
              style={{ '--marker-angle': `${markerAngle}deg` }}
              aria-hidden="true"
            >
              {speed === 1 ? '1x' : ''}
            </span>
          );
        })}

        <div
          ref={dialRef}
          id={dialId}
          className="speed-dial"
          role="slider"
          tabIndex="0"
          aria-label="Playback speed"
          aria-valuemin={SPEEDS[0]}
          aria-valuemax={SPEEDS[SPEEDS.length - 1]}
          aria-valuenow={value}
          aria-valuetext={`${value} times speed`}
          onPointerDown={handlePointerDown}
          onPointerMove={(event) => {
            if (event.buttons === 1 || event.pointerType === 'touch' || event.pointerType === 'pen') {
              updateFromPointer(event);
            }
          }}
          onKeyDown={handleKeyDown}
          style={{ '--angle': `${angle}deg` }}
        >
          <div className="dial-face">
            <span className="dial-notch" aria-hidden="true" />
            <span className="dial-speed">{value.toFixed(value % 1 === 0 ? 0 : 2)}x</span>
          </div>
        </div>
      </div>
    </div>
  );
}
