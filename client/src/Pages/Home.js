import React, { Component } from "react";
// import Container from "../components/Container";
import HeroPic from "../components/HeroPic";
import InfoBoxes from "../components/InfoBoxes/InfoBoxes";
import ModalComponent from "../components/Modal/Modal";
import ModalPage from "../components/MessagingModal/MessagingModal";

class Home extends Component {
  state = {
    loginOpen: false
  }

  login = () => {
    this.setState({ loginOpen: true });
  }

  closeModal = () => {
    this.setState({ loginOpen: false });
  }

  render() {
    return (
      <div className="container-fluid main-container">
        <div className="row">
          <div className="col-12">
            <HeroPic>
              <h1 className="title">PupLife</h1>
              <h2 className="description">Does your pup need some new friends?</h2>
              <h3 className="description">You came to the right place!</h3>
              {/* <JoinButton /> */}
              <button id="joinUs" className="btn hvr-grow" onClick={this.login}>
                  JOIN US
              </button>
              <ModalComponent open={this.state.loginOpen} onCloseModal={this.closeModal} />
            </HeroPic>
          </div>
        </div>
        <InfoBoxes />
      </div>
    );
  }
}

export default Home;
