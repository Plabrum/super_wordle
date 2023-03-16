import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import { format_time } from "../utils/time_uils";

export default function Timer() {
  const startTime = useStore((store) => store.startTime);
  const [time, setTime] = useState("0:00");

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(getTime, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  function getTime() {
    if (startTime) {
      //   console.log("time", startTime - Date.now());
      const elapsed_miliseconds = Date.now() - startTime;
      setTime(format_time(elapsed_miliseconds));
    }
  }
  return <h2 className="text-gray-700 justify-self-end mr-2">{time}</h2>;
}
