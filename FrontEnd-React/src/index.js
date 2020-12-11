import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);

/*
import React, { useState, useEffect } from "react";
import SearchPage from "../searchPage/SearchPage.js";
import { Card, Button, Container } from "react-bootstrap";
import CardVie from "../components/Card";
import CardView from "./CardV";
import "./ViewCart.css";
import { useForm } from "react-hook-form";

function ViewCartHis(props) {
  const [appointments, setAppointments] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const getInfo = async () => {
    const res = await fetch("/get_comment_query", { method: "GET" });
    const data = await res.json();
    console.log(data);
    setAppointments(data);
    setDataStatus(true);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const { register, handleSubmit } = useForm();

  async function postComment(data) {
    // Default options are marked with *
    await fetch("/addComments", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }

  const onSubmit = async (data) => {
    data["_id"] = props.id;
    postComment(data);
  };

  return (
    <Container>
      {dataStatus ? (
        <div className="booking">
          <h1>MyBooking History</h1>
          {appointments.map((t) => (
            <ul>
              <li key={t.id}>
                {t.authorFirstName}
                {t.end}
                {t.comment}
              </li>
            </ul>

            //<p key={t.id}>{t.end}</p>
            //<CardView appointment={t} start={t.start} end={t.end} />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}

      <div className="row">
        <div className="col-8"></div>
        <div className="col-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Leave a comment</h1>

            <label>First Name</label>
            <br />
            <input type="text" name="authorFirstName" ref={register} />
            <br />
            <label>Last Name</label>
            <br />
            <input type="text" name="authorLastName" ref={register} />
            <br />
            <label>Comment</label>
            <br />
            <input type="text" name="comment" ref={register} />

            <br />
            <br />
            <input className="btn btn-success" type="submit" />
          </form>
        </div>
      </div>
    </Container>
  );
}

// function ViewCartHis(props) {
//   const test = props.test;
// }

export default ViewCartHis;*/
