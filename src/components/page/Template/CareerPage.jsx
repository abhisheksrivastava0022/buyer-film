import wave_line_white from "../../../assets/images/wave-line-white.svg";
import HeaderInner from "../../HeaderInner";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

const CareerPage = () => {
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

    const response = await getRequestApi(`post/type/career/${language}`, query);
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
                <div class="col-md-12 odd-even-carrer">
                  <div class="row g-0 border rounded mb-4 shadow-sm ">
                    <div class="p-4">
                      <strong class="d-inline-block mb-2 text-primary-emphasis">
                        {item?.post_meta?.advt_no}
                      </strong>
                      <h5 class="mb-0 job-title">
                        <b> {item.title}</b>
                      </h5>
                      <p>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-geo-alt"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"></path>
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
                        </svg>
                        &nbsp; {item?.post_meta?.location}
                      </p>
                      <hr />
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />

                      <div class="mt-4 ">
                        {" "}
                        <a
                          class="btn btn-primary"
                          href={item?.post_meta?.website_link}
                          target="_blank"
                        >
                          {" "}
                          {inner_post_meta?.button_text}
                        </a>
                      </div>
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

export default CareerPage;
