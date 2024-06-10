import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [time, setTime] = useState({
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
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
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [time]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className='countdown-timer'>
      <span>{`${formatTime(time.hours)}:${formatTime(
        time.minutes
      )}:${formatTime(time.seconds)}`}</span>
    </div>
  );
};

export default CountdownTimer;
