import React ,{Component} from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
// import { log } from "util";
import './RiskOverView.css';



class RiskOverView extends Component {

  state= {
    total:0
  }


    componentDidMount(){
      console.log("hahahazzzz");
      
      let projectName= this.props.projectName
      console.log(projectName);
      
      axios.get('/total/'+projectName)
       .then(response => {


        console.log("myreponce", response.data)

        console.log(Object.values(response.data[0])[0]);

        const total = Object.values(response.data[0])[0] 
        
        this.setState({total:total})
        

        console.log("ttott", this.state.total);
        }
      
      )
    }

    
    deleteTable =()=>{ 
      alert(`are you sure you want to delete "${this.props.projectName}"`)
      axios.delete(`/del/${this.props.projectName}`)
    }

render(){  
  return (

    <div>
      <div className="elemDiv">
        <br /><br /><br />

        {this.props.projectName}</div>
      <div className="views">
        
        <Link to={"/Project/" + this.props.projectName}>

          <button className="btnEdit">edit</button>

        </Link>
        <br />
          <button className="btndelete" onClick = {this.deleteTable}>delete project</button>

        {/* <button className="totalbtn" onClick={this.totalclick}>tottalclik</button> */}

        <div className="total" >
          <div >Total Risk</div> 

          <div contentEditable="true">{this.state.total}</div>

        </div>

         {/* <button className="totalbtn" onClick={this.totalclick}>tottalclik</button>
         */}
      </div>

    </div>
  )
}
}

export default RiskOverView

