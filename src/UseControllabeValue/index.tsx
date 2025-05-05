import useControllableValue from "./hooks/useControllableValue";

type Props = {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  value?: Date;
};

export default function Calender(props: Props) {
  const { defaultValue, onChange, value: propsValue } = props;
  const [mergedValue, handleChange] = useControllableValue({
    defaultStateValue: new Date(),
    props: {
      value: propsValue,
      onChange,
      defaultValue,
    },
  });

  console.log(mergedValue, "mergedValue");
  return (
    <>
      <div> {mergedValue?.toLocaleDateString()} </div>
      <div
        onClick={() => {
          handleChange(new Date("2025-5-1"));
        }}
      >
        2025-5-1
      </div>
      <div
        onClick={() => {
          handleChange(new Date("2025-5-2"));
        }}
      >
        2025-5-2
      </div>
      <div
        onClick={() => {
          handleChange(new Date("2025-5-3"));
        }}
      >
        2025-5-3
      </div>
    </>
  );
}
