import wave_line_white from "../../../assets/images/wave-line-white.svg";
import HeaderInner from "../../HeaderInner";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

const VideoPage = () => {
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
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index

  const loadPreLoadData = async (page = 1) => {
    const query = { limit: pagination.limit, page, ...searchParams };

    const response = await getRequestApi(`post/type/video/${language}`, query);
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

  // Open modal and set current image index
  const openModal = (index) => {
    setCurrentIndex(index);
    const youtubelink = loadData[index]?.post_meta?.youtube_line;
    console.log({ youtubelink });
    if (youtubelink) {
      document.getElementById("embeded_video").innerHTML = `
    <iframe width="100%" height="400" 
        src="${youtubelink}?autoplay=1&mute=1" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>`;
    } else {
      const videolink = loadData[index]?.post_meta?.videolink;

      if (videolink) {
        document.getElementById("embeded_video").innerHTML = `<video
                              className="responsive-video embed-responsive-item"
                              autoPlay
                              muted
                              loop
                              playsInline
                              src=${videolink}
                           ></video>`;
      }
    }

    const modalCaption = document.getElementById("modalCaption");

    if (modalCaption) {
      // modalImage.src = `${process.env.REACT_APP_BASE_URL}/api/gallery/${selectedImage}`;
      modalCaption.textContent = loadData[index]?.title || "";
    }
  };

  // Show next image
  const showNextImage = () => {
    const newIndex = (currentIndex + 1) % loadData.length; // Loop back to first image
    openModal(newIndex);
  };

  // Show previous image
  const showPrevImage = () => {
    const newIndex = (currentIndex - 1 + loadData.length) % loadData.length; // Loop back to last image
    openModal(newIndex);
  };

  return (
    <>
      <div class="hero-banner-background" style={bannerStyle}>
        {/* <div class="text-center logo-ndfc">
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
      <div class="col-lg-12 video-section">
        <div class="container static-content">
          <div class="row mb-2">
            {loadData.length > 0 ? (
              loadData.map((item, index) => (
                <div class="col-md-4 d-flex  odd-even-carrer " key={index}>
                  <div class="card p-2">
                    <p>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/gallery/${item.featured_image.url}`}
                        class="img-fluid"
                        alt={item.title}
                        data-bs-toggle="modal"
                        data-bs-target="#imageModal"
                        onClick={() => openModal(index)} // Open modal on click
                      />
                    </p>
                    <div class="card-text">
                      <strong class="d-inline-block mb-2 text-primary-emphasis">
                        {item.title}
                      </strong>
                      <p class="card-text mb-auto">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </p>
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

        {/* Modal for full-size images */}
        <div
          class="modal fade popup-dark-bg"
          id="imageModal"
          tabindex="-1"
          aria-labelledby="imageModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="imageModalLabel">
                  Video
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div id="embeded_video"></div>
                <p id="modalCaption" class="mt-2"></p>
              </div>
              <div class="modal-footer">
                <button
                  id="prevBtn"
                  class="btn btn-primary"
                  onClick={showPrevImage}
                >
                  Previous
                </button>
                <button
                  id="nextBtn"
                  class="btn btn-primary"
                  onClick={showNextImage}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
