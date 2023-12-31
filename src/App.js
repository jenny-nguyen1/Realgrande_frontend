import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import House from "./components/House";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchFilter from "./components/SearchFilter";
import SearchResults from "./components/SearchResults";
import SearchedHouse from "./components/SearchedHouse";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import axios from "axios";
import EnquiryList from "./components/EnquiryList";

function App() {
  let [housesData, setHousesData] = useState([]);

  // to read houses.json and send one house obj to House.js
  useEffect(() => {
    console.log("in useEffect");
    const fetchData = async () => {
      // let resp = await fetch("/houses.json");
      // let resp = await axios.get("http://localhost:3012");
      let resp = await axios.get(process.env.REACT_APP_BACKEND_URL);
      let data = await resp.data;
      // let data = await resp.json();
      // console.log(' date from json - ');
      console.log(data);
      setHousesData(data);
      // console.log('data from state');
      console.log(housesData);
      //write the data to the state so we can use it anywhere in the component
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <SearchFilter houses={housesData} />
      <Routes>
        <Route path="/" element={<House houseinfo={housesData[1]} />} />
        <Route
          path="searchresults/:county"
          element={<SearchResults houses={housesData} />}
        />
        <Route
          path="searchedHouse/:id"
          element={<SearchedHouse houses={housesData} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enquiries" element={<EnquiryList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;