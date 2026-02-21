"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCalendarStore } from "@/shared/store/useCalendarStore";
import styles from "./Calendar.module.scss";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();
  const { days } = useCalendarStore();

  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const formatDateKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0",
    )}`;

  const handleClick = (day: number) => {
    router.push(`/calendar/${formatDateKey(day)}`);
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
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className={styles.empty} />;
          }

          const dateKey = formatDateKey(day);
          const dayData = days[dateKey];

          let diff: number | null = null;

          if (dayData?.weight !== undefined) {
            const currentDateObj = new Date(year, month, day);
            const prevDate = new Date(currentDateObj);
            prevDate.setDate(currentDateObj.getDate() - 1);

            const prevKey = `${prevDate.getFullYear()}-${String(
              prevDate.getMonth() + 1,
            ).padStart(2, "0")}-${String(prevDate.getDate()).padStart(2, "0")}`;

            const prevData = days[prevKey];

            if (prevData?.weight !== undefined) {
              diff = dayData.weight - prevData.weight;
            }
          }

          const isToday = isCurrentMonth && day === today.getDate();

          return (
            <button
              key={index}
              onClick={() => handleClick(day)}
              className={`${styles.cell} ${isToday ? styles.today : ""}`}
            >
              <div className={styles.cellInner}>
                <div className={styles.dayNumber}>{day}</div>

                {dayData?.weight !== undefined && (
                  <div className={styles.weightBadge}>
                    <span className={styles.weightValue}>
                      {dayData.weight} kg
                    </span>

                    {diff !== null && diff !== 0 && (
                      <span
                        className={`${styles.diff} ${
                          diff > 0 ? styles.gain : styles.loss
                        }`}
                      >
                        ({diff > 0 ? `+${diff}` : diff})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
