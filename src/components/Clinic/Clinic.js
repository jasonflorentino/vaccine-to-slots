import { useState } from "react";

import CommGroup from '../CommGroup/CommGroup';
import "./Clinic.scss";

const Clinic = ({ clinic, id }) => {

  const drawerState = JSON.parse(localStorage.getItem("drawerState")) || {};
  const loadState = drawerState["show" + id];
  
  const [showCommGroup, setShowCommGroup] = useState(loadState || false);

  const toggleCommGroup = () => {
    const currentLocalStore = JSON.parse(localStorage.getItem("drawerState"));
    localStorage.setItem("drawerState", JSON.stringify({
      ...currentLocalStore,
      ["show" + id]: !showCommGroup
    }));

    setShowCommGroup(!showCommGroup);
  }

  const [ clinicTotal, groups ] = countTotals(clinic.availabilities);
  const commGroupData = [];

  for (const group in groups) {
    commGroupData.push({
      name: group,
      total: groups[group],
      dates: clinic.availabilities[group]
    })
  }

  const isEmpty = clinicTotal === 0;

  return (
    <section className={`Clinic ${isEmpty ? "Clinic__empty" : ""}`}>
      <header className="Clinic__header" onClick={toggleCommGroup}>
        <div className="Clinic__nameContainer">
          <h2 className="Clinic__name">🏥  &nbsp;{clinic.name}</h2>
          <h3 className="Clinic__total">Total {clinicTotal}</h3>
        </div>
        <div>
          {!showCommGroup && <i className="far fa-plus-square"></i>}
          {showCommGroup && <i className="far fa-minus-square"></i>}
        </div>
      </header>
      {showCommGroup && commGroupData.map((commGroup, i) => {
        const commGroupId = id + "commGroup_" + i + commGroup.name.replace(/\s/g, "");
        return <CommGroup data={commGroup} id={commGroupId} drawerState={drawerState} key={commGroupId} />
      })}
    </section>
  );
};

export default Clinic;

function countTotals(data) {
  let clinicTotal = 0;
  let groupTotals = {};

  for (const group in data) {
    const keys = Object.keys(data[group]);

    for (const day of keys) {
      if (groupTotals[group] === undefined) {
        groupTotals[group] = data[group][day]
      } else {
        groupTotals[group] += data[group][day]
      }

      clinicTotal += data[group][day];
    }
  }

  return [clinicTotal, groupTotals];
}