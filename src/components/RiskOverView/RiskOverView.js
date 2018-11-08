import React from "react";

const RiskOverView = (props) =>{

    return(
        <div>
          <div className="elemDiv">
            <br/><br/><br/>

          {props.riskName}</div>
          <div className="views">
            <button className="btnEdit">edit</button>
            <br />

            <div className="total" contentEditable="true"> Total Risk
  
        </div>
          </div>
        </div>
    )

}

export default RiskOverView
