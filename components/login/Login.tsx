"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.scss";

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

  const [targetWeight, setTargetWeight] = useState("");

  const currentWeight = Number(weight);
  const target = Number(targetWeight);

  const weightRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);

  const isInvalid =
    target <= 0 ||
    (goal === "cut" && target >= currentWeight) ||
    (goal === "gain" && target <= currentWeight);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = () => {
    const profile = {
      name,
      weight: Number(weight),
      height: Number(height),
      targetWeight: Number(targetWeight),
      weightUnit,
      heightUnit,
      goal,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("calorifyx_profile", JSON.stringify(profile));
    router.replace("/");
  };

  useEffect(() => {
    if (!weight) return;

    const current = Number(weight);

    if (goal === "cut") {
      setTargetWeight(String(current - 5));
    }

    if (goal === "gain") {
      setTargetWeight(String(current + 5));
    }
  }, [goal, weight]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (weightRef.current && !weightRef.current.contains(target)) {
        setWeightOpen(false);
      }

      if (heightRef.current && !heightRef.current.contains(target)) {
        setHeightOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWeightOpen(false);
        setHeightOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

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

              <div className={styles.select} ref={weightRef}>
                <button
                  type="button"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setWeightOpen(false);
                    }
                  }}
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
                    <button
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setWeightUnit("kg");
                        setWeightOpen(false);
                      }}
                    >
                      kg
                    </button>

                    <button
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setWeightUnit("lb");
                        setWeightOpen(false);
                      }}
                    >
                      lb
                    </button>
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

              <div className={styles.select} ref={heightRef}>
                <button
                  type="button"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setHeightOpen(false);
                    }
                  }}
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
                    <button
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setHeightUnit("cm");
                        setHeightOpen(false);
                      }}
                    >
                      cm
                    </button>

                    <button
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setHeightUnit("inch");
                        setHeightOpen(false);
                      }}
                    >
                      inch
                    </button>
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
            <div className={styles.stepHeader}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className={styles.backButton}
              >
                ← Back
              </button>
            </div>

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

            {goal && (
              <div className={styles.targetInputRow}>
                <input
                  type="number"
                  placeholder="Target weight"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                />

                <div className={styles.unitLabel}>{weightUnit}</div>
              </div>
            )}

            <button
              type="button"
              disabled={!goal || !targetWeight || isInvalid}
              onClick={handleFinalSubmit}
              className={styles.submitButton}
            >
              Start
            </button>
          </>
        )}
      </form>
    </div>
  );
}
