import { useState, useEffect } from 'react';

import './App.scss';
import utils from './utilities/utils';
import Header from './components/Header/Header';
import Clinic from './components/Clinic/Clinic';
import Footer from './components/Footer/Footer';

function App() {

  const themeState = localStorage.getItem("theme") || "light";

  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [theme, setTheme] = useState(themeState);

  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL)
    const parsedResponse = await response.json();
    const resData = parsedResponse.data;

    const dataArray = [];
    for (const key in resData) {
      dataArray.push(resData[key]);
    }

    setData(dataArray);

    const dateObj = new Date(parsedResponse._updated);
    setLastUpdated(dateObj.toLocaleTimeString());
  }

  useEffect(() => {
    fetchData();
  }, [])

  const toggleTheme = () => {
    let newTheme;

    if (theme === "light") newTheme = "dark";
    else newTheme = "light";

    localStorage.setItem("theme", newTheme) 
    setTheme(newTheme)
    return;
  }

  return (
    <div className={`themeContainer${utils.hasDarkClass(theme)}`}>

      <div className="App">
        <Header updateTime={lastUpdated} />
        <main className="App__main">
          <div className="App__column">
            <h2 className={`App__columnTitle${utils.hasDarkClass(theme)}`}>GTA</h2>
            {data
              .filter(isClinicInGta)
              .sort(handleClinicSort)
              .map((clinic, i) => {
                const id = "gtaClinic_" + i + clinic.name.replace(/\s/g, "");
                return <Clinic clinic={clinic} id={id} key={id} />
              })
            }
          </div>
          <div className="App__column">
            <h2 className={`App__columnTitle${utils.hasDarkClass(theme)}`}>Rest of ON</h2>
            {data
              .filter(clinic => !isClinicInGta(clinic))
              .sort(handleClinicSort)
              .map((clinic, i) => {
                const id = "nonGtaClinic_" + i + clinic.name.replace(/\s/g, "");
                return <Clinic clinic={clinic} id={id} key={id} />
              })
            }
          </div>
        </main>
        <Footer theme={theme} toggleTheme={toggleTheme} />
      </div>

    </div>
  );
}

export default App;

function isClinicInGta(clinic) {
  const gtaClinics = [
    "Regent Park 40 Oaks",
    "St. James Town Wellesley Community Centre (WCC)",
    "Ryerson University",
    "St. Michael’s Hospital",
    "St. Joseph’s Health Centre",
    "West Park Healthcare Centre",
    "Community Hub Place",
    "Pickering Chestnut Hill Recreation Complex",
    "Clarington Garnet B Rickard Recreation Complex",
    "Ajax Audley Recreation Centre",
    "Whitby McKinney Centre",
    "Scugog Arena",
    "Uxbridge Arena",
    "L1Z – Ajax – St. Teresa of Calcutta Catholic School",
    "L1V – Pickering – Dunbarton High School",
    "L1T – Ajax – McLean Community Centre",
  ]

  return gtaClinics.includes(clinic.name);
}

function handleClinicSort(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}