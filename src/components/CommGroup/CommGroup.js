import { useState } from "react";

import "./CommGroup.scss";
import DateCounter from "../DateCounter/DateCounter";

const CommGroup = ({ data, id, drawerState }) => {

  const loadState = drawerState["show" + id];
  const [showCalendar, setShowCalendar] = useState(loadState || false);

  const toggleCalendar = () => {
    const currentLocalStore = JSON.parse(localStorage.getItem("drawerState"));
    localStorage.setItem("drawerState", JSON.stringify({
      ...currentLocalStore,
      ["show" + id]: !showCalendar
    }));
    
    setShowCalendar(!showCalendar);
  }

  const isEmpty = data.total === 0;
  const commName = getCommName(data.name);
  const dates = makeDates(data.dates);

  return (
    <article className={`CommGroup ${isEmpty ? "CommGroup__empty" : ""}`}>
      <header className="CommGroup__header" onClick={toggleCalendar}>
        <div className="CommGroup__headerTitle">
          <h4 className="CommGroup__name">{commName}</h4>
          <p className="CommGroup__total">{data.total}</p>
        </div>
        <div>
          {!showCalendar && <i className="fas fa-plus"></i>}
          {showCalendar && <i className="fas fa-minus"></i>}
        </div>
      </header>
      {!isEmpty && showCalendar && (
        <ul className="CommGroup__list">
          {dates.map((day, i) => <DateCounter data={day} key={"dateCounter_" + i} />)}
        </ul>)
      }
      {isEmpty && showCalendar && (
        <p className="CommGroup__noneText">Nothing to show</p>
      )}
    </article>
  );
};

export default CommGroup;

function getCommName(name) {
  switch(name) {
    case "Communities":
      return "High-risk Postal Codes";
    case "High":
      return "Transplant & Cancer Treatment Recipients";
    case "IndigenousAdults":
      return "First Nations, Métis and Inuit Adults";
    case "Special":
      return "Special Populations & Chronic Conditions";
    case "HealthComm":
      return "Healthcare Workers & Community Providers"
    default:
      return name;
  }
}

function makeDates(data) {
  const output = [];

  for (const day in data) {
    output.push({
      date: day,
      count: data[day]
    })
  }

  output.sort((a, b) => a.date - b.date);

  return output;
}