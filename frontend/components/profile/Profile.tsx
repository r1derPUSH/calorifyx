"use client";

import { useEffect, useState } from "react";
import styles from "./Profile.module.scss";

interface Profile {
  name: string;
  weight: number;
  height: number;
  targetWeight: number;
  weightUnit: string;
  heightUnit: string;
  goal: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("calorifyx_profile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (!profile) return;

    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]:
        name === "weight" || name === "targetWeight" || name === "height"
          ? Number(value)
          : value,
    });
  };

  const handleSave = () => {
    if (!profile) return;

    localStorage.setItem("calorifyx_profile", JSON.stringify(profile));

    setIsEditing(false);
  };

  if (!profile) {
    return <div className={styles.empty}>No profile found in localStorage</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>{profile.name}</h2>

          {!isEditing && (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>

        <div className={styles.grid}>
          <div>
            <label>Current Weight</label>
            {isEditing ? (
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
              />
            ) : (
              <p>
                {profile.weight.toFixed(2)} {profile.weightUnit}
              </p>
            )}
          </div>

          <div>
            <label>Target Weight</label>
            {isEditing ? (
              <input
                type="number"
                name="targetWeight"
                value={profile.targetWeight}
                onChange={handleChange}
              />
            ) : (
              <p>
                {profile.targetWeight.toFixed(2)} {profile.weightUnit}
              </p>
            )}
          </div>

          <div>
            <label>Height</label>
            {isEditing ? (
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
              />
            ) : (
              <p>
                {profile.height} {profile.heightUnit}
              </p>
            )}
          </div>

          <div>
            <label>Goal</label>
            {isEditing ? (
              <select name="goal" value={profile.goal} onChange={handleChange}>
                <option value="loss">Loss</option>
                <option value="gain">Gain</option>
                <option value="muscle">Muscle</option>
              </select>
            ) : (
              <p>{profile.goal}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <button className={styles.saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}
