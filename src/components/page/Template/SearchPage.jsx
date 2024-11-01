import wave_line_white from "../../../assets/images/wave-line-white.svg";
import HeaderInner from "../../HeaderInner";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SearchPage = () => {
  const [searchQueryobj] = useSearchParams(); // Use searchParams to track URL query parameters
  const searchQuery = searchQueryobj.get("q"); // Extract the query parameter `q`

  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const query = useQuery();

  const { language = "en", q = null } = useParams();
  const { getRequestApi } = ApiClient();
  const [loadData, setLoadData] = useState([]);
  const [pagination, setPagination] = useState({
    totalPosts: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });
  const [searchParams, setSearchParams] = useState({
    title: searchQuery,
    tendor_number: "",
  });

  const loadPreLoadData = async (page = 1, q) => {
    const query = { limit: pagination.limit, page, title: q };

    const response = await getRequestApi(`post/search/${language}`, query);
    if (response.status) {
      setLoadData(response.data);
      setPagination(response.pagination);
    }
  };

  useEffect(() => {
    loadPreLoadData(1, searchQuery);
  }, [language, searchQueryobj]);

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
      <div class="hero-banner-background">
        {/* <div class="text-center logo-ndfc" >
                    <Link to={"/"}>
                        <img src={post_meta?.Logo ? post_meta.Logo : ""} alt='logo' />
                    </Link>
                </div> */}
        <HeaderInner />
        <div class="container text-center">
          <h1 class="page-title">Search</h1>
          <p>
            {" "}
            <img src={wave_line_white} alt="" />{" "}
          </p>
        </div>
      </div>

      <div class="col-lg-12 about-company " id="welcome">
        <div class="container "></div>
      </div>
      <div class="col-lg-12 video-section ">
        <div class="container static-content">
          <div className="col-lg-12" id="welcome">
            <div className="col-lg-12" id="welcome">
              <div class="card px-4 py-4 mb-4">
                {loadData.length > 0 ? (
                  loadData.map((item) => (
                    <div
                      key={item.id}
                      className="col-md-12 search-result card mb-2 px-3 pt-3"
                    >
                      <Link to={`/${item.slug}`} href={`/${item.slug}`}>
                        <p>
                          <b>{item.title}</b>
                        </p>
                      </Link>
                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.short_description,
                          }}
                        />
                      </p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
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
      </div>
    </>
  );
};

export default SearchPage;
