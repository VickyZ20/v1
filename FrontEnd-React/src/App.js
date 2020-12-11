import React, { useState, useEffect } from "react";
import Hola from "./hola/hola.js";
import CreatePost from "./createPost/CreatePost.js";
import SearchPage from "./searchPage/SearchPage.js";
import ViewCartHis from "./components/ViewCart.js";
import Home from "./home/Home.js";
/*import MakeAppointment from "./makeAppointment/MakeAppointment.js";*/
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  useHistory,
} from "react-router-dom";
/*import UserContext from "./components/UserContext";*/
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./loginAndLogOutPage/SignUp";
import SignIn from "./loginAndLogOutPage/Login";
import MyBooking from "./MyBooking/MyBooking.js";

function App() {
  let history = useHistory();

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("current-user");
    if (data) {
      setUserInfo(data);
    }
  }, []);

  let p = new Promise((resolve, reject) => {});

  return (
    <Router>
      <Switch>
        <Route exact path="/hola" component={Hola} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/signin" component={SignIn} />

        <Route path="/searchpage" component={SearchPage} />
        <Route path="/MyBooking" component={MyBooking} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/home" component={Home} />
        <Route path="/ViewCart" component={ViewCartHis} />
        <Route path="/" component={SignIn} />
        <Route path="/App" component={App} />
      </Switch>
    </Router>
  );
}

export default App;
