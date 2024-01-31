// ShowList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultImage from "./default-image.jpg"; // Import your default image
import "./ShowList.css"; // Import the CSS file

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Watch your favourite shows!</h1>
      <div className="show-list-container">
        {shows.map((show) => (
          <div key={show.show.id} className="show-card">
            <h2 className="show-title">{show.show.name}</h2>
            <p className="show-genres">{show.show.genres.join(", ")}</p>
            {show.show.image && show.show.image.medium ? (
              <img
                className="show-image"
                src={show.show.image.medium}
                alt={show.show.name}
              />
            ) : (
              <img
                className="show-image"
                src={defaultImage}
                alt="Default Image"
                style={{ height: "18.4rem" }}
              />
            )}
            <Link to={`/show/${show.show.id}`} className="show-details-link">
              <button> Find More Details</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowList;
