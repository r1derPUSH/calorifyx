import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DayData {
  weight?: number;
  calories?: number;
  habits?: string[];
}

interface CalendarState {
  days: Record<string, DayData>;

  setWeight: (date: string, weight: number) => void;
  getDay: (date: string) => DayData | undefined;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      days: {},

      setWeight: (date, weight) =>
        set((state) => ({
          days: {
            ...state.days,
            [date]: {
              ...state.days[date],
              weight,
            },
          },
        })),

      getDay: (date) => get().days[date],
    }),
    {
      name: "calorifyx-calendar",
    },
  ),
);
