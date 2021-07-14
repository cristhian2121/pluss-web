import React, { useState, useEffect } from "react";

const useDelayInput = (initialValue, delay) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const delayTime = setTimeout(() => {
      setNewValue(currentValue);
    }, delay);
    return () => {
      return clearTimeout(delayTime);
    };
  }, [currentValue, delay]);

  return [newValue, setCurrentValue];
};

export default useDelayInput;
