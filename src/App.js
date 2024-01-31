// App.js
import React from "react";
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetail from "./components/ShowDetail";
import BookingForm from "./components/BookingForm";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ShowList />} />
        <Route exact path="/show/:id" element={<ShowDetail />} />
        <Route exact path="/booking" element={<BookingForm/>} />
      </Routes>
      </BrowserRouter>
      {/* <BookingForm /> */}
    </>
  );
};

export default App;
