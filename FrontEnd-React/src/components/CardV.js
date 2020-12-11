import React from "react";
import "./CardV.css";

function CardView(props) {
  return (
    <div className="entireCard-appointment">
      <img
        className="cardview-image-appointment"
        src={props.images}
        alt="img1"
      />

      <p className="appointment-address">{`result-title:  ${props["result-title"]}`}</p>
      <p className="appointment-address">{`result-date:  ${props["result-date"]}`}</p>
    </div>
  );
}

export default CardView;
