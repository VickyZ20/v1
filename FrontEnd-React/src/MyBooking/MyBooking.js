import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container } from "react-bootstrap";
import CardView from "../components/Card";
import "./MyBooking.css";

function MyBooking() {
  const [appointments, setAppointments] = useState("");
  const [dataStatus, setDataStatus] = useState(false);

  const getInfo = async () => {
    const res = await fetch("/get_appointment_query", { method: "GET" });
    const data = await res.json();
    console.log(data);
    setAppointments(data);
    setDataStatus(true);
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Container>
      {dataStatus ? (
        <div className="booking">
          <h1>MyBooking History</h1>
          {appointments.map((t) => (
            <ul>
              <li key={t.id}>
                from {t.start}
                to {t.end}
              </li>
            </ul>

            //<p key={t.id}>{t.end}</p>
            //<CardView appointment={t} start={t.start} end={t.end} />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </Container>
  );
}

export default MyBooking;
