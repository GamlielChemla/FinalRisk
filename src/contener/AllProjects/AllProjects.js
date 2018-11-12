import React, { Component } from 'react';
// import RiskOverView from '../../components/RiskOverView/RiskOverView'
import './AllProject.css'
import axios from 'axios';
import CreateTable from '../../components/CreateTable/CreateTable'
import RiskOverView from '../../components/RiskOverView/RiskOverView'



class AllProjects extends Component {
  
  state = {
    allProjectsList: null

  }
  componentDidMount() {
    axios.get("/AllDB")
      .then((response) => {

        console.log("qqqqqqqqqq", response)

        this.setState({
          allProjectsList: response.data
        })
        console.log(this.state.allProjectsList)

      }
      )
      .catch(err => {
        console.log("err", err.message);


      })
  }

  render() {
    let read=[]
    
    if (this.state.allProjectsList){
    
    read = this.state.allProjectsList.map((elem,index) => 
    
       <RiskOverView  riskName= {elem.Tables_in_myproject}  />
    )}

    return (
      <div>
      <button className = "previous" >previous</button>
      <button className = "next">next</button>

      <CreateTable/>
        {read}
        
      </div>

    )
  }
}
export default AllProjects;