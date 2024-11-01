import wave_line_white from "../../../assets/images/wave-line-white.svg";
import HeaderInner from "../../HeaderInner";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";


const TenderPage = () => {
  const innerpagedata = useSelector((state) => state.innerPage);
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const inner_post_meta = innerpagedata?.post_meta
    ? innerpagedata.post_meta
    : {};
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

    const response = await getRequestApi(`post/type/tender/${language}`, query);
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

      <div class="col-lg-12 about-company " id="welcome">
        <div class="container ">
          <div class="tender-form ">
            <div class="tender-form">
              <div class="row">
                <div class="col-md-3 col-sm-3 mb-1">
                  <label htmlFor="name" class="form-label">
                    {inner_post_meta?.field_search_1}
                  </label>
                  <input
                    type="text"
                    name="title"
                    class="form-control"
                    id="name"
                    //    placeholder="Search By Name"
                    value={searchParams.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-md-3 col-sm-3 mb-1">
                  <label htmlFor="TenderDepartment" class="form-label">
                    {inner_post_meta?.field_search_2}
                  </label>
                  <input
                    type="text"
                    name="tendor_number"
                    class="form-control"
                    id="TenderDepartment"
                    // placeholder="Tender Department"
                    value={searchParams.tendor_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-md-3 col-sm-3 mb-1">
                  <label class="form-label">&nbsp;</label>
                  <button
                    onClick={handleSearchSubmit}
                    type="submit"
                    class="btn btn-primary btn-block w-100"
                  >
                    {inner_post_meta?.button_text}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12 video-section ">
        <div class="container static-content">
          <div className="col-lg-12" id="welcome">
            <div class="card px-4 py-4 mb-4">
              <div class="table table-responsive mb-0">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th scope="col">{inner_post_meta?.field_1}</th>
                      <th>{inner_post_meta?.field_2}</th>
                      <th scope="col">{inner_post_meta?.field_3}</th>
                      <th scope="col">{inner_post_meta?.field_4}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadData.length > 0 ? (
                      loadData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.post_meta["tendor_number"]}</td>
                          <td>{item.post_meta["created_at"]}</td>
                          <td>
                            <a
                              href={item.post_meta["pdf_link"]}
                              download
                              target="_blank"
                            >
                              
                              <i className="bi bi-download"></i> 
                              


                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">{inner_post_meta.text_no_record}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
                    class={`page-item ${
                      pagination.currentPage === index + 1 ? "active" : ""
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

export default TenderPage;
