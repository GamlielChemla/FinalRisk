import React, { Component } from "react";
import "./Project.css";
import { Link } from 'react-router-dom'


import axios from "axios";

import MySelect from "../../components/MySelect/MySelect";

import NewRisk from "../../components/NewRisk/NewRisk";

class Project extends Component {

  state = {
    risks: [

      {
        riskName: "test",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reasons: ""
      },
      {
        riskName: "budget",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reasons: ""
      }, {
        riskName: "delay",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reasons: ""
      },
      {
        riskName: "customer",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reasons: ""
      }
    ],
    data: [],
    projectName: this.props.match.params.projectName,
    totalRisk:null
  };

  myProjectLocation = this.props.match.params.projectName

   setTotalRisk= async () =>{
      let arr=[]
      await this.state.risks.forEach(elem =>{
        arr.push(((elem.probability *elem.concequence)/4))
        
      }
      
      )

      let sum = await arr.reduce((all,item ) =>{
          return all+item
      })
      console.log("my sum" ,sum);
      
      this.setState({totalRisk:sum})
    
    
  }
  ;
  addNewRisk = e => {
    e.preventDefault();

    let newRisk = e.target.elements.myInput.value;

    let check = true;

    let newState = this.state.risks.slice();

    for (let i = 0; i < newState.length; i++) {
      if (newState[i].riskName === newRisk) {
        check = false;
      }
    }

    if (check) {
      newState = [
        ...newState,
        {
          riskName: newRisk,
          probability: 0,
          concequence: 0,
          mitigation: "",
          reasons: ""
        }
      ];

      this.setState({ risks: newState });
    }
  };

  removeRisk = (name) => {
    if (name !== "customer" && name !== "budget" && name !== "test" && name !== "delay") {
      let newState = this.state.risks.slice();

      console.log(name);

      const myIndex = newState.findIndex(elem => {
        return elem.riskName === name;
      });

      console.log(myIndex);

      newState.splice(myIndex, 1);

      this.setState({ risks: newState })
    }
  };

  addDataToState = (name, e) => {

    let myKey = e.target.name;

    let newState = this.state.risks.slice();

    const myIndex = newState.findIndex(elem => {
      return elem.riskName === name;
    });

    newState[myIndex][myKey] = e.target.value

    this.setState({ risks: newState });


  }
  postHandle = async () => {

    let newData = []
    let arr = [... this.state.risks]
    await arr.map((elem) => {
      newData.push({
        projectName: this.state.projectName,
        riskName: elem.riskName,
        ["probability" + "" + elem.riskName]: elem.probability,
        ["concequence" + "" + elem.riskName]: elem.concequence,
        ["reasons" + "" + elem.riskName]: elem.reasons,
        ["mitigation" + "" + elem.riskName]: elem.mitigation,

      })


    })


    this.setState({ data: newData })

    axios.post("/second", this.state.data)
      .then(response =>

        console.log("response", response.data)


      ).catch(err => {
        console.log("err", err.message);

      })
  }


  render() {
    const mySelectsList = this.state.risks.map((item, index) => (
      <MySelect
        riskName={item.riskName}
        removeRisk={this.removeRisk}
        addDataToState={this.addDataToState}
        key={index + "" + item.riskName}

      />
    ));
    return (
      <div className="App">
        <div> project name : {this.state.projectName}</div>
        <div> Total Risk : {this.state.totalRisk} </div>



        {mySelectsList}

        <NewRisk addNewRisk={this.addNewRisk} />

         <button className="save" type="submit" onClick={()=>{this.postHandle() ; this.setTotalRisk()} }>
          save
        </button>
 
        <Link to={"/"}>
          <button className="Done" type="submit"  >
            Done
        </button>
        </Link>

    
      </div>
    );
  }
}

export default Project;
