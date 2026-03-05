"use client";

import { useEffect, useState } from "react";
import styles from "./Goal.module.scss";

type Profile = {
  weight: number;
  targetWeight: number;
  weightUnit: "kg" | "lb";
  goal: "loss" | "gain" | "muscle";
};

export default function GoalPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("calorifyx_profile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  if (!profile) {
    console.log("Profile is null");
    return null;
  }
  const startWeight = profile.weight;

  const targetWeight = profile.targetWeight;

  let currentWeight = startWeight;

  const calendarRaw = localStorage.getItem("calorifyx-calendar");

  if (calendarRaw) {
    const calendar = JSON.parse(calendarRaw);
    const days = calendar?.state?.days || {};

    const dates = Object.keys(days);

    if (dates.length > 0) {
      const lastDate = dates.reduce((latest, current) =>
        new Date(current) > new Date(latest) ? current : latest,
      );

      currentWeight = days[lastDate]?.weight ?? startWeight;
    }

    console.log("Calendar raw:", calendarRaw);
    console.log("Parsed:", JSON.parse(calendarRaw));

    console.log("Days:", days);
    console.log("Dates:", dates);
  }

  const isLoss = profile.goal === "loss";

  const totalDistance = Math.abs(targetWeight - startWeight);
  const progressDistance = Math.abs(currentWeight - startWeight);
  const remainingDistance = Math.abs(targetWeight - currentWeight);

  const progressPercent =
    totalDistance === 0 ? 100 : (progressDistance / totalDistance) * 100;

  const remaining = Math.abs(Number(remainingDistance.toFixed(1)));

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Your Goal</h1>

        <div className={styles.goalBox}>
          <h2>
            {profile.goal === "loss"
              ? "Lose Weight"
              : profile.goal === "gain"
                ? "Gain Weight"
                : "Build Muscle"}
          </h2>

          <p>
            You need to {isLoss ? "lose" : "gain"}{" "}
            <strong>
              {remaining} {profile.weightUnit}
            </strong>{" "}
            more
          </p>
        </div>

        <div className={styles.progressWrapper}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
