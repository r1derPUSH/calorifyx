"use client";

import styles from "@/components/homepage/Home.module.scss";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  name: string;
  weight: number;
  height: number;
  targetWeight: number;
  weightUnit: "kg" | "lb";
  heightUnit: "cm" | "inch";
  goal: "cut" | "gain" | "loss";
  createdAt: string;
};

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("calorifyx_profile");

    if (!stored) {
      router.replace("/login");
      return;
    }

    setProfile(JSON.parse(stored));
    setLoading(false);
  }, [router]);

  if (loading) return null;
  if (!profile) return null;

  const isLoss = profile.goal === "loss";

  const rawProgress = isLoss
    ? profile.weight - profile.targetWeight
    : profile.targetWeight - profile.weight;

  const progress = Math.abs(Number(rawProgress.toFixed(1)));

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Hello, {profile.name}</h1>

        <div className={styles.stats}>
          <div className={styles.statBox}>
            <span>Current Weight</span>
            <strong>
              {profile.weight} {profile.weightUnit}
            </strong>
          </div>

          <div className={styles.statBox}>
            <span>Target Weight</span>
            <strong>
              {profile.targetWeight.toFixed(2)} {profile.weightUnit}
            </strong>
          </div>

          <div className={styles.statBox}>
            <span>Height</span>
            <strong>
              {profile.height} {profile.heightUnit}
            </strong>
          </div>

          <div className={styles.statBox}>
            <span>Goal</span>
            <strong>
              {profile.goal === "loss"
                ? "Lose Weight"
                : profile.goal === "gain"
                  ? "Gain Weight"
                  : "Build Muscle"}
            </strong>
          </div>
        </div>

        <div className={styles.progressBox}>
          You need to {isLoss ? "lose" : "gain"} {progress} {profile.weightUnit}
        </div>
      </div>
    </div>
  );
}
