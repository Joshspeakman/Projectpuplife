import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import ModalComponent from "../Modal/Modal";
import "./Nav.css";

class Nav extends Component {
  state = {
    loginOpen: false
  }

  componentDidMount() {
    let profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      this.setState({ id: profile.id });
    }
  }

  componentWillUpdate() {
    let profile = JSON.parse(localStorage.getItem("profile"));
    this.state.id = profile ? profile.id : null;
  }

  login = () => {
    this.setState({ loginOpen: true });
  }

  closeModal = () => {
    this.setState({ loginOpen: false });
  }

  logout = () => {
    localStorage.removeItem("profile");
    this.props.history.push("/");
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand nav-title hvr-grow" to="/">
          PupLife
        </Link>
        <div className="nav-left">
          <ul className="navbar-nav">
            <li
              className={
                window.location.pathname === "/" ||
                  window.location.pathname === "/home"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <div className={this.state.id ? "" : "hidden"}>
              <li className={ window.location.pathname === "/profile" ? "nav-item active" : "nav-item" }>
                <Link to={{ pathname: `/profile/${this.state.id}` }} className="nav-link">
                  Profile
                </Link>
              </li>
              <li
                className={
                  window.location.pathname === "/search"
                    ? "nav-item active"
                    : "nav-item"
                }
                >
                <Link to="/search" className="nav-link">
                  Search
                </Link>
              </li>
            </div>
          </ul>
        </div>

        <div className="nav-right">
          { !this.state.id ?
            <a className="nav-link" onClick={this.login}>Log In</a> :
            <a className="nav-link" onClick={this.logout}>Log Out</a>
          }
        </div>
        <ModalComponent open={this.state.loginOpen} onCloseModal={this.closeModal} />
      </nav>
    );
  }
}

export default withRouter(Nav);