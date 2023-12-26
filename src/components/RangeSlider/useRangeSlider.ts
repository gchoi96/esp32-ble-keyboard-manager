import { useState } from "react";

const useRangeSlider: () => [
  number[],
  (_: Event, newValue: number | number[], __: number) => void
] = () => {
  const [value, setValue] = useState([0, 0]);
  const handleChange = (_: Event, newValue: number | number[], __: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setValue(newValue);
  };

  return [value, handleChange];
};

export default useRangeSlider;
