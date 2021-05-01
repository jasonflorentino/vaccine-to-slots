import { useState } from "react";

import CommGroup from '../CommGroup/CommGroup';
import "./Clinic.scss";

const Clinic = ({ clinic }) => {

  const [showCommGroup, setShowCommGroup] = useState(false);
  const toggleCommGroup = () => {
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
        <div>
          <h2 className="Clinic__name">🏥 {clinic.name}</h2>
          <h3 className="Clinic__total">Total {clinicTotal}</h3>
        </div>
        <div>
          {!showCommGroup && <i class="far fa-plus-square"></i>}
          {showCommGroup && <i class="far fa-minus-square"></i>}
        </div>
      </header>
      {showCommGroup && commGroupData.map((commGroup, i) => <CommGroup data={commGroup} key={"commGroup_" + i} />)}
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