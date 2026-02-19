"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.scss";

export default function Login() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile = {
      name,
      weight: Number(weight),
      height: Number(height),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("calorifyx_profile", JSON.stringify(profile));

    router.replace("/");
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1>Welcome to Calorifyx</h1>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Current weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />

        <button type="submit">Start</button>
      </form>
    </div>
  );
}
