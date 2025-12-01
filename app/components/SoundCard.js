"use client";

import { useState } from "react";
import Image from "next/image";
import VolumeSlider from "./Slider";
import SoundPlayer from "./SoundPlayer";

export default function SoundCard({
  name,
  src,
  image,
  volume,
  setVolume,
  globalVolume,
}) {
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
    <div className="bg-black/30 p-4 rounded-lg flex-1 flex flex-col items-center">
      <button onClick={toggleMute}>
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className={`invert mb-6 mt-2 hover:cursor-pointer duration-900 ease-in-out ${
            volume === 0 ? "opacity-30" : ""
          }`}
        />
      </button>
      <p>{name}</p>
      <div className="w-48">
        <VolumeSlider value={volume} onChange={(e, val) => setVolume(val)} />
        <SoundPlayer src={src} volume={volume} globalVolume={globalVolume} />
      </div>
    </div>
  );
}
