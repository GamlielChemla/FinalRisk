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
        reason: ""
      },
      {
        riskName: "budget",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reason: ""
      }, {
        riskName: "delay",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reason: ""
      },
      {
        riskName: "customer",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reason: ""
      }
    ],
    data: [],
    projectName: this.props.match.params.projectName,
    totalRisk:null
  };

   setTotalRisk= async () =>{
      let arr=[]
      await this.state.risks.forEach(elem =>{
        arr.push(((elem.probability *elem.concequence)/this.state.risks.length))
        
      })

      let sum = await arr.reduce((all,item ) =>{
          return all+item
      })
      console.log("my sum" ,sum);
      
      this.setState({totalRisk:Math.ceil(sum)})
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
          reason: ""
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
        riskName: elem.riskName,
        "probability": elem.probability,
        "concequence" : elem.concequence,
        "mitigation" : elem.mitigation ,
        "reason" : elem.reason ,
        
      })
      if(newData.length > 4){
        newData[4]["riskName"]="Other1"
      }
      if(newData.length > 5){
        newData[5]["riskName"]="Other2"
      }
      console.log("newData",newData);


    })

    this.setState({ data: newData })
    console.log("data",this.state.data);


    

    axios.post("/second", {data:this.state.data,projectName:this.state.projectName})
      .then(response =>

        console.log("response", response)
        // console.log("response", response)


      ).catch(err => {
        console.log("erreur", err.message);

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

    let showAddNewRisk = null
    if(this.state.risks.length < 6){
      showAddNewRisk =<NewRisk addNewRisk={this.addNewRisk} />
    }
    return (
      <div className="App">
        <div> project name : {this.state.projectName}</div>
        <div> Total Risk : {this.state.totalRisk} </div>
  


        {mySelectsList}
        {showAddNewRisk}
        

         <button className="save" type="submit" onClick={()=>{this.postHandle() ; this.setTotalRisk()}  }>
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
