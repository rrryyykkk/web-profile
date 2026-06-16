import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(
  options: IntersectionObserverInit = {},
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Stabilize the options object so it doesn't re-create the observer on every render,
  // which would trigger forced reflows via IntersectionObserver churn.
  const thresholdRef = useRef(options.threshold ?? 0.1);
  const rootMarginRef = useRef(options.rootMargin ?? "0px");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: thresholdRef.current, rootMargin: rootMarginRef.current },
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return [ref, isVisible];
}
