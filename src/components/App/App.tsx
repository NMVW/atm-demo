import React from "react";
import logo from "./logo.svg";
import "./App.css";

// "theme": {
//   "palette": {
//     "primary": {
//       "main": "#36B2AA"
//     },
//     "secondary": {
//       "main": "#945231"
//     },
//     "error": {
//       "main": "#B2363E"
//     },
//     "success": {
//       "main": "#7CB236"
//     }
//   }
// }

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
