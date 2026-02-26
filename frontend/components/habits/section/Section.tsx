"use client";

import HabitCard from "../habit-card/HabitCard";
import type { Habit } from "../Habits";
import styles from "../Habits.module.scss";

type Props = {
  title: string;
  habits: Habit[];
  today: string;
  onCheckIn: (id: string) => void;
};

export default function Section({ title, habits, today, onCheckIn }: Props) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.grid}>
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            today={today}
            onCheckIn={onCheckIn}
          />
        ))}
      </div>
    </div>
  );
}
