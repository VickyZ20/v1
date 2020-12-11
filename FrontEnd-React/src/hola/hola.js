import React from "react";
import "./hola.css";
import { Link } from "react-router-dom";

function Hola() {
  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <button type="button">APP</button>
        </Link>

        <Link to="/signin">
          <button type="button">Log In</button>
        </Link>
      </div>
      <section id="section1">
        <div className="main">
          <header>
            PARKING!
            <br />
            Space Sharing 🚗 🚗 🚗
            <a class="scroll" href="#section2">
              <span></span>Down
            </a>
          </header>
        </div>
      </section>
      <section id="section2">
        <a className="scroll" href="#section1">
          <span></span>Up
        </a>
        <div className="main" id="second">
          <header>Join Us Today</header>
          <p>
            By simply create your own user account and freely post/ search the
            driveway in your area.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Hola;
