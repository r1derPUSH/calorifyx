"use client";

import styles from "./Day.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  date: string;
}

export default function Day({ date }: Props) {
  const router = useRouter();

  const [year, month, day] = date.split("-").map(Number);

  const parsedDate = new Date(year, month - 1, day);

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
    </div>
  );
}
