/** @format */

import Router from "./Router";
import "./App.css";
import { GlobalState } from "./context/GlobalState";
function App() {
  return (
    <GlobalState>
      <Router />
    </GlobalState>
  );
}

export default App;
