"use client";
import { Slider } from "@mui/material";

export default function VolumeSlider({ value, onChange })
{
    return(
        <Slider
        value={value}
        onChange={onChange}
        min={0}
        max={100}
        aria-label="volume"
        color="#ffffff"
        />
    );
}