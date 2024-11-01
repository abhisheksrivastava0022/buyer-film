import React, { useEffect, useState } from "react";
import wave_line_black from "../../../assets/images/wave-line-black.svg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

const LatestNewsUpdates = () => {
  const { language = "en" } = useParams();
  const { getRequestApi } = ApiClient();
  const [loadData, setLoadData] = useState([]);
  const [sponsorDate, setSponsorData] = useState([]);
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const loadPreLoadData = async () => {
    const response = await getRequestApi(`post/type/news/${language}`);
    if (response.status) {
      setLoadData(response.data);
    }
    const responsesponsor = await getRequestApi(
      `post/type/sponsor/${language}`
    );
    if (responsesponsor.status) {
      setSponsorData(responsesponsor.data);
    }
  };
  useEffect(() => {
    loadPreLoadData();
  }, [language]);
  return (
    <>
      {/* <!-- News and update start --> */}

      <div className="d-md-flex flex-md-equal w-100 my-md-3 ">
        <div className="bg-body-tertiary  pt-3 px-3 pt-md-3 px-md-5 text-start overflow-hidden w-50">
          <div className="">
            <h3 className="d-flex heading-more-btn">
              {" "}
              {post_meta?.heading_text3 ? post_meta.heading_text3 : <></>}
            </h3>
            <p>
              <img src={wave_line_black} alt="" />
            </p>
            <p>
              {" "}
              <strong>
                {post_meta?.heading_content3 ? (
                  post_meta.heading_content3
                ) : (
                  <></>
                )}
              </strong>
            </p>
            <ol className="circle-list mt-3 news-height">
              {loadData ? (
                loadData.map((item) => (
                  <li key={item.id}>
                    {" "}
                    {/* Adding a unique key for each list item */}
                    <p className="news">{item.title}</p>
                    <p className="news-date-time">
                      {item.post_meta["created_at"]}
                    </p>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ol>
            <p className="text-center">
              {/* <Link
                className="btn btn-lg btn-primary border-btn"
                to={"/latest-news"}
              >
                More...
              </Link> */}
              <Link to={`/latest-news/${language}`} className="btn btn-lg btn-primary border-btn">
              {post_meta?.button_text_url ? (
                post_meta.button_text_url
              ) : (
                <></>
              )}
            </Link>
            </p>
          </div>
        </div>
        <div className="text-bg-primary greybg-carousel client-bg-carousel  pt-3  pt-md-3 px-md-3 text-start overflow-hidden w-50">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {sponsorDate ? (
                sponsorDate.map((item, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <a href={item?.post_meta?.external_link} target="_blank">
                      {" "}
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/gallery/${item?.featured_image?.url}`}
                        className="img-fluid w-100"
                        alt=""
                      />
                      {/* <span className="banner-btn">
                        <a
                          href={item?.post_meta?.external_link}
                          target="_blank"
                          className="btn btn-primary"
                        >
                          Click Here{" "}
                        </a>
                      </span> */}
                    </a>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="carousel-control-prev1">
              <button
                className=""
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className=""
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- News and update end --> */}
    </>
  );
};

export default LatestNewsUpdates;
