"use client";

import { useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 16); // 60 FPS

    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(handle);
        start = end;
      }
      setCount(Math.ceil(start));
    }, 16);

    return () => clearInterval(handle);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
};

export default Counter;