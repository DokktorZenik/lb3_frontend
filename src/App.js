import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {

  const [text, setText] = useState('');

  const toggleStart = () => {
    axios.post("http://localhost:5276/start")
        .then(res => {window.alert(res.data)})
        .catch(err => console.log(err));
  }

  const toggleCheck = () => {
    axios.get("http://localhost:5276/status")
        .then(res => {window.alert(res.data)})
        .catch(err => console.log(err));
  }

  const toggleResult = () => {
    axios.post("http://localhost:5276/predict", {
      ReviewText: text
    })
        .then(res => {window.alert(res.data)})
        .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <div className="form-wrapper">
        <div className="form-container">
          <div className="input-container">
            <textarea  onChange={e  => setText(e.target.value)} value={text} />
          </div>
          <div className="button-wrapper">
            <div className="button green" onClick={toggleStart}>
              START
            </div>
            <div className="button check" onClick={toggleCheck}>
              CHECK
            </div>
            <div className="button green" onClick={toggleResult}>
              APPLY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
