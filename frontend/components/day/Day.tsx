"use client";

import styles from "./Day.module.scss";
import { useRouter } from "next/navigation";
import { useCalendarStore } from "@/shared/store/useCalendarStore";
import { useState, useEffect } from "react";

interface Props {
  date: string;
}

export default function Day({ date }: Props) {
  const router = useRouter();

  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  const { setWeight, getDay, days } = useCalendarStore();
  const existing = getDay(date);

  const [weight, setWeightInput] = useState<number | "">(
    existing?.weight ?? "",
  );

  const yesterday = new Date(parsedDate);
  yesterday.setDate(parsedDate.getDate() - 1);

  const yYear = yesterday.getFullYear();
  const yMonth = String(yesterday.getMonth() + 1).padStart(2, "0");
  const yDay = String(yesterday.getDate()).padStart(2, "0");

  const yesterdayKey = `${yYear}-${yMonth}-${yDay}`;
  const yesterdayData = days[yesterdayKey];

  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const todayWeight = existing?.weight;

  let weightDiff: number | null = null;

  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  if (todayWeight !== undefined && yesterdayData?.weight !== undefined) {
    weightDiff = todayWeight - yesterdayData.weight;
  }

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (!stored) {
      setNotes([]);
      return;
    }

    const parsed = JSON.parse(stored);
    setNotes(parsed[date] || []);
  }, [date]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSave = () => {
    if (weight !== "") {
      setWeight(date, weight);
    }
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;

    const newNotes = [...notes, noteInput.trim()];
    setNotes(newNotes);
    setNoteInput("");

    const stored = localStorage.getItem("notes");
    const parsed = stored ? JSON.parse(stored) : {};

    parsed[date] = newNotes;

    localStorage.setItem("notes", JSON.stringify(parsed));
  };

  const handleDeleteNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);

    const stored = localStorage.getItem("notes");
    const parsed = stored ? JSON.parse(stored) : {};

    parsed[date] = newNotes;

    localStorage.setItem("notes", JSON.stringify(parsed));
  };

  const formatKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const prevDate = new Date(parsedDate);
  prevDate.setDate(parsedDate.getDate() - 1);

  const nextDate = new Date(parsedDate);
  nextDate.setDate(parsedDate.getDate() + 1);

  const prevKey = formatKey(prevDate);
  const nextKey = formatKey(nextDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isFuture = nextDate > today;
  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => router.push("/calendar")}>
        ← Back
      </button>
      <div className={styles.dateNav}>
        <button
          className={styles.navBtn}
          onClick={() => router.push(`/calendar/${prevKey}`)}
        >
          ←
        </button>

        <h1 className={styles.title}>{formattedDate}</h1>

        <button
          className={styles.navBtn}
          onClick={() => router.push(`/calendar/${nextKey}`)}
          disabled={isFuture}
        >
          →
        </button>
      </div>{" "}
      <p className={styles.subtitle}>
        Track your weight, habits and notes for this day.
      </p>
      <div className={styles.mainCard}>
        <div className={styles.cardHeader}>
          <h3>Weight</h3>
          <span className={styles.unit}>kg</span>
        </div>

        <div className={styles.weightSection}>
          <div className={styles.formRow}>
            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              min={1}
              max={3}
              onChange={(e) => {
                if (e.target.value.length > 3) return;

                setWeightInput(
                  e.target.value === "" ? "" : Number(e.target.value),
                );
              }}
              className={styles.input}
            />

            <button className={styles.saveBtn} onClick={handleSave}>
              Save
            </button>
          </div>

          {todayWeight !== undefined && (
            <>
              {weightDiff !== null && (
                <div
                  className={`${styles.diff} ${
                    weightDiff > 0
                      ? styles.gain
                      : weightDiff < 0
                        ? styles.loss
                        : styles.same
                  }`}
                >
                  {weightDiff > 0 && `+${weightDiff.toFixed(2)} kg`}
                  {weightDiff < 0 && `${weightDiff.toFixed(2)} kg`}
                  {weightDiff === 0 && "No change"}
                  <span className={styles.compareLabel}> vs yesterday</span>
                </div>
              )}

              {yesterdayData?.weight === undefined && (
                <div className={styles.firstEntry}>First recorded weight</div>
              )}
            </>
          )}
        </div>
      </div>
      {todayWeight !== undefined && (
        <div className={styles.dashboard}>
          <div className={styles.card}>
            <h3>Healthy Habits</h3>
            <ul className={styles.defaultHabits}>
              <li>💧 Drink 2L of water</li>
              <li>🚶 10k steps</li>
              <li>🥗 Eat clean</li>
              <li>😴 7–8h sleep</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Notes</h3>

            <div className={styles.noteRow}>
              <input
                type="text"
                className={styles.noteInput}
                placeholder="Write something about this day..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
              />

              <button className={styles.noteBtn} onClick={handleAddNote}>
                Add
              </button>
            </div>

            {notes.length > 0 && (
              <ul className={styles.notesList}>
                {notes.map((note, index) => (
                  <li key={index} className={styles.noteItem}>
                    <span>{note}</span>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteNote(index)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.card}>
            <h3>Shopping</h3>
            <button
              className={styles.storeBtn}
              onClick={() => router.push("/shop")}
            >
              Go to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
