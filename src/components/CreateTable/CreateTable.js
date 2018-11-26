import React, { Component } from 'react';

import axios from 'axios';



class CreateTable extends Component {

  state = {
    sendProject: ""
  }
  press = (e) =>{
if(e.key ==='Enter'){
  this.sendproject()
}
  }
  
  sendproject = () => {
    console.log(this.state.sendProject);

    document.location.reload()
    axios.post("/createDB", this.state)
      .then(response =>

        console.log("response", response)

      ).catch(err => {
        console.log("err", err.message);

      })
  }
  render() {
    return (
      <div className="first">
       

        <input type="text" onKeyPress={this.press}placeholder="enter your project" onChange={(event) => this.setState({ sendProject: event.target.value })} />
        <button type="submit"  onClick={this.sendproject}> send</button>

      </div>
    )
  }
}
export default CreateTable;