import React, { Component } from "react";
import { withRouter, BrowserRouter, Route, Redirect } from "react-router-dom";
import "./ProfilePage.css";
import {
  Card,
  CardImage,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input
} from "mdbreact";
import Form from "react-validation/build/form";
import API from '../../utils/API';


class ProfilePage extends Component {
  state = {
    showForm: false,
    allowEdit: false,
    dog: {}
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    let profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile)
      profile = {}

    this.setState({
      allowEdit: profile.id === nextProps.id,
      dog: { ...nextProps }
    });
  }

  showForm = () => {
    this.setState({ showForm: true })
  }

  save = () => {
    console.log(this.state.dog);
    API.saveDog(this.state.dog);
    this.setState({ showForm: false });
  }

  deleteProfile = () => {
    API.deleteDog(this.state.dog.id);
    localStorage.removeItem("profile");
    this.props.history.push("/");
  }

  handleInputChange = (event) => {
    this.setState({
      dog: {
        ...this.state.dog,
        [event.target.name]: event.target.value
      }
    });
  }

  render() {

    return (
      <Card className="dogCard" id="dCard" reverse>
        <CardImage className="img-fluid profileImg" src={this.props.imgurl} />
        <CardBody>
          {!this.state.showForm ?
            <div>
              <CardTitle id="petName">{this.state.dog.pet_name}</CardTitle>
              <CardText id="city">{this.state.dog.city}</CardText>
              <CardText id="description">{this.state.dog.description}</CardText>
            </div> : null}

          {this.state.showForm ?
            <Form className="form">
              <Input
                defaultValue={this.state.dog.pet_name}
                valueDefault={this.state.dog.pet_name}
                name="pet_name"
                onChange={this.handleInputChange}
                type="text"
              />
              <Input
                defaultValue={this.state.dog.city}
                valueDefault={this.state.dog.city}
                name="city"
                onChange={this.handleInputChange}
                type="text"
              />
              <Input
                defaultValue={this.state.dog.description}
                valueDefault={this.state.dog.description}
                name="description"
                onChange={this.handleInputChange}
                type="text"
              />
            </Form> : null}

          <div className={this.state.allowEdit ? "" : "hidden"}>
            <Button className={this.state.showForm ? "hidden" : ""} onClick={this.showForm}>Edit</Button>
            <Button className={this.state.showForm ? "" : "hidden"} onClick={this.save}>Save</Button>

            <Button onClick={this.deleteProfile}>Delete My Profile</Button>
          </div>

        </CardBody>
      </Card>
    );
  }
}

export default withRouter(ProfilePage);
