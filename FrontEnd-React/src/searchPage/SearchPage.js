import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container } from "react-bootstrap";
import "./searchPage.css";
import { Redirect } from "react-router-dom";
import CardView from "../components/Card";

import { useHistory } from "react-router-dom";
import * as loginToken from "../components/loginTokenAndSignOff";
import Navbar from "../components/navBar/Navbar";
import Pagination from "@material-ui/lab/Pagination";
//import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ViewCartHis from "../components/ViewCart.js";

function SearchPage(props) {
  const history = useHistory();

  const [test, setPost] = useState("");
  //const [posts, setPost] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [sendPostData, setSendPostData] = useState("");

  const [visibleThreads, setVisibleThreads] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [showComments, setShowComments] = useState(false);
  const [id, setId] = useState("");

  const [mapaddress, setMapaddress] = useState("");

  // const [pages, setPages] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [feed, setFeed] = useState(undefined);

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  useEffect(() => {
    if (sendPostData.length > 0) {
      // search list
      const currentPageData = sendPostData.slice(offset, offset + PER_PAGE);
      setVisibleThreads(currentPageData);
    } else {
      const currentPageData = test.slice(offset, offset + PER_PAGE);
      setVisibleThreads(currentPageData);
    }
  }, [test, setPost, offset]);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  // useEffect(() => {
  //   fetch("/pagesFeed")
  //     .then((res) => res.json())
  //     .then((newPages) => setPages(newPages));
  // }, []);

  // useEffect(() => {
  //   fetching();
  // }, []);

  // const fetching = async () => {
  //   const res = await fetch("/loadFeed");
  //   const newFeed = await res.json();
  //   setFeed(newFeed);
  // };

  // const handleChange = async (event, newCurrent) => {
  //   setPageNumber(newCurrent);
  //   const res = await fetch(`/pageFeed/${newCurrent}`);
  //   const newFeed = await res.json();
  //   setFeed(newFeed);
  // };

  const getInfo = async () => {
    const res = await fetch("/get_data", { method: "GET" });
    const data = await res.json();
    setPost(data);
    setDataStatus(true);
  };

  const searchByMapAdd = async () => {
    const res = await fetch("/get_data_query", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mapaddress: mapaddress }),
    });
    const data = await res.json();

    setPost(data);

    return data;
  };

  const handleAddInputChange = (event) => {
    setMapaddress(event.target.value);
  };

  useEffect(() => {
    getInfo();
  }, []);

  //check database if the user is in the currently login collection
  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const data = localStorage.getItem("current-user");

    if (data) {
      const result = await loginToken.checkCurrentLogin({ email: data });
      console.log(result);
      if (result.result === false) {
        history.push("/v_signin");
      }
    }
  };

  const handleLogOut = async () => {
    const data = localStorage.getItem("current-user");
    await loginToken.deleteLoginToken({ email: data });
    await localStorage.removeItem("current-user");
  };

  // const goToPost = (post) => {
  //   setSendPostData(post);
  //   localStorage.setItem(
  //     "post-picked",
  //     JSON.stringify(post)
  //   ); /*storing data in Local and retreive in calendard*/
  // };
  const goToPost = (test) => {
    setSendPostData(test);
    localStorage.setItem(
      "post-picked",
      JSON.stringify(test)
    ); /*storing data in Local and retreive in calendard*/
  };

  if (sendPostData !== "") {
    return <Redirect to="/ViewCart" />;
  }

  const cardViewStyle = {
    margin: "20px",
    borderRadius: "20px ",
    overflow: "hidden",
  };

  return (
    <div className="searchpost-page-body">
      <Navbar
        searchPostActive={{ borderBottom: "4px solid black" }}
        logoutFunction={handleLogOut}
      />

      <div className="searchpost-filter-area">
        <input
          aria-label="search-field-zipcode"
          className="searpost-input-zip"
          type="text"
          placeholder="Address"
          onChange={handleAddInputChange}
        />

        <button className="btn-search" onClick={searchByMapAdd}>
          Seach
        </button>
        <button className="btn-reset" onClick={getInfo}>
          Back
        </button>
      </div>

      <Container>
        {dataStatus ? (
          <div className="grid ">
            {test.map((t) => (
              <CardView
                style={cardViewStyle}
                images={t.images}
                post={t}
                result-price={t["result-price"]}
                result-title={t["result-title"]}
                mapaddress={t.mapaddress}
                housing={t.housing}
                function={goToPost}
                buttonName="Details"
                onClick={() => {
                  setShowComments(true);
                  setId(t._id);
                  console.log("id", id);
                }}
              />
            ))}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </Container>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(
          (sendPostData.length > 0 ? sendPostData.length : test.length) /
            PER_PAGE
        )}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(
          (sendPostData.length > 0 ? sendPostData.length : test.length) /
            PER_PAGE
        )}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {showComments ? <ViewCartHis id={id}></ViewCartHis> : ""}
    </div>
  );
}

/*{posts.map(cardDetail)
  return (
    <div className="searchpost-filter-area">
        <input
          aria-label ="search-field-zipcode"
          className="searpost-input-zip"
          type="text"
          placeholder="Search By Zip Code"
          onChange={handleZipInputChange}
        />

        <button className="btn-search" onClick={searchByZipCode}>
          Seach
        </button>
        <button className="btn-reset" onClick={getInfo}>
          Reset
        </button>
      </div>
    <React.Fragment>
      <Container>
        {dataStatus ? (
        <div className="grid ">
          {test.map((t) => (
            <CardView
              style={cardViewStyle}
              images={t.images}
              post={t}
              result-price={t["result-price"]}
              result-title={t["result-title"]}
              housing={t.housing}
              function={goToPost}
              buttonName="Details"
            />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </Container>
  <React.Fragment>
  );
}
*/
export default SearchPage;
