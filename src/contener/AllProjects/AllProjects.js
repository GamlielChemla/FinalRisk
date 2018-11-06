import React, { Component } from 'react';
import RiskOverView from '../../components/RiskOverView/RiskOverView'

import axios from 'axios';



class AllProjects extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    obj: [],
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
        <center>
          <h1>Risk Manager</h1></center>

        <input type="text" placeholder="enter your project" onChange={(event) => this.setState({ sendProject: event.target.value })} />
        <button type="submit" onClick={this.sendproject}> send</button>
        {/* <RiskOverView/> */}

      </div>
    )
  }
}
export default AllProjects;