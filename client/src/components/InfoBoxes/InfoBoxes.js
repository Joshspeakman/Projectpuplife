import React from "react";
import Container from "../Container/Container";
import "./InfoBoxes.css";

const InfoBoxes = props => (
  <div>
    <div className="row">
      <div className="col-12">
        <h1 className="infoTitle">About PupLife</h1>
      </div>
    </div>

    <Container>
      <div className="row">
        <div className="col-5">
          <h3 className="info">
            We have dogs. We love dogs. Most of all, we understand the
            importance of finding activities and playmates to make your pup
            happier and eliminate their high amounts of energy at home. If
            you've got a lonely pup or two at home, look no farther - you have
            found your happy place!
          </h3>
        </div>
        <div className="col-2" />
        <div className="col-5">
          <img
            src="/assets/dogfriends.jpg"
            alt="dogfriends"
            className="dogspic"
            id="twoDogs"
            height="600"
            width="400"
          />
        </div>
      </div>
    </Container>
  </div>
);

export default InfoBoxes;
