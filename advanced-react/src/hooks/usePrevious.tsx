import { useEffect, useRef } from "react";

export default function usePrevious<T>(val: T): T {
  const ref = useRef<T>(val);

  useEffect(() => {
    ref.current = val;
  });

  return ref.current;
}
