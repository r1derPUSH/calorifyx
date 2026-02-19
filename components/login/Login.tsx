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

  const [step, setStep] = useState<1 | 2>(1);
  const [goal, setGoal] = useState<"cut" | "gain" | null>(null);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "inch">("cm");

  const [weightOpen, setWeightOpen] = useState(false);
  const [heightOpen, setHeightOpen] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = () => {
    const profile = {
      name,
      weight: Number(weight),
      height: Number(height),
      weightUnit,
      heightUnit,
      goal,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("calorifyx_profile", JSON.stringify(profile));
    router.replace("/");
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.card}>
        {step === 1 && (
          <>
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
                  onClick={() => {
                    setWeightOpen((prev) => !prev);
                    setHeightOpen(false);
                  }}
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
                  onClick={() => {
                    setHeightOpen((prev) => !prev);
                    setWeightOpen(false);
                  }}
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

            <button
              type="button"
              className={styles.submitButton}
              onClick={() => {
                if (!name || !weight || !height) return;
                setStep(2);
              }}
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Your Goal</h1>

            <div className={styles.goalList}>
              <button
                type="button"
                onClick={() => setGoal("cut")}
                className={`${styles.goalButton} ${
                  goal === "cut" ? styles.active : ""
                }`}
              >
                Lose Weight
              </button>

              <button
                type="button"
                onClick={() => setGoal("gain")}
                className={`${styles.goalButton} ${
                  goal === "gain" ? styles.active : ""
                }`}
              >
                Gain Weight
              </button>
            </div>

            <button
              type="button"
              disabled={!goal}
              className={styles.submitButton}
              onClick={handleFinalSubmit}
            >
              Start
            </button>
          </>
        )}
      </form>
    </div>
  );
}
