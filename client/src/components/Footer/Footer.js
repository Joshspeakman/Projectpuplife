import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";
import "./Footer.css";
import { Link } from "react-router-dom";
import Mailto from "react-protected-mailto";

class FooterPage extends React.Component {
  render() {
    return (
      <Footer className="font-small">
        <Container className="text-left">
          <Row>
            <Col sm="6">
              <img
                className="footer-logo"
                src="../../assets/white_logo_transparent.png"
                alt="PupLife logo"
              />
            </Col>
            <Col sm="6" className="linkDiv">
              <ul>
                <li
                  className={
                    window.location.pathname === "/" ||
                    window.location.pathname === "/home"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/" className="nav-link footer-link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item active nav-link footer-link nav-item">
                  <Mailto className="emailLink" email="joshua@modernizemysite.com" />
                </li>
                <li
                  className={
                    window.location.pathname === "/signup"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/signup" className="nav-link footer-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Container fluid className="footer-text text-center">
          &copy; {new Date().getFullYear()} Copyright <p> PupLife</p>
        </Container>
      </Footer>
    );
  }
}

export default FooterPage;
