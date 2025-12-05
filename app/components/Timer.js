"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { useAudio } from "../context/AudioContext";

export default function DualTimer() {
  const {
    isTimerActive,
    timeRemaining,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setTimerCompleteCallback,
  } = useAudio();

  const alarmSoundRef = useRef(null);

  const [firstTimer, setFirstTimer] = useState({
    hours: 0,
    minutes: 50,
    seconds: 0,
  });
  const [secondTimer, setSecondTimer] = useState({
    hours: 0,
    minutes: 10,
    seconds: 0,
  });

  const [active, setActive] = useState("first");
  const [editing, setEditing] = useState({ field: null });
  const [inputValue, setInputValue] = useState("");

  const getDurationSeconds = ({ hours, minutes, seconds }) =>
    hours * 3600 + minutes * 60 + seconds;

  // Calculate display minutes and seconds from remaining time
  const displayMinutes = Math.floor(timeRemaining / 60);
  const displaySeconds = timeRemaining % 60;

  // Initialize alarm sound only once
  useEffect(() => {
    if (!alarmSoundRef.current) {
      alarmSoundRef.current = new Howl({
        src: ["/sounds/alarm.mp3"],
        volume: 0.2,
        html5: true,
      });
    }

    return () => {
    };
  }, []);

  // Handle timer completion
  useEffect(() => {
    setTimerCompleteCallback(() => {
      if (alarmSoundRef.current) {
        alarmSoundRef.current.play();
      }

      // Switch timers
      if (active === "first") {
        setActive("second");
        const duration = getDurationSeconds(secondTimer);
        startTimer(duration);
      } else {
        setActive("first");
        const duration = getDurationSeconds(firstTimer);
        startTimer(duration);
      }
    });
  }, [active, firstTimer, secondTimer]);

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
    const newDuration = getDurationSeconds(updated);
    resetTimer(newDuration);

    setEditing({ field: null });
  };

  const handleKey = (e, field) => {
    if (e.key === "Enter") saveEdit(field);
    if (e.key === "Escape") setEditing({ field: null });
  };

  const toggleTimer = () => {
    if (isTimerActive) {
      pauseTimer();
    } else if (
      timeRemaining ===
      getDurationSeconds(active === "first" ? firstTimer : secondTimer)
    ) {
      // Starting fresh
      const duration = getDurationSeconds(
        active === "first" ? firstTimer : secondTimer
      );
      startTimer(duration);
    } else {
      // Resuming from pause
      resumeTimer();
    }
  };

  const snooze = () => {
    if (active === "first") {
      setActive("second");
      const duration = getDurationSeconds(secondTimer);
      resetTimer(duration);
      startTimer(duration);
    }
  };

  const lockIn = () => {
    if (active === "second") {
      setActive("first");
      const duration = getDurationSeconds(firstTimer);
      resetTimer(duration);
      startTimer(duration);
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
          className="text-7xl font-sans text-center focus:outline-none w-26 h-24 text-white/60 bg-transparent"
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
        {renderField("minutes", displayMinutes)}:
        {renderField("seconds", displaySeconds)}
      </div>
      <div className="flex flex-col justify-center mt-5">
        <div className="flex justify-center mb-3">
          <button
            onClick={toggleTimer}
            className={`pl-5 pr-5 p-1 rounded-l-md ${
              !isTimerActive
                ? "bg-[#8BA89E] border-l-2 border-white/30 hover:cursor-pointer"
                : "bg-[#353535]"
            }`}
          >
            <img src="/images/play.png" className="h-6" />
          </button>
          <button
            onClick={pauseTimer}
            className={`pl-5 pr-5 p-1 rounded-r-md ${
              isTimerActive
                ? "bg-[#8BA89E] border-r-2 border-white/30 hover:cursor-pointer"
                : "bg-[#353535]"
            }`}
          >
            <img src="/images/pause.png" className="h-6" />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={snooze}
            className={`pl-5 pr-5 p-1 rounded-l-md ${
              active === "first"
                ? "bg-[#8BA89E] border-l-2 border-white/40 hover:cursor-pointer"
                : "bg-[#353535]"
            }`}
          >
            <img src="/images/snooze.png" className="h-6" />
          </button>
          <button
            onClick={lockIn}
            className={`pl-5 pr-5 p-1 rounded-r-md ${
              active === "second"
                ? "bg-[#8BA89E] border-r-2 border-white/40 hover:cursor-pointer"
                : "bg-[#353535]"
            }`}
          >
            <img src="/images/skip.png" className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
