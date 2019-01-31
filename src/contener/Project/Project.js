import React from "react";


import "./Project.css";


import { Link } from "react-router-dom";


import axios from "axios";


import MySelect from "../../components/MySelect/MySelect";


import NewRisk from "../../components/NewRisk/NewRisk";


import {Funcs} from "./AllFuncs"

import { Button,Jumbotron } from 'reactstrap';



class Project extends Funcs {


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
      },
      {
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
      }],
    risksLength :4,
    data: [],
    projectName: this.props.match.params.projectName,
    totalRisk: 0,
    week: 1,
    lastWeek:1,
    myDate: 0,
   
    };

  componentDidMount() {
   this.dateHandler()
   
    axios
      .get("http://10.2.3.104:4000/getCurrentWeek/" + this.props.match.params.projectName)
      .then(res => {
        let data = res.data[0];

        
        this.upDataMyDash(data)
       
      });
  }

  setTotalRisk = async () => {
    let arr = [];
    await this.state.risks.forEach(elem => {
      arr.push((elem.probability * elem.concequence) / this.state.risks.length);
    });

    let sum = await arr.reduce((all, item) => {
      return all + item;
    });
    console.log("my sum", sum);
    
    this.setState({ totalRisk: Math.ceil(sum) });
  };

  addNewRisk = e => {
    e.preventDefault();

    let newRisk = e.target.elements.myInput.value;

    let check = true;

    let newState = [...this.state.risks];

    for (let i = 0; i < newState.length; i++) {
      if (newState[i].riskName === newRisk || newRisk === "" ) {
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
      this.setState({risksLength:this.state.risksLength+1})
    }
  };

  removeRisk = name => {
    if ((name !== "customer" && name !== "budget" && name !== "test" && name !== "delay") || this.state.lastWeek ===this.state.week
    ) {
      let newState = this.state.risks.slice();

      console.log(name);

      const myIndex = newState.findIndex(elem => {
        return elem.riskName === name;
      });

      console.log(myIndex);

      newState.splice(myIndex, 1);

      this.setState({ risks: newState });

      this.setState({risksLength:this.state.risksLength-1})

    }
  };

  addDataToState = (e,name) => {
    let myKey = e.target.name;

    let newState = this.state.risks.slice();

    const myIndex = newState.findIndex(elem => {
      return elem.riskName === name;
    });

    newState[myIndex][myKey] = e.target.value;

    this.setState({ risks: newState });
  };

  postHandle = async () => {
    let newData = [];
    let arr = [...this.state.risks];
    await arr.map( async (elem) => {
      newData.push({
        riskName: elem.riskName,
        probability: elem.probability,
        concequence: elem.concequence,
        mitigation: elem.mitigation,
        reason: elem.reason
      });
      if (newData.length > 4) {
        
        let newObject =  JSON.parse(JSON.stringify(newData[4]));
        newObject["prevName1"] = await newObject.riskName;
        newObject["riskName"] = "Other1";
        newData[4] = newObject;
      }
      
      if (newData.length > 5) {
        let newObject = JSON.parse(JSON.stringify(newData[5]));
        newObject["prevName2"] = await newObject.riskName;
        newObject["riskName"] = "Other2";
        newData[5] = newObject;
      }

      console.log("newData", newData);
      this.setState({data:newData})
    });
    console.log("dffffff",this.state.data);
    

    
    let toSend = { data: this.state.data, projectName: this.state.projectName,week: this.state.week,risksLength:this.state.risksLength, totalRisk : this.state.totalRisk, lastWeek : this.state.lastWeek, myDate :this.state.myDate}
    
    
    if (this.state.totalRisk >0 ){

      toSend['totalRisk'] = this.state.totalRisk;

    }    
    axios
      .post("http://10.2.3.104:4000/second", toSend)
      .then(
        response => console.log("response", response)
        // console.log("response", response)
      )
      .catch(err => {
        console.log("erreur", err.message);
      });
  };

  previousWeekFunc = async () => {
    

    await this.setState({ week: this.state.week - 1 });

    await axios
      .get(
        "http://10.2.3.104:4000/getLastWeek/" +
          this.props.match.params.projectName +
          "/" +
          this.state.week
      )
      .then(res => {
        let data = res.data[0];

      this.nextPreviousWeekFuncFromAll(data)
      });
  };

  nextWeekFunc = async () => {


    await this.setState({ week: this.state.week + 1 });


    await axios
      .get(
        "http://10.2.3.104:4000/getNextWeek/" +
          this.props.match.params.projectName +
          "/" +
          this.state.week
      )
      .then(res => {
        let data = res.data[0];

        this.nextPreviousWeekFuncFromAll ( data)
        
      });
  };

  newVersion = async () => {

     this.setState({ week: this.state.week + 1 });

     this.setState({ lastWeek: this.state.week+ 1 });

     this.dateHandler()


  };

  dateHandler = () =>{
    let d = new Date();

    let date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`

    this.setState({myDate:date})
    
  }
 

  render() {
    const mySelectsList = this.state.risks.map((item, index) => (
      <MySelect
        riskName={item.riskName}
        probability={item.probability}
        concequence={item.concequence}
        mitigation={item.mitigation}
        reason={item.reason}
        removeRisk={this.removeRisk}
        addDataToState={(e) => this.addDataToState(e, item.riskName)}
        key={index + "" + item.riskName}
        setTotalRisk ={this.setTotalRisk}
      />
    ));

    let showAddNewRisk = null;
    if (this.state.risks.length < 6) {
      showAddNewRisk = <NewRisk addNewRisk={this.addNewRisk} />;
    }

    let nextbtn = null;

    if ( this.state.week ===this.state.lastWeek) {
    
      nextbtn = (
        <Button color="success" size="sm" className="version" onClick={this.newVersion}>
          new version
        </Button>
      );
    } else {
     
      nextbtn = (
        <button className="next" onClick={this.nextWeekFunc}>
          next
        </button>
      );

    }

    let previous = null;

    if (this.state.week > 1) {
      previous = (
        <button className="previous" onClick={this.previousWeekFunc}>
          previous
        </button>
      );
    }

    let saveBtn = null;


    if ( this.state.lastWeek ===this.state.week || this.state.lastWeek === 1) {

      saveBtn = (
      
      <button
          className="save"
          type="submit"
          onClick={this.postHandle}
        >
          save
        </button>
      );
    }
    let totalRisk = null;
    if (this.state.totalRisk !== null && this.state.totalRisk >0 )  {
      totalRisk = <div> Total Risk : {this.state.totalRisk} </div>;
    }

  
    return (

      
      <div className="App">

<div>
      <Jumbotron>
        <h3 >project name : {this.state.projectName}</h3>
        <h4> {this.state.myDate} </h4>
        <h5> currentWeek : {this.state.week} </h5>
        <h5>{totalRisk}</h5>
       
        <hr className="my-2" />


        
        
      </Jumbotron>
    </div>
       
        {/* <div> project name : {this.state.projectName}</div>
        <div> {this.state.myDate} </div>
        <div> currentWeek : {this.state.week} </div>
        {totalRisk} */}

        {previous}
        {nextbtn}
        {mySelectsList}
        {showAddNewRisk}
        {saveBtn}

 

        <Link to={"/"}>
          <button className="Done" type="submit">
            Done
          </button>
        </Link>
      </div>
    );
  }
}

export default Project;
