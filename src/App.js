import './App.css';
import { useEffect, useState } from 'react';
import Select from 'react-select'

function App() {

  const [datas, setDatas] = useState([]); 
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(false);

  const getBerries = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry");
    const value = await berries.json();
    let result = value.results.map(data => {
      return {
        label: data.name,
        value: data.name,
      }
    });
    setDatas(result.sort((a, b) => a.label.localeCompare(b.label)));
    console.log(datas); 
  }

  useEffect(() => {
    
    getBerries();
   
  }, []);   

  const handleSubmit = () => {
    setIsShow(state => !state);
    console.log('test', userSelect);
  }

  const handleChange = (value) => {
    setUserSelect(value);
  }

  return (
    <div className="App">
      <h1>{isShow ? userSelect : ""}</h1>
      <br />
      <br />
        <div className='container'>
          <button onClick={() => handleSubmit()} disabled={!userSelect}>{isShow ? "Hide Button" : "Show Button"}</button>
          <Select options={datas} onChange={(e) => handleChange(e.value) } /> 
        </div>
    </div>
  );
}

export default App;
