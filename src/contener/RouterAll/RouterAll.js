import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './AllProject.css'
import axios from 'axios';
import Project from '../Project/Project'



class AllProjects extends Component {
  
  state = {
    obj: []

  }
  /**
   * 
   */
  componentDidMount() {
    axios.get("/AllDB")
      .then((response) => {

        console.log("qqqqqqqqqq", response)

        this.setState({
          obj: response.data
        })
        console.log(this.state.obj)

      }
      )
      .catch(err => {
        console.log("err", err.message);


      })
  }

  render() {
    let read = this.state.obj.map(elem => {
      
        return <div>
          <div className="elemDiv">
            <br/><br/><br/>
          {elem.Tables_in_myproject}</div>
          <div className="views">
          <BrowserRouter>
<div>
              <Link to ="/EditProject">
            <button className="btnEdit">edit</button></Link></div>
            <br />

           <Route path="/Project" component={Project}></Route>
            </BrowserRouter>
            <div className="total" contentEditable="true"> Total Risk
  
        </div>
          </div>
        </div>
        

      
    })
    return (
      <div>
        
        {read}

      </div>

    )
  }
}
export default AllProjects;