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
    axios.get("http://10.2.3.104:4000/AllDB")
      .then((response) => {

        console.log("qqqqqqqqqqsdad", response)

        this.setState({
          allProjectsList: response.data
        })
        console.log(this.state.allProjectsList)

      })
      .catch(err => {
        console.log("err", err.message);

      })
  }

  render() {
    let read = []

    if (this.state.allProjectsList) {

      read = this.state.allProjectsList.map((elem, index) =>

        <RiskOverView projectName={elem.Tables_in_myproject} key={index} />
      )
    }


    return (
      <div  >

        <CreateTable />
        {read}

      </div>
    )
  }
}
export default AllProjects;