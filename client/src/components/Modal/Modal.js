import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";
//import { browserHistory, withRouter } from "react-router";
import { withRouter, BrowserRouter, Route, Redirect } from "react-router-dom";
import { Container, Row, Col, Input, Button } from "mdbreact";
import "./Modal.css";

import API from "../../utils/API";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      submitted: false,
      username: "",
      password: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({ open: this.props.open })
    }
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  // onOpenModal = () => {
  //   this.setState({ open: true });
  // };

  handleJoinSubmit = event => {
    event.preventDefault();

    // this.props.history.push('/profile/', 0);

    API.login({
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      localStorage.setItem("profile", JSON.stringify(res.data));
      console.log("login succcessful", res.data);
      if (res.status === 200) {
        this.setState({ submitted: true });
      }

      this.props.history.push('/profile/' + res.data.id);
      //need to use react router to change the route in the app
      //profile/res.data.id
    }).finally(() => {
      this.props.onCloseModal();
    });
  };

  // onCloseModal = () => {
  //   this.setState({ open: false });
  // };

  render() {
    // let redirect = null;
    // if (this.state.submitted) {
    //   redirect = <Redirect to="/profile/3" />;
    // }

    return (
      <div>
        {/* <button id="joinUs" className="btn hvr-grow" onClick={this.onOpenModal}>
          JOIN US
        </button> */}
        {/* {redirect} */}
        <Modal open={this.state.open} onClose={this.props.onCloseModal} center>
          <form className="form">
            <input
              className="usernameInput"
              id="username"
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username"
            />
            <br />
            <input
              className="passwordInput"
              id="password"
              value={this.state.password}
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="Password"
            />
            <br />
            <button
              className="submitButton hvr-grow"
              onClick={this.handleJoinSubmit}
            >
              Submit
            </button>
            <h1>
              Don't have an account yet?{" "}
              <a href="/signup" target="blank">
                Sign Up
              </a>
            </h1>
          </form>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ModalComponent);

// ReactDOM.render(<ModalCompgonent />, document.getElementById("app"));
