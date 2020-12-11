import React from "react";
import "./Card.css";
import Slider from "react-slick";

function CardView(props) {
  return (
    <div className="card text-center entireCard" style={props.style}>
      <div className="overflow">
        <img className="cardview-image" src={props.images[0]} alt="img1" />
      </div>
      <div
        className="card-body text-dark"
        style={{ border: "1px", borderRadius: "40px !important" }}
      >
        <span className="card-title">{`${props["result-price"]}`}</span>
        <p className="card-description2"></p>
        <p className="card-description">{props.housing}</p>

        <button
          className="card-button"
          name={props.name}
          onClick={() => {
            props.function(props.test);
          }}
        >
          {props.buttonName}
        </button>
      </div>
    </div>
  );
}

/*
function CardView(props) {
  return (
    <div className="card text-center" style={props.style}>
      <div className="overflow">
        <img
          src="https://p.rdcpix.com/v01/l0511a742-m1xd-w640_h480_q80.jpg"
          src="https://www.google.com/search?q=%E6%BC%82%E4%BA%AE%E7%9A%84%E6%B0%94%E7%90%83&tbm=isch&ved=2ahUKEwjCq_3mupntAhWVop4KHV_qDdEQ2-cCegQIABAA&oq=%E6%BC%82%E4%BA%AE%E7%9A%84%E6%B0%94%E7%90%83&gs_lcp=CgNpbWcQAzoECCMQJzoCCAA6BAgAEBg6BAgAEAw6BggAEAwQGFDkDVjRHmC0ImgAcAB4AIABqQGIAcQGkgEDMi41mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=WxW8X4KSDpXF-gTf1LeIDQ&bih=573&biw=1302#imgrc=8-hRtIgZVTJ-dM"
          src="https://static.wixstatic.com/media/887b10_9508996feda84e84ad4975bea2acaf8a~mv2.jpg/v1/fill/w_525,h_403,fp_0.50_0.50,lg_1,q_90/887b10_9508996feda84e84ad4975bea2acaf8a~mv2.jpg"
          alt="img1"
          className="card-img-top embed-responsive-item"
        />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{`Fee: ${props["result-price"]}`}</h4>
        <p className="card-text text-secondary">{props.housing}</p>
        <button
          className="btn btn-dark"
          name={props.name}
          onClick={() => {
            props.function(props.post);
          }}
        >
          {props.buttonName}
        </button>
      </div>
    </div>
  );
}
*/

export default CardView;
