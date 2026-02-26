"use client";

import { useEffect, useState } from "react";
import styles from "./Nutrition.module.scss";

export default function NutritionPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    fetch("/api/food?min=100&max=500&query=pasta")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      });
  }, []);

  const handleGetFromApi = (query: string) => {
    if (!query.trim()) return;

    setLoading(true);

    fetch(`/api/food?min=100&max=500&query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nutrition</h1>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search food..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGetFromApi(searchValue);
              }
            }}
          />
          <button onClick={() => handleGetFromApi(searchValue)}>Search</button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <div className={styles.grid}>
          {foods.map((food) => (
            <div key={food.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {food.image ? (
                  <img src={food.image} alt={food.title} />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}

                <div className={styles.caloriesBadge}>{food.calories} kcal</div>
              </div>

              <div className={styles.content}>
                <h3>{food.title}</h3>

                <div className={styles.macros}>
                  <div>
                    <span>Protein</span>
                    <strong>{food.protein}g</strong>
                  </div>
                  <div>
                    <span>Fat</span>
                    <strong>{food.fat}g</strong>
                  </div>
                  <div>
                    <span>Carbs</span>
                    <strong>{food.carbs}g</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
