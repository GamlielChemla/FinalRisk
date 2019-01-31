import React, { Component } from 'react';
import { Button ,InputGroup ,InputGroupAddon,Input,Container ,Row,Col} from 'reactstrap';

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
    axios.post("http://10.2.3.104:4000/createDB/", this.state)
      .then(response =>

        console.log("response", response)

      ).catch(err => {
        console.log("err", err.message);

      })
  }
  render() {
    return (
   
      <Container>

          <Row>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          
        </InputGroupAddon>
        <Col sm="8" md={{ size: 4, offset: 4 }}>
        <Input className="" type="text" placeholder="enter your project" onKeyPress={this.press} onChange={(event) => this.setState({ sendProject: event.target.value })} />
          </Col>
        <InputGroupAddon addonType="append">
          <Button size="sm" color="success" type="submit"  onClick={this.sendproject}><strong>Send</strong></Button>
        </InputGroupAddon>
      </InputGroup>
       </Row>

        {/* <input type="text" onKeyPress={this.press}placeholder="enter your project" onChange={(event) => this.setState({ sendProject: event.target.value })} />

        <Button color="success" size="sm" type="submit"  onClick={this.sendproject}> send</Button> */}
        </Container>
        
    );
  }
}
export default CreateTable;