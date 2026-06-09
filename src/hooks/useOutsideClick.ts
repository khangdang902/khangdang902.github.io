import { useEffect, useRef, useState } from "react";

type UseOutsideClickReturn<E> = [(ref: E) => E, boolean];

function useOutsideClick<
  E extends HTMLElement | null = HTMLElement,
>(): UseOutsideClickReturn<E> {
  const elementRef = useRef<E>(null);
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (!elementRef.current?.contains(event.target as Node)) {
        setIsOutsideClick(true);
      } else {
        setIsOutsideClick(false);
      }
    }
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  });

  function assignRef(ref: E) {
    return (elementRef.current = ref);
  }

  return [assignRef, isOutsideClick];
}

export default useOutsideClick;
