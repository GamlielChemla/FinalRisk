import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { log } from "util";
import "./RiskOverView.css";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardTitle,
  Row,Col,Container,
} from "reactstrap";

class RiskOverView extends Component {
  state = {
    total: 0
  };

  componentDidMount() {
    console.log("hahahazzzz");
    console.log(this.props.projectName);

    let projectName = this.props.projectName;
    console.log(projectName);

    axios.get("http://10.2.3.104:4000/total/" + projectName).then(response => {
      console.log("myreponce", response.data);

      console.log(Object.values(response.data[0])[0]);

      const total = Object.values(response.data[0])[0];

      this.setState({ total: total });

      console.log("ttott", this.state.total);
    });
  }

  deleteTable = () => {
    let confirms = window.confirm(
      `are you sure you want to delete "${this.props.projectName}"`
    );

    if (confirms) {
      axios.delete(`http://10.2.3.104:4000/del/${this.props.projectName}`);
      document.location.reload();
    }
  };

  render() {
    return (
      <Container>
      <Row>
        <Col md = "3">
        
        </Col>
        <Col>
        
        <Card>
        <h3>  <CardHeader>{this.props.projectName}</CardHeader></h3>
          <CardBody>
            <CardTitle>{`Total Risk  ${this.state.total}`}</CardTitle>
            <Link to={"/Project/" + this.props.projectName}>
            <Button color="info"  >
              <strong> Edit Project</strong>
            </Button>
            </Link>

            {" "}
            <Button
            color="danger"
            
            onClick={this.deleteTable}
          >
            <strong> delete project</strong>
          </Button>
          </CardBody>
        </Card>
        
        </Col>
        <Col md = "3"></Col>


       
        <br/>

        {/* <div className="elemDiv">
          <br />
          <br />
          <br />

          {this.props.projectName}
        </div>
        <div className="views">
          <Link to={"/Project/" + this.props.projectName}>
            <Button color="info" size="sm" className="btnEdit">
              <strong> Edit</strong>
            </Button>
          </Link>
          <br />
          <Button
            color="danger"
            className="btndelete"
            size="sm"
            onClick={this.deleteTable}
          >
            <strong> delete project</strong>
          </Button>

          <div className="total">
            <div>Total Risk</div>

            <div>{this.state.total}</div>
          </div>
        </div> */}
      </Row>
      </Container>
    );
  }
}

export default RiskOverView;
