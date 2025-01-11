import { useEffect } from "react";
import { useState } from "react";

const useSlider = (data) => {
  const data_length = data.length;
  const [current, setCurrent] = useState(0);
  const [slideData, setSlideData] = useState({});

  useEffect(() => {
    setSlideData(data[current]);
  }, [current]);

  const nextSlide = () => {
    current < data_length - 1 ? setCurrent(current + 1) : null;
  };
  const prevSlide = () => {
    current == 0 ? null : setCurrent(current - 1);
  };

  const setSlide = (idx) => {
    setCurrent(idx);
  };

  return { nextSlide, prevSlide, slideData, current, setSlide };
};

export default useSlider;
