import React, { Component } from 'react';

import axios from 'axios';



class CreateTable extends Component {
  // constructor(props) {
  //   super(props)
  // }
  state = {
    sendProject: ""
  }

  sendproject = () => {
    console.log("aaaaaa ", this.state.sendProject);

    // this.setState({sendProject:sendproject})
    axios.post("/first", this.state)
      .then(response =>

        console.log("response", response)

      ).catch(err => {
        console.log("err", err.message);

      })
  }
  render() {
    return (
      <div className="first">
       

        <input type="text" placeholder="enter your project" onChange={(event) => this.setState({ sendProject: event.target.value })} />
        <button type="submit" onClick={this.sendproject}> send</button>
        {/* <RiskOverView/> */}

      </div>
    )
  }
}
export default CreateTable;