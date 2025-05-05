import React, { useImperativeHandle } from 'react';
import './index.scss';
import { useControllableValue } from 'ahooks';

const MonthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

const getDaysOfMonth = (date: Date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const firstDayOfMonth = (date: Date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export interface CalenderRef {
  getState: () => Date;
  setState: (date: Date) => void;
}

interface CalenderProps {
  value: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

const IntercalCalender: React.ForwardRefRenderFunction<CalenderRef, CalenderProps> = (props: CalenderProps, ref) => {
  const { defaultValue = new Date(), onChange } = props;
  const [currentDate, setCurrentDate] = useControllableValue<Date>({ props, defaultValue });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const fullDateString = `${currentYear}年${MonthNames[currentMonth]}`;

  useImperativeHandle(ref, () => {
    return {
      getState: () => currentDate,
      setState: (date: Date) => setCurrentDate(date)
    };
  });

  const handleClickLeft = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };
  const handleClickRight = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  const rederDays = (date: Date = new Date()) => {
    const days = [];
    const totlaDays = getDaysOfMonth(date);
    const firstDay = firstDayOfMonth(date);
    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="empty" key={'empty' + i}></div>);
    }
    // 这里要的就是从1开始，所以i初始值赋为1
    for (let i = 1; i <= totlaDays; i++) {
      const handleClick = () => {
        const selectedDate = new Date(date.getFullYear(), date.getMonth(), i);
        setCurrentDate(selectedDate);
        onChange?.(date);
      };
      const isSelected = i === currentDate.getDate();
      const className = `day${isSelected ? ' selected' : ''}`;
      days.push(
        <div
          className={className}
          onClick={() => {
            handleClick();
          }}
          key={'days' + i}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handleClickLeft}>&lt;</button>
        <div>{fullDateString}</div>
        <button onClick={handleClickRight}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {rederDays(currentDate)}
      </div>
    </div>
  );
};

const Calender = React.forwardRef(IntercalCalender);

export default Calender;
