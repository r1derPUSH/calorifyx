"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.scss";
import {
  convertHeightToCm,
  convertWeightToKg,
} from "@/shared/utils/convert-to-correct-unit";

export default function Login() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "inch">("cm");

  const [weightOpen, setWeightOpen] = useState(false);
  const [heightOpen, setHeightOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightNumber = Number(weight);
    const heightNumber = Number(height);

    const profile = {
      name,
      weight: weightNumber,
      height: heightNumber,
      weightUnit,
      heightUnit,
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
        <div className={styles.inputRow}>
          <input
            type="number"
            placeholder="Current weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />

          <div className={styles.select}>
            <button
              type="button"
              onClick={() => setWeightOpen(!weightOpen)}
              className={`${styles.selectButton} ${weightOpen ? styles.open : ""}`}
            >
              <span>{weightUnit}</span>
              <span className={styles.arrow}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </button>

            {weightOpen && (
              <div className={styles.dropdown}>
                <div
                  onClick={() => {
                    setWeightUnit("kg");
                    setWeightOpen(false);
                  }}
                >
                  kg
                </div>

                <div
                  onClick={() => {
                    setWeightUnit("lb");
                    setWeightOpen(false);
                  }}
                >
                  lb
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.inputRow}>
          <input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />

          <div className={styles.select}>
            <button
              type="button"
              onClick={() => setHeightOpen(!heightOpen)}
              className={`${styles.selectButton} ${heightOpen ? styles.open : ""}`}
            >
              <span>{heightUnit}</span>
              <span className={styles.arrow}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </button>

            {heightOpen && (
              <div className={styles.dropdown}>
                <div
                  onClick={() => {
                    setHeightUnit("cm");
                    setHeightOpen(false);
                  }}
                >
                  cm
                </div>

                <div
                  onClick={() => {
                    setHeightUnit("inch");
                    setHeightOpen(false);
                  }}
                >
                  inch
                </div>
              </div>
            )}
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Start
        </button>
      </form>
    </div>
  );
}
