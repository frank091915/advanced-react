// import { useState } from "react";
import "./App.css";

import UseControllabeValue from "./UseControllabeValue";

function App() {
  // const [date, setDateValue] = useState<Date>(new Date("2025-5-1"));
  const onChange = () => {
    console.log("onChange");
  };
  return (
    <>
      {/* <UseControllabeValue value={date} onChange={setDateValue} /> */}
      <UseControllabeValue onChange={onChange} />
    </>
  );
}

export default App;
