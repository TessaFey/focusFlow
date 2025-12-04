"use client";

import { useState } from "react";
import VolumeSlider from "./Slider";

export default function SoundCard({ name, image, volume, setVolume }) {
  const [prevVolume, setPrevVolume] = useState(volume);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVolume || 25);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  return (
    <div className="bg-[#353535] p-4 rounded-lg flex-1 flex flex-col items-center">
      <button onClick={toggleMute}>
        <img
          src={image}
          alt={name}
          width={80}
          height={80}
          className={`mb-6 mt-2 hover:cursor-pointer duration-300 ease-in-out transition-opacity ${
            volume === 0 ? "opacity-30" : ""
          }`}
        />
      </button>
      <p
        className={`duration-300 ease-in-out transition-opacity ${
          volume === 0 ? "opacity-30" : ""
        }`}
      >
        {name}
      </p>
      <div className="w-48">
        <VolumeSlider value={volume} onChange={(e, val) => setVolume(val)} />
      </div>
    </div>
  );
}
