import { useState, useEffect } from 'react';

import config from './config';
import './App.scss';
import Header from './components/Header/Header';
import Clinic from './components/Clinic/Clinic';

function App() {

  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchData = async () => {
    const response = await fetch(config.API_URL)
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

  return (
    <div className="App">
      <Header updateTime={lastUpdated} />
      <main className="App__main">
        {data.map((clinic, i) => <Clinic clinic={clinic} key={"clinic_" + i} />)}
      </main>
    </div>
  );
}

export default App;
