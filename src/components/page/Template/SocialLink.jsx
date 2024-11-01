import waveLineWhite from "../../../assets/images/wave-line-white.svg";
import HeaderInner from "../../HeaderInner";
import {
  Link,
  useLocation,
  useSearchParams,
  useParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApiClient from "../../API/ApiClient";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SocialLink = () => {
  const [searchQueryobj] = useSearchParams(); // Use searchParams to track URL query parameters
  const searchQuery = searchQueryobj.get("q"); // Extract the query parameter `q`
  const innerPageData = useSelector((state) => state.innerPage);
  const homePage = useSelector((state) => state.homePage);
  const postMeta = homePage?.post_meta ? homePage.post_meta : {};
  let bannerStyle = null;

  if (innerPageData?.featured_image?.url) {
    bannerStyle = {
      backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/api/gallery/${innerPageData.featured_image.url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    };
  }

  const { language = "en", q = null } = useParams();
  const { getRequestApi } = ApiClient();
  const [loadData, setLoadData] = useState([]);
  const [pagination, setPagination] = useState({
    totalPosts: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });

  const loadPreLoadData = async (page = 1, searchQuery) => {
    const response = await getRequestApi(`post/type/project/${language}`);
    if (response.status) {
      setLoadData(response.data);
      setPagination(response.pagination);
    }
  };

  useEffect(() => {
    loadPreLoadData(1, searchQuery);
  }, [language, searchQuery]);

  return (
    <>
      <div className="hero-banner-background" style={bannerStyle}>
        <HeaderInner />
        <div className="container text-center">
          {/* <h1 className="page-title">Social Link</h1> */}
          <h1 className="page-title">
            {innerPageData?.title ? innerPageData?.title : <></>}
          </h1>
          <p>
            <img src={waveLineWhite} alt="Wave Line" />
          </p>
        </div>
      </div>

      <div className="col-lg-12 video-section media" id="welcome">
        <div className="container static-content">
          {loadData.length > 0 ? (
            loadData.map((item) => (
              <div className="row" key={item.id}>
                {/* <div className="col-md-4"> */}
                <h2>{item.title}</h2>
                {/* </div> */}
                <div className="col-md-4">
                  <div className="card">
                    <div
                      className="fb-page fb_iframe_widget"
                      data-href={item.post_meta.facebook_link}
                      data-tabs="timeline"
                      // data-width="350"
                      // data-height="400"
                      data-small-header="false"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="true"
                    >
                      <iframe
                        title="Facebook Page"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        allowTransparency="true"
                        allowFullScreen="true"
                        scrolling="no"
                        allow="encrypted-media"
                        src={`https://www.facebook.com/v15.0/plugins/page.php?href=${item.post_meta.facebook_link}&tabs=timeline&width=350&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                        // style={{ border: "none", overflow: "hidden" }}
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card p-2">
                    <iframe
                      title="Twitter Timeline"
                      src={item.post_meta.twitter_link}
                      frameBorder="0"
                      allowTransparency="true"
                      allowFullScreen="true"
                      style={{ width: "100%", height: "400px" }}
                    ></iframe>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card p-2">
                    <iframe
                      title="Instagram"
                      src={item.post_meta.insta_link}
                      allowTransparency="true"
                      allowFullScreen="true"
                      frameBorder="0"
                      style={{
                        width: "100%",
                        height: "400px",
                        // backgroundColor: "white",
                        // borderRadius: "3px",
                        // border: "1px solid #dbdbdb",
                      }}
                    ></iframe>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SocialLink;
