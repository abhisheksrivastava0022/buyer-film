import wave_line_white from "../../../assets/images/wave-line-white.svg";
import HeaderInner from "../../HeaderInner";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";
import twitter from "../../../assets/images/twitter.png";
import linkedin from "../../../assets/images/linkedin.png";
import profile_image from "../../../assets/images/profile-image.jpg";

const BoardPage = () => {
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
  const [loadboard, setLoadboard] = useState([]);
  const [pagination, setPagination] = useState({
    totalPosts: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 100,
  });
  const [searchParams, setSearchParams] = useState({
    title: "",
    tendor_number: "",
  });
  const loadPreLoadData = async (page = 1) => {
    const query = { limit: pagination.limit, page, ...searchParams };

    const response = await getRequestApi(`post/type/member/${language}`, query);
    const groupedContact = response.data.reduce((acc, post) => {
      const addressType = post?.post_meta?.type
        ? post?.post_meta?.type
        : "others";
      const address = post.content.replace(/<\/?p>/g, ""); // Remove <p> tags

      if (!acc[addressType]) {
        acc[addressType] = [];
      }

      acc[addressType].push({
        title: post.title,
        address: address,
        post_meta: post?.post_meta,
      });

      return acc;
    }, {});
    console.log({ groupedContact });

    if (response.status) {
      const data = response.data;
      if (groupedContact.minister) {
        const sortedData = groupedContact.minister.sort((a, b) => {
          const sortA = a.post_meta.sort_number
            ? parseInt(a.post_meta.sort_number)
            : Number.MAX_SAFE_INTEGER;
          const sortB = b.post_meta.sort_number
            ? parseInt(b.post_meta.sort_number)
            : Number.MAX_SAFE_INTEGER;

          return sortA - sortB;
        });

        setLoadData(sortedData);
      }
      if (groupedContact.management) {
        const sortedData1 = groupedContact.management.sort((a, b) => {
          const sortA = a.post_meta.sort_number
            ? parseInt(a.post_meta.sort_number)
            : Number.MAX_SAFE_INTEGER;
          const sortB = b.post_meta.sort_number
            ? parseInt(b.post_meta.sort_number)
            : Number.MAX_SAFE_INTEGER;

          return sortA - sortB;
        });
        setloadManagement(sortedData1);
      }
      if (groupedContact.board) {
        const sortedData2 = groupedContact.board.sort((a, b) => {
          const sortA = a.post_meta.sort_number
            ? parseInt(a.post_meta.sort_number)
            : Number.MAX_SAFE_INTEGER;
          const sortB = b.post_meta.sort_number
            ? parseInt(b.post_meta.sort_number)
            : Number.MAX_SAFE_INTEGER;

          return sortA - sortB;
        });
        setLoadboard(sortedData2);
      }
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
          <div class="col-lg-12" id="welcome">
            <div class="row text-left-">
              <h4 class="pt-4">{inner_post_meta?.heading1}</h4>

              {loadData.length > 0 ? (
                loadData.map((item) => (
                  <div class="col-md-6 col-sm-12 d-flex">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div class="col-auto d-none d-lg-block p-3 pt-3 ">
                        <img
                          src={
                            item?.post_meta?.image
                              ? item?.post_meta?.image
                              : profile_image
                          }
                          className="profile-img"
                          alt="Profile"
                        />
                      </div>
                      <div class="col p-3 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis">
                          {item.title}
                        </strong>
                        <div class="card-text mb-auto">
                          <p class="mb-0"> {item.post_meta.details}</p>
                          <p class="mt-0 profile-link">
                            {item?.post_meta?.twitter_link ? (
                              <a href={item.post_meta.twitter_link}>
                                <img src={twitter} alt="twitter" />
                              </a>
                            ) : null}
                            {item?.post_meta?.linkedin_link ? (
                              <a href={item.post_meta.linkedin_link}>
                                <img src={linkedin} alt="linkedin_link" />
                              </a>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12 video-section ">
        <div class="container static-content">
          <div class="col-lg-12" id="welcome">
            <div class="row text-left-">
              <h4 class="pt-4">{inner_post_meta?.heading2}</h4>

              {loadboard && loadboard.length > 0 ? (
                loadboard.map((item) => (
                  <div class="col-md-6 col-sm-12 d-flex">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div class="col-auto d-none d-lg-block p-3 pt-3 ">
                        <img
                          src={
                            item?.post_meta?.image
                              ? item?.post_meta?.image
                              : profile_image
                          }
                          className="profile-img"
                          alt="Profile"
                        />
                      </div>
                      <div class="col p-3 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis">
                          {item.title}
                        </strong>
                        <div class="card-text mb-auto">
                          <p class="mb-0"> {item.post_meta.details}</p>
                          <p class="mt-0 profile-link">
                            {item?.post_meta?.twitter_link ? (
                              <a href={item.post_meta.twitter_link}>
                                <img src={twitter} alt="twitter" />
                              </a>
                            ) : null}
                            {item?.post_meta?.linkedin_link ? (
                              <a href={item.post_meta.linkedin_link}>
                                <img src={linkedin} alt="linkedin_link" />
                              </a>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12 video-section ">
        <div class="container static-content">
          <div class="col-lg-12" id="welcome">
            <div class="row text-left-">
              <h4 class="pt-4">{inner_post_meta?.heading3}</h4>

              {loadManagement && loadManagement.length > 0 ? (
                loadManagement.map((item) => (
                  <div class="col-md-6 col-sm-12 d-flex">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div class="col-auto d-none d-lg-block p-3 pt-3 ">
                        <img
                          src={
                            item?.post_meta?.image
                              ? item?.post_meta?.image
                              : profile_image
                          }
                          className="profile-img"
                          alt="Profile"
                        />
                      </div>
                      <div class="col p-3 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis">
                          {item.title}
                        </strong>
                        <div class="card-text mb-auto">
                          <p class="mb-0"> {item.post_meta.details}</p>
                          <p class="mt-0 profile-link">
                            {item?.post_meta?.twitter_link ? (
                              <a href={item.post_meta.twitter_link}>
                                <img src={twitter} alt="twitter" />
                              </a>
                            ) : null}
                            {item?.post_meta?.linkedin_link ? (
                              <a href={item.post_meta.linkedin_link}>
                                <img src={linkedin} alt="linkedin_link" />
                              </a>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardPage;
