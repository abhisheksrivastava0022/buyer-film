import React from "react";
import wave_line_black from "../../../assets/images/wave-line-black.svg";
// import tender from "../../../assets/images/tender.jpg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Tenders = () => {
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const { language = "en" } = useParams();
  return (
    <>
      {/* <!-- Tender Section Start --> */}
      {/* <div className="d-md-flex flex-md-equal w-100 my-md-3">
        <div className="bg-body-tertiary prupleBG  pt-3 px-3 pt-md-5 px-md-5 text-start overflow-hidden w-50">
          <div className="my-3 p-3">
            <h3>
              {post_meta?.heading_text4 ? post_meta.heading_text4 : <></>}
            </h3>
            <p>
              <img src={wave_line_black} alt="" />
            </p>
            <p>
              {post_meta?.heading_content4 ? post_meta.heading_content4 : <></>}
            </p>
          </div>
        </div>
        <div className="text-bg-primary  text-start overflow-hidden w-50">
          <img src={tender} alt="" className="img-fluid" />
        </div>
      </div> */}
      {/* <!-- Tender Section End --> */}

      {/* <!-- Tender Section Start --> */}
      <div className="col-lg-12 tender-section ">
        <div className="container text-center">
          <h3 className="text-center">
            {post_meta?.heading_text4 ? post_meta.heading_text4 : <></>}{" "}
          </h3>
          <p>
            <img src={wave_line_black} />
          </p>
          <p>
            <strong>
              {post_meta?.heading_content4 ? post_meta.heading_content4 : <></>}
            </strong>
          </p>
          <span className="text-center pt-4">
            {/* <a className="btn btn-lg btn-primary" href="#">
              View Tender List
            </a> */}
            {/* <Link to={"/tenders"} className="btn btn-lg btn-primary">
              {post_meta?.sec_5_button_text ? (
                post_meta.sec_5_button_text
              ) : (
                <></>
              )}
            </Link> */}
            <Link to={`/tenders/${language}`} className="btn btn-lg btn-primary">
              {post_meta?.sec_5_button_text ? (
                post_meta.sec_5_button_text
              ) : (
                <></>
              )}
            </Link>
          </span>
        </div>
      </div>

      {/* <!-- Tender Section End --> */}
    </>
  );
};

export default Tenders;
