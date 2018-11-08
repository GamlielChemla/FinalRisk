import React, { Component } from 'react';
import axios from "axios"
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import AllProjects from '../src/contener/AllProjects/AllProjects'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <BrowserRouter>
          <div>
            <Link to="/AllProject"></Link>
          </div>
          <div>

            <Route path="/AllProject" component={AllProjects}></Route>
          </div>

        </BrowserRouter> */}

        {/* <CreateTable/> */}
        {/* <AllProjects/> */}
        {/* <Project/> */}

      </div>
    );
  }
}

export default App;
