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
            <h2 className={`App__columnTitle${utils.hasDarkClass(theme)}`}>East</h2>
            {data.map((clinic, i) => {
              if (i > 3) return null;
              const id = "clinic_" + i + clinic.name;
              return <Clinic clinic={clinic} id={id} key={id} />
            })}
          </div>
          <div className="App__column">
            <h2 className={`App__columnTitle${utils.hasDarkClass(theme)}`}>West</h2>
            {data.map((clinic, i) => {
              if (i < 4) return null;
              const id = "clinic_" + i + clinic.name;
              return <Clinic clinic={clinic} id={id} key={id} />
            })}
          </div>
        </main>
        <Footer theme={theme} toggleTheme={toggleTheme} />
      </div>

    </div>
  );
}

export default App;
