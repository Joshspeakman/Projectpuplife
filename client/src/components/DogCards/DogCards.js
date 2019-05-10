import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText
} from "mdbreact";
import "./DogCards.css";

class DogCards extends Component {

  onClick = () => {
    this.props.history.push("/profile/" + this.props.id);
  }

  render() {
    return (
      <div className="cardContainer">
        <Card className="card">
          <CardImage src={this.props.imgurl} />
          <CardBody>
            <CardTitle>{this.props.pet_name}</CardTitle>
            <h5>{this.props.breed}</h5>
            <CardText>{this.props.city}</CardText>
            <Button id="btnToProfile" onClick={this.onClick}>
              Profile
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(DogCards);
