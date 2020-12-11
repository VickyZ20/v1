import React, { useState, useEffect } from "react";
import SearchPage from "../searchPage/SearchPage.js";
import { Container } from "react-bootstrap";
import CardVie from "../components/Card";
import CardView from "./CardV";
import "./ViewCart.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";

function ViewCartHis(props) {
  /* const Thread = (props) => {
    useEffect([]);

    const htmlContent = (
      <div className="container">
        <div className="content">
          <div className="subject">
            {props.titleOfPage ? (
              <h1>{props.thread.subject}</h1>
            ) : (
              <h2>{props.thread.subject}</h2>
            )}
          </div>
          <div className="date">Created by {props.thread.user.name}</div>
          <div className="tags">
            Tags:{" "}
            {props.thread.tags &&
            props.thread.tags.length &&
            Array.isArray(props.thread.tags)
              ? props.thread.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))
              : ""}
          </div>
        </div>
        <div className="comments vertical-centering">
          <p>{props.thread.count - 1} comments</p>
        </div>
      </div>
    );

    if (props.clickable) {
      return (
        <Link
          className="thread"
          to={{
            pathname: "/thread/" + props.thread.id,
            state: { threadId: props.thread.id },
          }}
        >
          {htmlContent}
        </Link>
      );
    } else {
      return <div className="thread">{htmlContent}</div>;
    }
  }; */

  const [parties, setParties] = useState([]);

  const [comments, setComments] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const getInfo = async () => {
    const res = await fetch("/get_comment_query", { method: "GET" });
    const data = await res.json();
    console.log(data);
    setComments(data);
    setDataStatus(true);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const { register, handleSubmit } = useForm();

  const getParties = async () => {
    try {
      const parties = await fetch("/get_appointment_query", {
        method: "GET",
      }).then((res) => res.json());

      setParties(parties);
    } catch (err) {
      console.log("error ", err);
    }
  };
  // hello
  useEffect(() => {
    getParties();
  }, []); // Only run the first time

  const renderUserParties = () => {
    return parties
      .filter((t) => t._id && t._id === props.id)
      .map((t) => (
        <div className="card-deck">
          <Card style={{ width: "20rem", margin: "2rem" }} key={t._id}>
            <CardImg
              top
              width="100%"
              src={t.images[0]}
              className="card-img-top"
              alt="party image"
            />

            <CardBody>
              <CardTitle>
                <strong>
                  <h5>{t.titletextonly}</h5>
                </strong>
              </CardTitle>

              <CardSubtitle>
                <span className="btn btn-outline-info">Cost ${t.price}</span>
              </CardSubtitle>

              <CardText>{t.postingbody}</CardText>

              <Button color="success" href={t["result-hood"]}>
                Party here !
              </Button>
            </CardBody>

            <CardFooter className="text-muted">
              Created by {t.authorLastName}, {t.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

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
          {comments.map((t) => (
            <ul>
              <li key={t.id}>
                {t.authorFirstName}
                {t.authorLastName}
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

export default ViewCartHis;
/*
import React, { useState, useEffect } from "react";
import SearchPage from "../searchPage/SearchPage.js";

import CardView from "./CardV";
import "./ViewCart.css";
import { useForm } from "react-hook-form";

import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";

function ViewCartHis(props) {
  const [appointments, setAppointments] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [parties, setParties] = useState([]);

  const { register, handleSubmit } = useForm();
  const getParties = async () => {
    try {
      const parties = await fetch("/get_appointment_query").then((res) =>
        res.json()
      );

      setParties(parties);
    } catch (err) {
      console.log("error ", err);
    }
  };
  // hello
  useEffect(() => {
    getParties();
  }, []); // Only run the first time

  const renderUserParties = () => {
    return parties
      .filter((t) => t._id && t._id === props.id)
      .map((t) => (
        <div className="card-deck">
          <Card style={{ width: "20rem", margin: "2rem" }} key={t._id}>
            <CardImg
              top
              width="100%"
              src={t.images[0]}
              className="card-img-top"
              alt="party image"
            />

            <CardBody>
              <CardTitle>
                <strong>
                  <h5>{t.name}</h5>
                </strong>
              </CardTitle>

              <CardSubtitle>
                <span className="btn btn-outline-info">Cost ${t.cost}</span>
              </CardSubtitle>

              <CardText>{t.dest}</CardText>

              <Button color="success" href={t.web}>
                Party here !
              </Button>
            </CardBody>

            <CardFooter className="text-muted">
              Created by {t.authorLastName}, {t.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

  function seeComments() {
    const getInfo = async () => {
      const res = await fetch("/get_comment_query", { method: "GET" });
      const data = await res.json();
      console.log(data);
      setAppointments(data);
      setDataStatus(true);
    };
    console.log("commentsection");
    return parties
      .filter((p) => p._id && p._id === props.id)
      .map((p) => (
        <div
          className="media-body p-2 shadow-sm rounded bg-light border"
          key={p._id}
        >
          {p.commentList.map((commentNum) => (
            <div>
              <h6 className="mt-0 mb-1 text-muted">
                {commentNum.firstName}, {commentNum.lastName}
              </h6>
              {commentNum.comment}
            </div>
          ))}
        </div>
      ));
  }

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
    <div className="row">
      <div className="col-8">
        {renderUserParties()}
        {seeComments()}
      </div>
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
  );
}

// function ViewCartHis(props) {
//   const test = props.test;
// }

export default ViewCartHis;
*/
