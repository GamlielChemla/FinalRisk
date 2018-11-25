import React, { Component } from 'react';

import axios from 'axios';



class CreateTable extends Component {
 
  state = {
    sendProject: ""
  }
  
  sendproject = () => {
    console.log(this.state.sendProject);

    // this.setState({sendProject:sendproject})
    document.location.reload()
    
    axios.post("/createDB", this.state)
      .then(response =>

        console.log("response", response)

      ).catch(err => {
        console.log("err", err.message);

      })
      
  }
  pressed = (e)=>{
    if(e.key === 'Enter'){
      this.sendproject()
      
    }
  }
  render() {
    return (
      <div className="first">
       

        <input type="text"  placeholder="enter your project" onKeyPress={this.pressed}onChange={(event) => this.setState({ sendProject: event.target.value })} />
        <button type="submit" onKeyPress={this.pressed}  onClick={this.sendproject}> send</button>

      </div>
    )
  }
}
export default CreateTable;