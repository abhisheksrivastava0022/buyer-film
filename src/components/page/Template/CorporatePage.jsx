import wave_line_white from "../../../assets/images/wave-line-white.svg";
import HeaderInner from "../../HeaderInner";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

const CorporatePage = () => {
  const innerpagedata = useSelector((state) => state.innerPage);
  const homePage = useSelector((state) => state.homePage);
  let bannerStyle = null;
  if (innerpagedata?.featured_image?.url) {
    bannerStyle = {
      backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/api/gallery/${innerpagedata.featured_image.url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    };
  }
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const inner_post_meta = innerpagedata?.post_meta
    ? innerpagedata.post_meta
    : {};

  const { language = "en" } = useParams();
  const { getRequestApi } = ApiClient();
  const [loadData, setLoadData] = useState([]);
  const [loadManagement, setloadManagement] = useState([]);
  const [pagination, setPagination] = useState({
    totalPosts: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });
  const [searchParams, setSearchParams] = useState({
    title: "",
    tendor_number: "",
  });
  const loadPreLoadData = async (page = 1) => {
    const query = { limit: pagination.limit, page, ...searchParams };

    const response = await getRequestApi(
      `post/type/AnnualReport/${language}`,
      query
    );
    if (response.status) {
      setLoadData(response.data);
      setPagination(response.pagination);
    }
    const responsemanagement = await getRequestApi(
      `post/type/CAWFIReport/${language}`,
      query
    );
    if (response.status) {
      setloadManagement(responsemanagement.data);
      setPagination(response.pagination);
    }
  };

  useEffect(() => {
    loadPreLoadData();
  }, [language]);

  const handlePageChange = (page) => {
    loadPreLoadData(page);
  };
  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadPreLoadData();
  };
  return (
    <>
      <div class="hero-banner-background" style={bannerStyle}>
        {/* <div class="text-center logo-ndfc" >
                    <Link to={"/"}>
                        <img src={post_meta?.Logo ? post_meta.Logo : ""} alt='logo' />
                    </Link>
                </div> */}
        <HeaderInner />
        <div class="container text-center">
          <h1 class="page-title">
            {innerpagedata?.title ? innerpagedata?.title : <></>}
          </h1>
          <p>
            {" "}
            <img src={wave_line_white} alt="" />{" "}
          </p>
        </div>
      </div>
      <div class="col-lg-12 video-section ">
        <div class="container static-content">
          <div class="row ">
            <div class="col-md-6 col-sm-6">
              <img src={inner_post_meta?.image} alt="" class="img-fluid" />
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="pdf-download">
                <h4 class="pdf-heading">{inner_post_meta?.heading_1}</h4>

                {loadData.length > 0 ? (
                  loadData.map((item) => (
                    <a href={item.post_meta.download_link} class="btn btn-pdf">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-download"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"></path>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"></path>
                      </svg>{" "}
                      {item.title}
                    </a>
                  ))
                ) : (
                  <></>
                )}

                <div class="pdf-download">
                  <h4 class="pdf-heading">{inner_post_meta?.heading_2}</h4>
                  {loadManagement.length > 0 ? (
                    loadManagement.map((item) => (
                      <a
                        href={item.post_meta.download_link}
                        class="btn btn-pdf"
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-download"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"></path>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"></path>
                        </svg>{" "}
                        {item.title}
                      </a>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorporatePage;
