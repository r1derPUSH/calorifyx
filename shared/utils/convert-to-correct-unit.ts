export const convertWeightToKg = (value: number, unit: "kg" | "lb") => {
  if (unit === "lb") {
    return value * 0.453592;
  }
  return value;
};

export const convertHeightToCm = (value: number, unit: "cm" | "inch") => {
  if (unit === "inch") {
    return value * 2.54;
  }
  return value;
};
