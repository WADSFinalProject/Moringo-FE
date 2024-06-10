import React, { useState, useEffect } from 'react';

const CircularCountdownTimer = ({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 5,
  onTimerFinish = () => {},
  start,
  reset,
}) => {
  const [time, setTime] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  const [finished, setFinished] = useState(false);

  const totalSeconds =
    initialHours * 3600 + initialMinutes * 60 + initialSeconds;
  const remainingSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
  const percentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  useEffect(() => {
    // Reset the timer when the reset prop changes
    if (reset) {
      setTime({
        hours: initialHours,
        minutes: initialMinutes,
        seconds: initialSeconds,
      });
      setFinished(false);
    }
  }, [reset]);

  useEffect(() => {
    if (!start) return;

    const timerInterval = setInterval(() => {
      const { hours, minutes, seconds } = time;

      if (seconds > 0) {
        setTime({ hours, minutes, seconds: seconds - 1 });
      } else if (minutes > 0) {
        setTime({ hours, minutes: minutes - 1, seconds: 59 });
      } else if (hours > 0) {
        setTime({ hours: hours - 1, minutes: 59, seconds: 59 });
      } else {
        clearInterval(timerInterval);
        setFinished(true);
        onTimerFinish();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [time, onTimerFinish, start]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className='circular-timer-container'>
      <svg viewBox='0 0 120 120' className='circular-timer'>
        <circle
          className='background-circle'
          cx='60'
          cy='60'
          r={radius}
          stroke='lightgray'
          strokeWidth='10'
          fill='none'
        />
        <circle
          className='progress-circle'
          cx='60'
          cy='60'
          r={radius}
          stroke='url(#gradient)'
          strokeWidth='10'
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform='rotate(-90 60 60)'
        />
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{ stopColor: '#9FAF75', stopOpacity: 1 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: '#1C2916', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        {finished ? (
          <text x='60' y='65' textAnchor='middle' className='timer-text'>
            Done
          </text>
        ) : (
          <text x='60' y='65' textAnchor='middle' className='timer-text'>
            {`${formatTime(time.hours)}:${formatTime(
              time.minutes
            )}:${formatTime(time.seconds)}`}
          </text>
        )}
      </svg>
    </div>
  );
};

export default CircularCountdownTimer;
