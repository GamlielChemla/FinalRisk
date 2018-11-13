import React from "react";
import { Link } from 'react-router-dom'


const RiskOverView = (props) => {

  return (
    <div>
      <div className="elemDiv">
        <br /><br /><br />

        {props.riskName}</div>
      <div className="views">
        <Link to={"/Project/" + props.riskName}>
          <button className="btnEdit">edit</button>
        </Link>
        <br />

        <div className="total" >
          <div >Total Risk</div> 
          <div contentEditable="true">25</div>
        </div>
      </div>
    </div>
  )

}

export default RiskOverView
