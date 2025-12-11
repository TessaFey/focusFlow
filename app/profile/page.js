"use client";
// jesus fuck theres a lot of import
import InspiroCard from "../components/InspiroCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadMixerPresets, deleteMixerPreset } from "../lib/mixerSettings";
import { useAudio } from "../context/AudioContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function ProfilePage() {
  const [presets, setPresets] = useState([]);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    setMainVolume,
    setWindVolume,
    setFireVolume,
    setRainVolume,
    setWaveVolume,
  } = useAudio();


  const fetchPresets = async () => {
    try {
      const data = await loadMixerPresets();
      setPresets(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No presets to see here, you sure you're logged in?");
    }
  };

  useEffect(() => {
    fetchPresets();
  }, []);

  const handleLoadPreset = (preset) => {
    setMainVolume(preset.mainVolume ?? 0);
    setWindVolume(preset.windVolume ?? 0);
    setFireVolume(preset.fireVolume ?? 0);
    setRainVolume(preset.rainVolume ?? 0);
    setWaveVolume(preset.waveVolume ?? 0);

    router.push("/mix");
  };

  const handleDeletePreset = async (id) => {
    try {
      await deleteMixerPreset(id);
      await fetchPresets();
    } catch (err) {
      console.error(err);
      alert("Could not delete preset.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Could not log out.");
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Your Profile</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#d66060",
            color: "white",
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      </div>


      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Saved Mixer Presets
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {presets.length === 0 && !error && (
          <p style={{ marginTop: "0.5rem" }}>
            Oops! looks like your presets are empty you silly goose! why not go make one?
          </p>
        )}

        <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
          {presets.map((preset) => (
            <li
              key={preset.id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.5rem 0",
                borderBottom: "1px solid #555",
              }}
            >
              <div>
                <strong>{preset.name}</strong>{" "}
                <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                  (Main: {preset.mainVolume ?? 0}, Wind: {preset.windVolume ?? 0}
                  , Fire: {preset.fireVolume ?? 0}, Rain: {preset.rainVolume ?? 0}
                  , Waves: {preset.waveVolume ?? 0})
                </span>
              </div>

              <div
                style={{
                  marginTop: "0.35rem",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <button
                  onClick={() => handleLoadPreset(preset)}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#8BA89E",
                    cursor: "pointer",
                  }}
                >
                  Load & Open Mixer
                </button>

                <button
                  onClick={() => handleDeletePreset(preset.id)}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#d66060",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  Delete Preset
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
{ /* Api fetch, motivational thingy from InspiroBot*/}
      <InspiroCard /> 
      <div style={{ marginTop: "2rem" }}>
        <Link href="/home" style={{ color: "lightblue" }}>
         Back to Home
        </Link>
      </div>
    </main>
  );
}
