"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";

export default function SoundPlayer({ src, volume = 50, globalVolume = 100 }) {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      loop: true,
      volume: (volume * globalVolume) / 10000,
    });

    soundRef.current.play();

    return () => {
      soundRef.current.unload();
    };
  }, [src]);

  useEffect(() => {
    if (soundRef.current) {
      const finalVolume = (volume * globalVolume) / 10000;
      soundRef.current.volume(finalVolume);
    }
  }, [volume, globalVolume]);

  return null;
}
