import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        padding: "2rem",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        Welcome to focusFlow
      </h1>

      <p
        style={{
          fontSize: "1.25rem",
          opacity: 0.8,
          marginBottom: "2rem",
        }}
      >
        Select your destination:
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/mix" style={{ color: "#8BA89E", fontSize: "1.4rem" }}>
            Ambient Mixer
          </Link>
        </li>
        <li>
          <Link href="/tasks" style={{ color: "#8BA89E", fontSize: "1.4rem" }}>
            Task Manager
          </Link>
        </li><li>
          <Link href="/profile" style={{ color: "#8BA89E", fontSize: "1.4rem" }}>
            User Profile
          </Link>
        </li>
      </ul>
    </main>
  );
}