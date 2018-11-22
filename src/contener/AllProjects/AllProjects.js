import React, { Component } from 'react';
import './AllProject.css'
import axios from 'axios';
import CreateTable from '../../components/CreateTable/CreateTable'
import RiskOverView from '../../components/RiskOverView/RiskOverView'


class AllProjects extends Component {

  state = {
    allProjectsList: null,
    // weeksBack: 0
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


  // allversion = () => {
  //   axios.get('/allVersion')
  //     .then((responce) => {
  //       console.log("versionfront", responce)

  //     })
  // }
  // addNewVersion =()=>{
  //   axios.get('/newVersion').then(responce=>{
      
  //     console.log("new",responce);
      
  //   })
  // }

  render() {
    let read = []

    if (this.state.allProjectsList) {

      read = this.state.allProjectsList.map((elem, index) =>

        <RiskOverView key={index} projectName={elem.Tables_in_myproject} weeksBack={this.state.weeksBack} />
      )
    }

   
    return (
      <div>


        {/* <button className="previous" onClick={() => {this.allversion(); this.weeksBackFunc() }}>previous</button> */}


        <CreateTable />
        {read}

      </div>
    )
  }
}
export default AllProjects;