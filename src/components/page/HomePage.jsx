import React, { useEffect, useState } from "react";
import Slider from "./Home/Slider";
import WelcomeBlog from "./Home/WelcomeBlog";
// import VideoBlog from './Home/VideoBlog';
import LatestNewsUpdates from "./Home/LatestNewsUpdates";
import PdfContainer from "./Home/PdfContainer";
import Tenders from "./Home/Tenders";
import HeaderInner from "../HeaderInner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Gallery from "./Home/Gallery";

const HomePage = () => {
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const loadData = async () => {
      // Fetch data logic here
      // For example: await fetchData();

      // After data is loaded, set loading to false
      setLoading(false);
    };

    loadData();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or placeholder
  }

  return (
    <>

      <HeaderInner />
      <Slider />
      <WelcomeBlog />
      {/* <VideoBlog /> */}
      <LatestNewsUpdates />
      <PdfContainer />
      <Tenders />
      <Gallery />
    </>
  );
};

export default HomePage;
