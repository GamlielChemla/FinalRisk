import {Component} from "react";


export class Funcs extends Component {
  
  upDataMyDash = async (data) => {

    if (data !== undefined) {

      console.log('sasasa', data);

      this.setState({
        risksLength: data.risksLength,
        lastWeek:data.lastWeek

      })


      this.setRisks(data)


      for (let key in data) {
        if (data[key]) {
          switch (true) {
            case key.toLowerCase().includes("test"):
              let mykey = key.replace("Test", "").toLowerCase();

              let copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
              let newObject = JSON.parse(JSON.stringify(copyOfRisks[0]));

              newObject[mykey] = data[key];

              copyOfRisks[0] = newObject;

              this.setState({
                risks: copyOfRisks
              });

              break;

            case key.toLowerCase().includes("budget"):
              mykey = key.replace("Budget", "").toLowerCase();

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));

              newObject = JSON.parse(JSON.stringify(copyOfRisks[1]));

              newObject[mykey] = data[key];

              copyOfRisks[1] = newObject;

              console.log(newObject);

              this.setState({
                risks: copyOfRisks
              });

              break;

            case key.toLowerCase().includes("delay"):
              mykey = key.replace("Delay", "").toLowerCase();

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
              newObject = JSON.parse(JSON.stringify(copyOfRisks[2]));

              newObject[mykey] = data[key];

              copyOfRisks[2] = newObject;

              console.log(newObject);

              this.setState({
                risks: copyOfRisks
              });

              break;

            case key.toLowerCase().includes("customer"):
              mykey = key.replace("Customer", "").toLowerCase();

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
              newObject = JSON.parse(JSON.stringify(copyOfRisks[3]));

              newObject[mykey] = data[key];

              copyOfRisks[3] = newObject;

              console.log(newObject);

              this.setState({
                risks: copyOfRisks
              });

              break;
             
              case key.includes("Other1"):

              let myIndex= this.checkOther(data.prevName1)
                if (myIndex >= 0) {
                  
                
  
                mykey = key.replace("Other1", "").toLowerCase()
  
                copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
  
                newObject = JSON.parse(JSON.stringify(copyOfRisks[myIndex]));
  
                newObject[mykey] = data[key]
  
                copyOfRisks.splice(myIndex, 1, newObject)
  
                this.setState({
                  risks: copyOfRisks
                })
              }
  
                break;
  
  
              case key.includes("Other2"):
  
  
  
               myIndex= this.checkOther(data.prevName2)
              if (myIndex >= 0) {
  
                mykey = key.replace("Other2", "").toLowerCase()
  
                copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
  
                newObject = JSON.parse(JSON.stringify(copyOfRisks[myIndex]));
  
                newObject[mykey] = data[key]
  
                copyOfRisks.splice(myIndex, 1, newObject)
  
                this.setState({
                  risks: copyOfRisks
                })
              }
  
                break;

            case key.toLowerCase().includes("total"):
              this.setState({
                totalRisk: data[key]
              });

              break;

            case key.toLowerCase().includes("week"):
              this.setState({
                week: data[key]
              });
        

            default:
              console.log('defualt');
              break


          }
        }
      }

    }
  }


  nextPreviousWeekFuncFromAll = async (data) => {

    if (data !== undefined) {

      console.log('sasasa', data);

      this.setState({risksLength: data.risksLength })

      this.setRisks(data)

      for (let key in data) {
        if (data[key]) {
          switch (true) {
            case key.toLowerCase().includes("test"):
              let mykey = key.replace("Test", "").toLowerCase();

              let copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
              let newObject = JSON.parse(JSON.stringify(copyOfRisks[0]));

              newObject[mykey] = data[key];

              copyOfRisks[0] = newObject;

              this.setState({
                risks: copyOfRisks
              });

              break;

            case key.toLowerCase().includes("budget"):
              mykey = key.replace("Budget", "").toLowerCase();

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));

              newObject = JSON.parse(JSON.stringify(copyOfRisks[1]));

              newObject[mykey] = data[key];

              copyOfRisks[1] = newObject;

              console.log(newObject);

              this.setState({
                risks: copyOfRisks
              });

              break;

            case key.toLowerCase().includes("delay"):
              mykey = key.replace("Delay", "").toLowerCase();

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
              newObject = JSON.parse(JSON.stringify(copyOfRisks[2]));

              newObject[mykey] = data[key];

              copyOfRisks[2] = newObject;

              console.log(newObject);

              this.setState({
                risks: copyOfRisks
              });

              break;

            case key.toLowerCase().includes("customer"):
              mykey = key.replace("Customer", "").toLowerCase();

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));
              newObject = JSON.parse(JSON.stringify(copyOfRisks[3]));

              newObject[mykey] = data[key];

              copyOfRisks[3] = newObject;

              console.log(newObject);

              this.setState({
                risks: copyOfRisks
              });

              break;

            case key.includes("Other1"):

            let myIndex= this.checkOther(data.prevName1)
              if (myIndex >= 0) {
                
              

              mykey = key.replace("Other1", "").toLowerCase()

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));

              newObject = JSON.parse(JSON.stringify(copyOfRisks[myIndex]));

              newObject[mykey] = data[key]

              copyOfRisks.splice(myIndex, 1, newObject)

              this.setState({
                risks: copyOfRisks
              })
            }

              break;


            case key.includes("Other2"):



             myIndex= this.checkOther(data.prevName2)
            if (myIndex >= 0) {

              mykey = key.replace("Other2", "").toLowerCase()

              copyOfRisks = JSON.parse(JSON.stringify(this.state.risks));

              newObject = JSON.parse(JSON.stringify(copyOfRisks[myIndex]));

              newObject[mykey] = data[key]

              copyOfRisks.splice(myIndex, 1, newObject)

              this.setState({
                risks: copyOfRisks
              })
            }

              break;


            case key.toLowerCase().includes("total"):
              this.setState({
                totalRisk: data[key]
              });

              break;



            case key.includes("Version"):
              console.log(data["Version"]);
              break;

            default:
              console.log('defualt');
              break



          }
        }
      }

    }
  }

  setRisks = (data) =>{
console.log("xxxxxxxxxzzzzzzzzzzzvvvvvvvv",this.state);

    if(data.risksLength === 4){
      let newState = [...this.state.risks]
      newState.splice(4,2)
      this.setState({risks:newState})
      

    }

    if(data.risksLength === 5 ){

      let newState = [...this.state.risks]
      newState.splice(4,2)
      this.setState({risks:newState})
      
      
      let newObject = {

        riskName: "",
        probability: 0,
        concequence: 0,
        mitigation: "",
        reason: ""
      }
      if(data.prevName1 !== null) {
        newObject.riskName = data.prevName1
        }else{ newObject.riskName = data.prevName1}

         newState = [...this.state.risks]

        newState.push(newObject)

        this.setState({risks:newState})


    }

    if(data.risksLength === 6){

      let newState = [...this.state.risks]
      newState.splice(4,2)
      this.setState({risks:newState})

    

    let newObject1 = {

      riskName: data.prevName1,
      probability: 0,
      concequence: 0,
      mitigation: "",
      reason: ""
    }

    let newObject2 = {

      riskName: data.prevName2,
      probability: 0,
      concequence: 0,
      mitigation: "",
      reason: ""
    }

    newState.push(newObject1,newObject2)
  }



  }


   checkOther = (prevName) => {
              
    let checkArray = []

    this.state.risks.forEach(element => {
        checkArray.push(element.riskName)
      
    }); 


    let pushTo = checkArray.indexOf(prevName)

    return pushTo


  }
}