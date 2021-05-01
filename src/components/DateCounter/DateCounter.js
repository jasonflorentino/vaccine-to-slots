import './DateCounter.scss';

const DateCounter = ({ data }) => {

  const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' }
  const date = new Date(data.date).toLocaleDateString('en-US', dateOptions)

  const isEmpty = data.count === 0;

  return (
    <li className={`DateCounter ${isEmpty ? "DateCounter__empty" : ""}`}>
      <h5 className={`DateCounter__date${addDayClass(date)}`}>{date}</h5>
      <p className={`DateCounter__count${addDayClass(date)}`}>{data.count}</p>
    </li>
  );

  function addDayClass(date) {
    const isWeekend = date.includes("Saturday") || date.includes("Sunday")
    return isWeekend ? "--weekend" : "";
  }
};

export default DateCounter;