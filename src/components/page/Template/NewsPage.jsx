import wave_line_white from "../../../assets/images/wave-line-white.svg";
import defaultimage from "../../../assets/images/news-update-default.jpg";
import HeaderInner from "../../HeaderInner";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

const NewsPage = () => {
  const innerpagedata = useSelector((state) => state.innerPage);
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  let bannerStyle = null;
  if (innerpagedata?.featured_image?.url) {
    bannerStyle = {
      backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/api/gallery/${innerpagedata.featured_image.url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    };
  }
  const { language = "en" } = useParams();
  const { getRequestApi } = ApiClient();
  const [loadData, setLoadData] = useState([]);
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

    const response = await getRequestApi(`post/type/news/${language}`, query);
    if (response.status) {
      setLoadData(response.data);
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
          <div class="row mb-2">
            {loadData.length > 0 ? (
              loadData.map((item) => (
                <div class="news-section col-lg-12">
                  <div class="row mb-2">
                    <div class="col-md-6">
                      {item?.featured_image?.name ? (
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/api/gallery/${item?.featured_image?.url}`}
                          alt={item?.featured_image?.name}
                          class="img-fluid"
                        />
                      ) : (
                        <img
                          class="img-fluid"
                          src={defaultimage}
                          alt="default-news-image"
                        />
                      )}
                    </div>
                    <div class="col-md-6 ">
                      <h3 class="mb-0">{item.title}</h3>
                      <p class="card-text">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        {/* {item.short_description} */}
                      </p>
                      {/* <div class="mb-1 text-body-secondary">
                        {item?.post_meta?.created_at}
                      </div>
                      <a href={item?.post_meta?.pdf_link}>
                        Download
                        <b><i className="bi bi-download" style={{ fontSize: "1.5em", color: "black" }}></i></b>
                      </a> */}  
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          <div class="col-md-12">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                {pagination.currentPage > 1 && (
                  <li class="page-item">
                    <button
                      class="page-link"
                      onClick={() =>
                        handlePageChange(pagination.currentPage - 1)
                      }
                    >
                      Previous
                    </button>
                  </li>
                )}
                {[...Array(pagination.totalPages)].map((_, index) => (
                  <li
                    class={`page-item ${pagination.currentPage === index + 1 ? "active" : ""
                      }`}
                    key={index}
                  >
                    <button
                      class="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                {pagination.currentPage < pagination.totalPages && (
                  <li class="page-item">
                    <button
                      class="page-link"
                      onClick={() =>
                        handlePageChange(pagination.currentPage + 1)
                      }
                    >
                      Next
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
