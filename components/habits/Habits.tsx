"use client";

import { useEffect, useState } from "react";
import Section from "./section/Section";
import styles from "./Habits.module.scss";

export type Habit = {
  id: string;
  name: string;
  type: "system" | "custom";
  streak: number;
  lastCheckIn: string | null;
};

const DEFAULT_SYSTEM_HABITS: Habit[] = [
  {
    id: "water",
    name: "Drink Water",
    type: "system",
    streak: 0,
    lastCheckIn: null,
  },
  {
    id: "workout",
    name: "Workout",
    type: "system",
    streak: 0,
    lastCheckIn: null,
  },
];

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const stored = localStorage.getItem("calorifyx_habits");
    if (stored) {
      setHabits(JSON.parse(stored));
    } else {
      setHabits(DEFAULT_SYSTEM_HABITS);
    }
  }, []);

  useEffect(() => {
    if (habits.length) {
      localStorage.setItem("calorifyx_habits", JSON.stringify(habits));
    }
  }, [habits]);

  const handleCheckIn = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        if (habit.lastCheckIn === today) return habit;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        const newStreak =
          habit.lastCheckIn === yesterdayStr ? habit.streak + 1 : 1;

        return {
          ...habit,
          streak: newStreak,
          lastCheckIn: today,
        };
      }),
    );
  };

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;

    const newItem: Habit = {
      id: crypto.randomUUID(),
      name: newHabit,
      type: "custom",
      streak: 0,
      lastCheckIn: null,
    };

    setHabits([...habits, newItem]);
    setNewHabit("");
  };

  const systemHabits = habits.filter((h) => h.type === "system");
  const customHabits = habits.filter((h) => h.type === "custom");

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Your Habits</h1>

      <Section
        title="Calorifyx Habits"
        habits={systemHabits}
        today={today}
        onCheckIn={handleCheckIn}
      />

      <div className={styles.customSection}>
        <div className={styles.addBox}>
          <input
            placeholder="Add new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={handleAddHabit} className={styles.addButton}>
            + Add Habit
          </button>
        </div>

        <Section
          title="Your Habits"
          habits={customHabits}
          today={today}
          onCheckIn={handleCheckIn}
        />
      </div>
    </div>
  );
}
