import React, { Component } from "react";
import "./Project.css";

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
      },{
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
    ]
  };

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
    if(name !=="customer" && name !=="budget" && name !=="test" && name !=="delay" ){
    let newState = this.state.risks.slice();

    console.log(name);
    
    const myIndex = newState.findIndex(elem => {
      return elem.riskName === name;
    });

    console.log(myIndex);
    
    newState.splice(myIndex, 1);

    this.setState({ risks: newState })}
  };

  addDataToState = (name,e) =>{
    
    let myKey = e.target.name; 

    let newState = this.state.risks.slice();

    const myIndex = newState.findIndex(elem => {
      return elem.riskName === name;
    });

    newState[myIndex][myKey]=e.target.value

    this.setState({ risks: newState });
     

  }
    postHandle = () => {
      let data = [];
  
      this.state.risks.map((elem) => {
        data.push({
          riskName: elem.riskName,
          [elem.riskName + "" + "probability"]: elem.probability,
          [elem.riskName + "" + "concequence"]: elem.concequence,
          [elem.riskName + "" + "reasons"]: elem.reasons,
          [elem.riskName + "" + "mitigation"]: elem.mitigation,
        })
        console.log(data);
  
      })
      this.setState({ data: data })
  
      axios.post("/second", this.state.data)
        .then(response =>
  
          console.log("response",response.data)
  
  
        ).catch(err => {
          console.log("err",err.message);
  
        })
      }
  render() {
    const mySelectsList = this.state.risks.map((item, index) => (
      <MySelect
        riskName={item.riskName}
        removeRisk={this.removeRisk}
        addDataToState={this.addDataToState}
        key={index + " " + item.riskName}
      />
    ));
    return (
      <div className="App">
        {mySelectsList}

        <NewRisk addNewRisk={this.addNewRisk} />

        <button className="save" type="submit" onClick={this.postHandle}>
          save
        </button>
      </div>
    );
  }
}

export default Project;
