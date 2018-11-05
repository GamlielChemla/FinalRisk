import React, { Component } from 'react';

 
import axios from 'axios';



class AllProjects extends Component {
  constructor(props){
    super(props)
  }
      state={
        obj:[]
  }
  componentDidMount() {
    axios.get('/end')
  
  .then((Response=>{

    this.setState({
      obj:Response
    })
    console.log(Response);
    
  }))
  }
  render() {
    return (
      <div className="first">
        <center>
        <h1>Risk Manager</h1></center>

        <div className ="views">
        <button className = "btnEdit">edit</button>
          <br/>
          <div>
          {this.state.obj.map((elem)=>{
            return (<div>{elem}</div>)
          })}</div>
        <div className="total" contentEditable="true"> Total Risk

        </div>

        </div>



          </div>
    )
  }
}
export default AllProjects;