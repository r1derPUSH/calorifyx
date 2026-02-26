"use client";

import type { Habit } from "../Habits";
import styles from "../Habits.module.scss";

type Props = {
  habit: Habit;
  today: string;
  onCheckIn: (id: string) => void;
};

export default function HabitCard({ habit, today, onCheckIn }: Props) {
  const checkedToday = habit.lastCheckIn === today;

  const getStatus = () => {
    if (habit.streak >= 14) return "Established 🏆";
    if (habit.streak >= 7) return "Building 🔥";
    return "Starting";
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <h3>{habit.name}</h3>
        <span className={styles.streak}>🔥 {habit.streak}</span>
      </div>

      <div className={styles.status}>{getStatus()}</div>

      <button
        onClick={() => onCheckIn(habit.id)}
        disabled={checkedToday}
        className={`${styles.button} ${checkedToday ? styles.completed : ""}`}
      >
        {checkedToday ? "Completed" : "Check In"}
      </button>
    </div>
  );
}
