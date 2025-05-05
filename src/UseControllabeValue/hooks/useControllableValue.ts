import {
  SetStateAction,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import usePrevious from "../../hooks/usePrevious";

type Props<T> = {
  defaultStateValue: T;
  props: {
    defaultValue?: T;
    onChange?: (date: T) => void;
    value?: T;
  };
};

export default function <T>(
  params: Props<T>
): [T, (date: SetStateAction<T>) => void] {
  const {
    defaultStateValue,
    props: { defaultValue, onChange, value: propsValue },
  } = params;

  const isUncontrolled = propsValue === undefined;
  const isFirstRender = useRef(true);
  const previousPropValue = usePrevious(propsValue);

  const [dateValue, setDateValue] = useState<T>(() => {
    if (!isUncontrolled) {
      return propsValue;
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      return defaultStateValue;
    }
  });

  useEffect(() => {
    if (
      !isFirstRender.current &&
      propsValue === undefined &&
      previousPropValue !== undefined
    ) {
      setDateValue(propsValue!);
      console.log("useEffect setDateValue");
    }
    isFirstRender.current = false;
  }, [propsValue, previousPropValue]);

  const handleChange = useCallback(
    (date: SetStateAction<T>) => {
      if (propsValue === undefined) {
        setDateValue(date);
      }
      const value =
        typeof date === "function"
          ? (date as (prevState: T) => T)(dateValue)
          : date;
      onChange?.(value);
    },
    [dateValue, onChange, propsValue]
  );

  const mergedValue = isUncontrolled ? dateValue : propsValue;
  return [mergedValue, handleChange];
}
