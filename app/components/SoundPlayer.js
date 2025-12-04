"use client";

import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";

export default function SoundPlayer({ src, volume = 50, globalVolume = 100 }) {
  const soundRef = useRef(null);

  useEffect(() => {
    Howler.autoSuspend = false;
  }, []);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      loop: true,
      html5: false,
      volume: (volume * globalVolume) / 10000,
    });

    soundRef.current.play();
  }, [src]);

  useEffect(() => {
    if (soundRef.current) {
      const finalVolume = (volume * globalVolume) / 10000;
      soundRef.current.volume(finalVolume);
    }
  }, [volume, globalVolume]);

  return null;
}