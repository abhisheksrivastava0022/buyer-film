import React from "react";
import wave_line_white from "../../../assets/images/wave-line-white.svg";
import { useSelector } from "react-redux";
import HeaderInner from "../../HeaderInner";
import { Link } from "react-router-dom";

const DefaultPage = () => {
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

      <div className="col-lg-12 about-company" id="welcome">
        <div className="container">
          <div class=" text-center text-white ">
            <div class="col-sm-8 mx-auto">
              {innerpagedata?.short_description ? (
                <p class="pt-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: innerpagedata.short_description,
                    }}
                  />
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 video-section" id="welcome">
        <div className="container static-content">
          <div class="row ">
            {innerpagedata?.content ? (
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: innerpagedata.content }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
