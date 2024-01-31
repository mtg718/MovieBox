import React, { useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import "./BookingForm.css";

const BookingForm = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const showName = queryParams.get("showName");
  const navigate = useNavigate(); // React Router's useNavigate hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.address
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Save the form data to local storage
    const bookingData = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      address: formData.address,
    };

    // Check if localStorage is supported in the browser
    if (typeof Storage !== "undefined") {
      // Retrieve existing data from localStorage or initialize an empty array
      const existingData =
        JSON.parse(localStorage.getItem("bookingData")) || [];

      // Add the new bookingData to the array
      existingData.push(bookingData);

      // Save the updated array back to localStorage
      localStorage.setItem("bookingData", JSON.stringify(existingData));

      // For simplicity, let's also log the form data to the console
      console.log("Booking form submitted:", bookingData);

      // Clear the form fields after submission
      setFormData({
        name: "",
        email: "",
        contact: "",
        address: "",
      });

      // Set the formSubmitted state to true
      setFormSubmitted(true);

      // Redirect to the home page after a delay (simulating a thank you message)
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      alert("Local storage is not supported in this browser");
    }
  };

  return (
    <div className="booking-form">
      <h2>Booking Form for {showName}</h2>
      {formSubmitted ? (
        <div className="thank-you-message">
          <p>Thank you for submitting your booking!</p>
          <p>Redirecting to the home page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              style={{ borderRadius: "5px" }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              style={{ borderRadius: "5px" }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </label>
          <br />
          <label>
            Contact:
            <input
              style={{ borderRadius: "5px" }}
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
            />
          </label>
          <br />
          <label>
            Address:
            <input
              style={{ borderRadius: "5px" }}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </label>
          <br />
          <button type="submit">Submit Booking</button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
