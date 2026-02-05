import { useEffect, useRef, useState } from "react";

const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        // Hysteresis 적용: 나타날 때와 사라질 때의 기준을 다르게 설정
        setIsVisible((prev) => {
          if (!prev && ratio >= 0.4) return true;
          if (prev && ratio <= 0.2) return false; 
          return prev;
        });
      },
      {
        threshold: [0, 0.2, 0.4, 1],
        rootMargin: "0px 0px -150px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export default useScrollAnimation;
