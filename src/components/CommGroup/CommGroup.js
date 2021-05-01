import "./CommGroup.scss";

const CommGroup = ({ data }) => {
  
  const isEmpty = data.total === 0;
  const commName = getCommName(data.name);

  return (
    <article className={`CommGroup ${isEmpty ? "CommGroup__empty" : ""}`}>
      <header className="CommGroup__header">
        <h4 className="CommGroup__name">{commName}</h4>
        <p className="CommGroup__total">{data.total}</p>
      </header>
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