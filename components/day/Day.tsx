"use client";

import styles from "./Day.module.scss";
import { useRouter } from "next/navigation";
import { useCalendarStore } from "@/shared/store/useCalendarStore";
import { useState } from "react";

interface Props {
  date: string;
}

export default function Day({ date }: Props) {
  const router = useRouter();

  const [year, month, day] = date.split("-").map(Number);

  const parsedDate = new Date(year, month - 1, day);

  const { setWeight, getDay } = useCalendarStore();

  const existing = getDay(date);

  const [weight, setWeightInput] = useState<number | "">(
    existing?.weight ?? "",
  );

  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => router.push("/calendar")}>
        ← Back
      </button>

      <h1>{formattedDate}</h1>

      <p>This is your daily overview.</p>
      <p>You will track weight, calories and habits here.</p>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Weight</h3>
          <span className={styles.unit}>kg</span>
        </div>

        <div className={styles.inputRow}>
          <input
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) =>
              setWeightInput(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className={styles.input}
          />

          <button
            className={styles.saveBtn}
            onClick={() => {
              if (weight !== "") {
                setWeight(date, weight);
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
