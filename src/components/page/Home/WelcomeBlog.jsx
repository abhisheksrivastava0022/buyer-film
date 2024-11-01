import React from "react";
import wave_line_black from "../../../assets/images/wave-line-black.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WelcomeBlog = () => {
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  console.log({ post_meta });
  return (
    <>
      {/* <!-- About Company  --> */}
      {/* <div className="col-lg-12 about-company" id="welcome">
        <div className="container">
          <div className="text-center text-white">
            <div className="circle-icon">
              <Link to={"#welcome"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-arrow-down-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                    id="myCircle"
                  />
                </svg>
              </Link>
            </div>
            <h2>{post_meta?.heading_text ? post_meta.heading_text : <></>}</h2>
            <img src={wave_line_white} alt="" />
            <div className="col-sm-8 mx-auto">
              <p>
                {post_meta?.heading_content ? post_meta.heading_content : <></>}
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- About Company Ends  --> */}
      <>
        <div className="d-md-flex flex-md-equal w-100 my-md-3">
          <div className="text-bg-primary bg-img pb-3 client-bg-carousel pt-3 pt-md-3 px-md-3 text-start overflow-hidden w-50">
            <div className="text-center text-black">
              <div className="video-container">
                <div className="video-container ratio ratio-16x9">
                  <video
                    className="responsive-video embed-responsive-item"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={post_meta?.video_link ? post_meta.video_link : ""}
                  ></video>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-body-tertiary pt-3 px-3 pt-md-3 px-md-5 text-start overflow-hidden w-50">
            <div>
              <h3 className="d-flex">
                {post_meta?.heading_text ? post_meta.heading_text : <></>}
              </h3>
              <p>
                <img src={wave_line_black} alt="" />
              </p>
              <p className="pt-4">
                {post_meta?.heading_content ? post_meta.heading_content : <></>}
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default WelcomeBlog;
