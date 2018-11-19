import React, { Component } from 'react';
// import RiskOverView from '../../components/RiskOverView/RiskOverView'
import './AllProject.css'
import axios from 'axios';
import CreateTable from '../../components/CreateTable/CreateTable'
import RiskOverView from '../../components/RiskOverView/RiskOverView'


class AllProjects extends Component {
  
  state = {
    allProjectsList: null,
    weeksBack:1
  }




  weeksBackFunc =()=>{
    this.setState({weeksBack:this.state.weeksBack+1})
    console.log("week", this.state.weeksBack);
  }

  weeksNextFunc =()=>{
    this.setState({weeksBack:this.state.weeksBack-1})
    console.log("week", this.state.weeksBack);
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
    
       <RiskOverView  projectName= {elem.Tables_in_myproject} weeksBack={this.state.weeksBack} />
    )}

    let allWeek = this.state.weeksBack
    let nextbtn = null

    if(allWeek >0){
      nextbtn = <button className = "next" onClick={this.weeksNextFunc}>next</button>
    }
    else{
      nextbtn =  <button className='version' >new version</button>
    }


    return (
      <div>

        {nextbtn}

      <button className = "previous" onClick={this.weeksBackFunc} >previous</button>
      {/* <button className = "next">next</button> */}

      <CreateTable/>
        {read}
        
      </div>

    )
  }
}
export default AllProjects;