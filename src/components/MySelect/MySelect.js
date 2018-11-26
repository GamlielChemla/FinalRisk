import React, { Component } from 'react';
import './MySelect.css'



class MySelect extends Component{



    render(){
      let myB=null
      if(this.props.riskName !=="customer" && this.props.riskName !=="budget" && this.props.riskName !=="test" && this.props.riskName !=="delay"){

        myB=<button onClick={this.props.removeRisk.bind(this,this.props.riskName)}> x </button>
      }
      return(

   <div className="Risk"> {<h1 name ="riskName "> {this.props.riskName} </h1>}
          
   <br/>
        

          <select name = "probability"  onChange={this.props.addDataToState.bind(this,this.props.riskName)} value={this.props.probability} >
          
          <option value="0" >Select your probability</option>
            
            
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>

          </select>

          <select name = "concequence"  onChange ={this.props.addDataToState.bind(this,this.props.riskName)} value={this.props.concequence} >
            <option value="0"  >Select your concequence</option>
            
           
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>

          </select>

          <textarea type="text" placeholder="enter risk mitigation" className="input" name = "mitigation" onChange= {this.props.addDataToState.bind(this,this.props.riskName)} value={this.props.mitigation} />
          
          <textarea type="text" placeholder="enter risk reasons" className="input"  name = "reason"  onChange = {this.props.addDataToState.bind(this,this.props.riskName)} value = {this.props.reason} />

          {myB}
  
          <br/><br/><br/>
          
          </div>
          )
      
    }
}
export default MySelect;