import React, { Component } from "react";
import "./Project.css";
import { Link } from "react-router-dom";

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
      }
    ],
    data: [],
    projectName: this.props.match.params.projectName,
    totalRisk: null,
    week: 1,
    currentWeek:1,
    weekback:0
  };

  componentDidMount() {
    axios
      .get("/getCurrentWeek/" + this.props.match.params.projectName)
      .then(res => {
        let data = res.data[0];

        console.log("dataaaaaaaaaaa",data);
        
        for (const key in data) {
          if (data[key]) {
            console.log(key);

            switch (true) {
              case key.toLowerCase().includes("test"):
                let mykey = key.replace("Test", "").toLowerCase();

                let copyOfRisks = [...this.state.risks];
                let newObject = {};

                for (let k in copyOfRisks[0]) newObject[k] = copyOfRisks[0][k];

                newObject[mykey] = data[key];

                copyOfRisks[0] = newObject;

                console.log(newObject);

                this.setState({ risks: copyOfRisks });

                break;

              case key.toLowerCase().includes("budget"):
                mykey = key.replace("Budget", "").toLowerCase();

                copyOfRisks = [...this.state.risks];
                newObject = {};

                for (let k in copyOfRisks[1]) newObject[k] = copyOfRisks[1][k];

                newObject[mykey] = data[key];

                copyOfRisks[1] = newObject;

                console.log(newObject);

                this.setState({ risks: copyOfRisks });

                break;

              case key.toLowerCase().includes("delay"):
                mykey = key.replace("Delay", "").toLowerCase();

                copyOfRisks = [...this.state.risks];
                newObject = {};

                for (let k in copyOfRisks[2]) newObject[k] = copyOfRisks[2][k];

                newObject[mykey] = data[key];

                copyOfRisks[2] = newObject;

                console.log(newObject);

                this.setState({ risks: copyOfRisks });

                break;

              case key.toLowerCase().includes("customer"):
                mykey = key.replace("Customer", "").toLowerCase();

                copyOfRisks = [...this.state.risks];
                newObject = {};

                for (let k in copyOfRisks[3]) newObject[k] = copyOfRisks[3][k];

                newObject[mykey] = data[key];

                console.log("Customer",newObject);

                copyOfRisks[3] = newObject;

                console.log(newObject);

                this.setState({ risks: copyOfRisks });

                break;

              case key.toLowerCase().includes("total"):
                this.setState({ totalRisk: data[key] });

                break;

            case key.toLowerCase().includes("week"):
              this.setState({week:data[key]})
              this.setState({currentWeek:data[key]})
              break;

            case key.toLowerCase().includes("other1"):

            
              mykey = key.replace("Other1", "").toLowerCase();

              copyOfRisks = [...this.state.risks];
              console.log('copyOfRisks[4]', copyOfRisks[4]);
              
              newObject = {};

              for (let k in copyOfRisks[4]) newObject[k] = copyOfRisks[4][k];
              console.log("other1111111111",newObject);
              

              newObject[mykey] = data[key];

              copyOfRisks[4] = newObject;

              console.log(newObject);

              this.setState({ risks: copyOfRisks });

              break;

              case key.toLowerCase().includes("other2"):
              mykey = key.replace("Other2", "").toLowerCase();

              copyOfRisks = [...this.state.risks];
              newObject = {};

              for (let k in copyOfRisks[5]) newObject[k] = copyOfRisks[5][k];

              newObject[mykey] = data[key];

              copyOfRisks[5] = newObject;

              console.log(newObject);

              this.setState({ risks: copyOfRisks });

              break;



              default :
              console.log("Not relevant");
              
            }
          }
        }
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

  removeRisk = name => {
    if (
      name !== "customer" &&
      name !== "budget" &&
      name !== "test" &&
      name !== "delay"
    ) {
      let newState = this.state.risks.slice();

      console.log(name);

      const myIndex = newState.findIndex(elem => {
        return elem.riskName === name;
      });

      console.log(myIndex);

      newState.splice(myIndex, 1);

      this.setState({ risks: newState });
    }
  };

  addDataToState = (name, e) => {
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
    await arr.map(elem => {
      
      newData.push({
        riskName: elem.riskName,
        probability: elem.probability,
        concequence: elem.concequence,
        mitigation: elem.mitigation,
        reason: elem.reason
      });
      if (newData.length > 4) {
        newData[4]["riskName"] = "Other1";
      }
      if (newData.length > 5) {
        newData[5]["riskName"] = "Other2";
      }
      console.log("newData", newData);
    });

    this.setState({ data: newData });
    console.log("data", this.state.data);

    axios
      .post("/second", {
        data: this.state.data,
        projectName: this.state.projectName,
        week: this.state.week
      })
      .then(
        response => console.log("response", response)
        // console.log("response", response)
      )
      .catch(err => {
        console.log("erreur", err.message);
      });
      
  }
  ;
  
  previousWeekFunc = async() =>{
      // let newWeek= this.state.currentWeek ;
      // console.log(newWeek);
      
     await this.setState({currentWeek:this.state.currentWeek-1})

     await   axios.get('/getLastWeek/'+this.props.match.params.projectName+"/"+this.state.currentWeek).then(res =>{

        let data = res.data[0];


      for (const key in data) {
        if (data[key]) {
          console.log(key);

          switch (true) {
            case key.toLowerCase().includes("test"):
              let mykey = key.replace("Test", "").toLowerCase();

              let copyOfRisks = [...this.state.risks];
              let newObject = {};

              for (let k in copyOfRisks[0]) newObject[k] = copyOfRisks[0][k];

              newObject[mykey] = data[key];

              copyOfRisks[0] = newObject;

              console.log(newObject);

              this.setState({ risks: copyOfRisks });

              break;

            case key.toLowerCase().includes("budget"):
              mykey = key.replace("Budget", "").toLowerCase();

              copyOfRisks = [...this.state.risks];
              newObject = {};

              for (let k in copyOfRisks[1]) newObject[k] = copyOfRisks[1][k];

              newObject[mykey] = data[key];

              copyOfRisks[1] = newObject;

              console.log(newObject);

              this.setState({ risks: copyOfRisks });

              break;

            case key.toLowerCase().includes("delay"):
              mykey = key.replace("Delay", "").toLowerCase();

              copyOfRisks = [...this.state.risks];
              newObject = {};

              for (let k in copyOfRisks[2]) newObject[k] = copyOfRisks[2][k];

              newObject[mykey] = data[key];

              copyOfRisks[2] = newObject;

              console.log(newObject);

              this.setState({ risks: copyOfRisks });

              break;

            case key.toLowerCase().includes("customer"):
              mykey = key.replace("Customer", "").toLowerCase();

              copyOfRisks = [...this.state.risks];
              newObject = {};

              for (let k in copyOfRisks[3]) newObject[k] = copyOfRisks[3][k];

              newObject[mykey] = data[key];

              copyOfRisks[3] = newObject;

              console.log(newObject);

              this.setState({ risks: copyOfRisks });

              break;

            case key.toLowerCase().includes("total"):
              this.setState({ totalRisk: data[key] });

              break;

          case key.toLowerCase().includes("week"):
            this.setState({currentWeek:data[key]})
            break;


            default :
            console.log("Not relevant");
            
          }
        }
      }





       
     })
      
  }

  nextWeekFunc = async () =>{
    
    await this.setState({currentWeek:this.state.currentWeek+1})

    await   axios.get('/getNextWeek/'+this.props.match.params.projectName+"/"+this.state.currentWeek).then(res =>{

      let data = res.data[0];


    for (const key in data) {
      if (data[key]) {
        console.log(key);

        switch (true) {
          case key.toLowerCase().includes("test"):
            let mykey = key.replace("Test", "").toLowerCase();

            let copyOfRisks = [...this.state.risks];
            let newObject = {};

            for (let k in copyOfRisks[0]) newObject[k] = copyOfRisks[0][k];

            newObject[mykey] = data[key];

            copyOfRisks[0] = newObject;

            console.log(newObject);

            this.setState({ risks: copyOfRisks });

            break;

          case key.toLowerCase().includes("budget"):
            mykey = key.replace("Budget", "").toLowerCase();

            copyOfRisks = [...this.state.risks];
            newObject = {};

            for (let k in copyOfRisks[1]) newObject[k] = copyOfRisks[1][k];

            newObject[mykey] = data[key];

            copyOfRisks[1] = newObject;

            console.log(newObject);

            this.setState({ risks: copyOfRisks });

            break;

          case key.toLowerCase().includes("delay"):
            mykey = key.replace("Delay", "").toLowerCase();

            copyOfRisks = [...this.state.risks];
            newObject = {};

            for (let k in copyOfRisks[2]) newObject[k] = copyOfRisks[2][k];

            newObject[mykey] = data[key];

            copyOfRisks[2] = newObject;

            console.log(newObject);

            this.setState({ risks: copyOfRisks });

            break;

          case key.toLowerCase().includes("customer"):
            mykey = key.replace("Customer", "").toLowerCase();

            copyOfRisks = [...this.state.risks];
            newObject = {};

            for (let k in copyOfRisks[3]) newObject[k] = copyOfRisks[3][k];

            newObject[mykey] = data[key];

            copyOfRisks[3] = newObject;

            console.log(newObject);

            this.setState({ risks: copyOfRisks });

            break;

          case key.toLowerCase().includes("total"):
            this.setState({ totalRisk: data[key] });

            break;

        case key.toLowerCase().includes("week"):
          this.setState({currentWeek:data[key]})
          break;


          default :
          console.log("Not relevant");
          
        }
      }
    }





     
   })     
}
  
  newVersion = async() =>{
    const newVersionWeek = this.state.week+1
    this.setState({week:newVersionWeek})
    this.setState({currentWeek:newVersionWeek})
     this.postHandle()

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
        addDataToState={this.addDataToState}
        key={index + "" + item.riskName}
      />
    ));

    let showAddNewRisk = null;
    if (this.state.risks.length < 6) {
      showAddNewRisk = <NewRisk addNewRisk={this.addNewRisk} />;
    }

    

    let nextbtn = null;

    if (this.state.currentWeek < this.state.week) {
      nextbtn = (
        <button className="next"  onClick={this.nextWeekFunc}>
          next
        </button>
      );

    } else {
      nextbtn = (
        <button className="version" onClick={this.newVersion}>
          new version
        </button>
      );
    }

    let previous = null

    if (this.state.currentWeek > 1) {
      previous= <button className="previous" onClick={this.previousWeekFunc}>previous</button>
      
    }

    let saveBtn=null
    if (this.state.week === this.state.currentWeek){

      saveBtn =   <button
          className="save"
          type="submit"
          onClick={() => {
            this.postHandle();
            this.setTotalRisk();
          }}
        >
          save
        </button>
    }
    let totalRisk =null;
    if(this.state.totalRisk !== null){
      totalRisk = <div> Total Risk : {this.state.totalRisk} </div>

      
    }
    return (
      <div className="App">
        <div>10/12/18</div>
        <div> project name : {this.state.projectName}</div>
        {totalRisk}
        <div> currentWeek : {this.state.currentWeek} </div>
        

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