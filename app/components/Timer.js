import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { Howl } from "howler";

export default function DualTimer() {
  const [firstTimer, setFirstTimer] = useState({
    hours: 0,
    minutes: 45,
    seconds: 0,
  });
  const [secondTimer, setSecondTimer] = useState({
    hours: 0,
    minutes: 8,
    seconds: 0,
  });

  const [active, setActive] = useState("first");

  const [editing, setEditing] = useState({ field: null });
  const [inputValue, setInputValue] = useState("");

  const alarmSound = new Howl({ src: ["/sounds/alarm.mp3"], volume: 0.1 });

  const getDurationMs = ({ hours, minutes, seconds }) =>
    (hours * 3600 + minutes * 60 + seconds) * 1000;

  const initialExpiry = new Date(Date.now() + getDurationMs(firstTimer));

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp: initialExpiry,
    autoStart: false,
    onExpire: () => {
      alarmSound.play();
      if (active === "first") {
        const nextExpiry = new Date(Date.now() + getDurationMs(secondTimer));
        setActive("second");
        restart(nextExpiry);
      } else {
        const nextExpiry = new Date(Date.now() + getDurationMs(firstTimer));
        setActive("first");
        restart(nextExpiry);
      }
    },
  });

  const startEdit = (field, value) => {
    setEditing({ field });
    setInputValue(String(value).padStart(2, "0"));
  };

  const saveEdit = (field) => {
    const num = Math.max(0, Number(inputValue)) || 0;

    if (active === "first") {
      setFirstTimer({ ...firstTimer, [field]: num });
    } else {
      setSecondTimer({ ...secondTimer, [field]: num });
    }
    const duration = active === "first" ? firstTimer : secondTimer;
    const updated = { ...duration, [field]: num };
    const newExpiry = new Date(Date.now() + getDurationMs(updated));
    restart(newExpiry, false);

    setEditing({ field: null });
  };

  const handleKey = (e, field) => {
    if (e.key === "Enter") saveEdit(field);
    if (e.key === "Escape") setEditing({ field: null });
  };

  const snooze = () => {
    if (active === "first") {
      setActive("second");
      const nextExpiry = new Date(Date.now() + getDurationMs(secondTimer));
      restart(nextExpiry, true);
    }
  };

  const lockIn = () => {
    if (active === "second") {
      setActive("first");
      const nextExpiry = new Date(Date.now() + getDurationMs(firstTimer));
      restart(nextExpiry, true);
    }
  };

  const renderField = (fieldName, value) => {
    if (editing.field === fieldName) {
      return (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => saveEdit(fieldName)}
          onKeyDown={(e) => handleKey(e, fieldName)}
          autoFocus
          className="text-7xl font-sans text-center focus:outline-none w-26 h-24 text-white/60"
        />
      );
    }
    return (
      <span
        onClick={() => startEdit(fieldName, value)}
        className="cursor-pointer select-none text-8xl font-sans"
      >
        {String(value).padStart(2, "0")}
      </span>
    );
  };

  return (
    <div className="flex flex-col text-center flex-1 w-266">
      <h1 className="text-2xl tracking-widest font-bold">
        {active === "first" ? "Focus Timer" : "Relax Timer"}
      </h1>
      <div className="text-8xl flex justify-center tracking-widest gap-1 m-2">
        {renderField("minutes", minutes)}:{renderField("seconds", seconds)}
      </div>
      <div className="flex flex-col justify-center mt-5">
        <div className="flex justify-center mb-3">
          <button
            onClick={resume}
            className={`pl-5 pr-5 p-1 rounded-l-md ${
              !isRunning
                ? "bg-white/40 border-l-2 border-white/30 hover:cursor-pointer"
                : "bg-white/15"
            }`}
          >
            <img src="/images/play.png" className="h-6" />
          </button>
          <button
            onClick={pause}
            className={`pl-5 pr-5 p-1 rounded-r-md ${
              isRunning
                ? "bg-white/40 border-r-2 border-white/30 hover:cursor-pointer"
                : "bg-white/15"
            }`}
          >
            <img src="/images/pause.png" className="h-6 invert" />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={snooze}
            className={`pl-5 pr-5 p-1 rounded-l-md ${
              active === "first"
                ? "bg-white/30 border-l-2 border-white/40 hover:cursor-pointer"
                : "bg-white/15"
            }`}
          >
            <img src="/images/snooze.png" className="h-6 invert" />
          </button>
          <button
            onClick={lockIn}
            className={`pl-5 pr-5 p-1 rounded-r-md ${
              active === "second"
                ? "bg-white/30 border-r-2 border-white/40 hover:cursor-pointer"
                : "bg-white/15"
            }`}
          >
            <img src="/images/skip.png" className="h-6 invert" />
          </button>
        </div>
      </div>
    </div>
  );
}
