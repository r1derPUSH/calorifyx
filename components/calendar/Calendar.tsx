"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Calendar.module.scss";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const router = useRouter();

  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleClick = (day: number) => {
    const formatted = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    router.push(`/calendar/${formatted}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button
          className={styles.arrow}
          onClick={() => setCurrentDate(new Date(year, month - 1))}
        >
          ←
        </button>

        <h2>
          {currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          className={styles.arrow}
          onClick={() => setCurrentDate(new Date(year, month + 1))}
        >
          →
        </button>
      </div>

      <div className={styles.weekDays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className={styles.empty} />;
          }

          const isToday = isCurrentMonth && day === today.getDate();

          return (
            <button
              key={index}
              className={`${styles.cell} ${isToday ? styles.today : ""}`}
              onClick={() => handleClick(day)}
            >
              <span>{day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
