"use client";

import { useEffect, useState } from "react";

export default function InspiroCard() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInspiroImage = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://inspirobot.me/api?generate=true");
      if (!res.ok) throw new Error("Failed to contact InspiroBot.");

      const url = await res.text();
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      setError("Could not load an InspiroBot poster right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        padding: "1.5rem",
        borderRadius: "12px",
        backgroundColor: "#3E3E3E",
      }}
    >
      <h2
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        Need some motivation?
      </h2>

      {loading && <p>Generating wisdom from the digital void…</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {imageUrl && !loading && !error && (
        <div
          style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #555",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <img
            src={imageUrl}
            alt="InspiroBot generated quote"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      )}

      <button
        onClick={fetchInspiroImage}
        style={{
          padding: "0.5rem 1.2rem",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#8BA89E",
          color: "black",
          cursor: "pointer",
          fontWeight: "600",
          marginTop: "0.5rem",
        }}
      >
        Generate Motivation
      </button>
    </section>
  );
}
