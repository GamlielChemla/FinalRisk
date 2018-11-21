import React, { Component } from 'react';
// import axios from "axios"
import './App.css';
import {Route } from 'react-router-dom'
import Project from './contener/Project/Project'
import AllProjects from '../src/contener/AllProjects/AllProjects'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        
          
          <div>
            
            <Route exact path="/" component={AllProjects}></Route>
            {/* <Route path="/Project/:projectName" component={Project}></Route> */}

            <Route path="/Project/:projectName/:weeksBack" component={Project}></Route>
          </div>

        

        
      </div>
    );
  }
}

export default App;
