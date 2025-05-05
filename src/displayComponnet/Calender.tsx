import React, { useEffect, useRef, useState } from 'react';
import Calender from '@/components/Calender';
import { CalenderRef } from '@/components/Calender';
function index() {
  const calenderRef = useRef<CalenderRef>(null);
  const [date, setDate] = useState<Date>(new Date());
  const onChange = (date: Date) => {
    console.log('controlled onChange', date);
    setDate(date);
  };
  useEffect(() => {
    calenderRef.current?.getState();
    setTimeout(() => {
      calenderRef.current?.setState(new Date(2028, 8, 8));
    }, 3000);
  }, []);
  return <Calender ref={calenderRef} value={date} defaultValue={new Date(2026, 6, 6)} onChange={onChange} />;
}

export default index;
