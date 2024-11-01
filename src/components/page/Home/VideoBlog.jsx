import React from "react";
import wave_line_black from "../../../assets/images/wave-line-black.svg";
// import video_nfdc from "../../../assets/images/video-nfdc.jpg";
import { useSelector } from "react-redux";

const VideoBlog = () => {
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};

  return (
    <>
      {/* <!-- Video Section Start --> */}
      <div className="col-lg-12 video-section">
        <div className="container">
          <div className=" text-center text-black ">
            <h3>
              {post_meta?.heading_text1 ? post_meta.heading_text1 : <></>}
            </h3>
            <img src={wave_line_black} alt="" />
            <div className="col-sm-8 mx-auto">
              <p>
                {post_meta?.heading_content1 ? (
                  post_meta.heading_content1
                ) : (
                  <></>
                )}
              </p>

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
        </div>
      </div>
      {/* <!-- Video Section End --> */}
    </>
  );
};

export default VideoBlog;
