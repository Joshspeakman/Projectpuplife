import React from "react";
import "./HeroPic.css";

const HeroPic = props => (
    <div className="hero">
        <video loop autoPlay>
            <source src="../../assets/dogs.mp4" type="video/mp4" />
        </video>
        {props.children}
    </div>);
    
    export default HeroPic;
