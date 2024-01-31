// ShowDetail.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookingForm from "./BookingForm";
import "./ShowDetail.css";

const ShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ShowDetail ID:", id);

  const [show, setShow] = useState(null);

  useEffect(() => {
    console.log("ShowDetail Mounted");

    const fetchData = async () => {
      try {
        console.log("Fetching data for ID:", id);

        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        console.log("API Response:", response.data);

        setShow(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      console.log("ShowDetail Unmounted");
    };
  }, [id]);

  useEffect(() => {
    console.log(show);
  }, [show]);

  const handleBookingClick = () => {
    // Extract showName directly from the show data
    const showName = show?.name || "Unknown";

    // Ensure showName is properly encoded before passing it to navigate
    const encodedShowName = encodeURIComponent(showName);

    // Navigate to the /booking route with the encoded showName as a query parameter
    navigate(`/booking?showName=${encodedShowName}`);
  };

  if (!show) {
    return <div style={{display:'flex',justifyContent:"center",alignItems:"center", fontSize:"30px",marginTop:'5rem'}}>Loading...</div>;
  }

  return (
    <div className="main">
      <div className="left">
        {show.image?.original && (
          <img src={show.image.original} alt={show.name} />
        )}
      </div>
      <div className="right">
        <h2>{show.name}</h2>
        <p>Language: {show.language ?? "N/A"}</p>
        <p>Genres: {show.genres ? show.genres.join(", ") : "N/A"}</p>
        <p>Duration: {show.runtime} minutes</p>
        <p>Premiered: {show.premiered}</p>
        <p>Rating: {show.rating?.average ?? "Not Present"}</p>

        <div
          dangerouslySetInnerHTML={{
            __html: show.summary || "No summary available.",
          }}
        />
        {/* Use a function to navigate to the /booking route */}
        <button onClick={handleBookingClick} className="booking-link">
          Book a Movie Ticket
        </button>
      </div>
    </div>
  );
};

export default ShowDetail;
