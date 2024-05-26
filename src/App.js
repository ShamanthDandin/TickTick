import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {

  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      message,
      type
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert message={alert?.message} alertType={alert?.type} />
          <div className="container">
            <Switch>

              <Route exact path="/"><Home showAlert={showAlert} /></Route>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/login"><Login showAlert={showAlert} /></Route>
              <Route exact path="/signup"><Signup showAlert={showAlert} /></Route>

            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App;