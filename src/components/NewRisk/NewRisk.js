import React from "react";

const NewRisk = (props) =>

    <form onSubmit = {props.addNewRisk}>

      
        <input type = "text" placeholder ="Add new risk " name ="myInput" />
        
        <input type = "submit" />
        
        


    </form>

export default NewRisk;
