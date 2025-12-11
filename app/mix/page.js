// previously was Home, Moved from Home to its own

"use client";

import { useAudio } from "../context/AudioContext";
import VolumeSlider from "../components/Slider";
import SoundCard from "../components/SoundCard";
import Timer from "../components/Timer";
import { saveMixerPreset } from "../lib/mixerSettings";
import { useState } from "react";


export default function Focus() {
  const {
    muted,
    mainVolume,
    setMainVolume,
    windVolume,
    setWindVolume,
    fireVolume,
    setFireVolume,
    rainVolume,
    setRainVolume,
    waveVolume,
    setWaveVolume,
  } = useAudio();

  const { toggleMute } = useAudio();
  const [presetName, setPresetName] = useState("");

  const handleSavePreset = async () => {
    try {
      await saveMixerPreset(presetName, {
        mainVolume,
        windVolume,
        fireVolume,
        rainVolume,
        waveVolume,
      });
      alert("Preset saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save preset.");
    }
  };
  const effectiveVolume = (vol) => (muted ? 0 : vol);

  const sounds = [
    {
      name: "Wind",
      src: "/sounds/wind.mp3",
      image: "/images/wind.png",
      volume: windVolume,
      setVolume: setWindVolume,
    },
    {
      name: "Fire",
      src: "/sounds/fire.mp3",
      image: "/images/fireplace.png",
      volume: fireVolume,
      setVolume: setFireVolume,
    },
    {
      name: "Rain",
      src: "/sounds/rain.mp3",
      image: "/images/rain.png",
      volume: rainVolume,
      setVolume: setRainVolume,
    },
    {
      name: "Waves",
      src: "/sounds/wave.mp3",
      image: "/images/wave.png",
      volume: waveVolume,
      setVolume: setWaveVolume,
    },
  ];

  const seconds = 3000;
  const timeStamp = new Date(Date.now() + seconds * 1000);

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col bg-[#3E3E3E] flex-1 text-center p-5 max-w-6xl rounded-lg">
        <div className="mb-6">
          <h1 className="text-7xl tracking-widest font-bold">FocusFlow</h1>
          <h2 className="mt-2 tracking-[.33em]">Personalized Productivity</h2>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <button
            className="grid content-center bg-[#8BA89E] p-5 w-20 h-20 rounded-full"
            onClick={toggleMute}
          >
            <img
              src={muted ? "/images/play.png" : "/images/pause.png"}
              alt={muted ? "Muted" : "Playing"}
              width={80}
              height={80}
              className={muted ? "pl-2" : ""}
            />
          </button>

          <div className="w-48">
            <VolumeSlider
              value={mainVolume}
              onChange={(e, val) => setMainVolume(val)}
            />
          </div>
        </div>

        <div className="flex p-3 justify-around gap-12">
          {sounds.map((sound) => (
            <SoundCard
              key={sound.name}
              name={sound.name}
              src={sound.src}
              image={sound.image}
              volume={effectiveVolume(sound.volume)}
              setVolume={sound.setVolume}
              globalVolume={mainVolume}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-2 items-center">
  <input
    type="text"
    value={presetName}
    onChange={(e) => setPresetName(e.target.value)}
    placeholder="Preset name"
    className="border px-2 py-1 rounded text-black"
  />
  <button
    onClick={handleSavePreset}
    className="bg-[#8BA89E] px-3 py-1 rounded"
  >
    Save preset
  </button>
</div>

      <div className="flex flex-col bg-[#3E3E3E] flex-1 text-center p-5 max-w-6xl rounded-lg mt-8">
        <Timer expiryTimestamp={timeStamp} />
      </div>
    </main>
  );
}
