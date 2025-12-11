"use client";

import { useAudio } from "./context/AudioContext";
import VolumeSlider from "./components/Slider";
import SoundCard from "./components/SoundCard";
import Timer from "./components/Timer";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>focusFlow – Study Sound Mixer</h1>
      <AuthForm />
    </main>
  );
}


