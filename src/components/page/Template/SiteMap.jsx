import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import HeaderInner from "../../HeaderInner";
import wave_line_white from "../../../assets/images/wave-line-white.svg";
const SiteMap = () => {
  const { slug = "", language = "en" } = useParams();
  const innerpagedata = useSelector((state) => state.innerPage);
  const headerMenu = useSelector((state) => state.headerMenu);
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const footer = useSelector((state) => state.footerMenu);
  let bannerStyle = null;
  if (innerpagedata?.featured_image?.url) {
    bannerStyle = {
      backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/api/gallery/${innerpagedata.featured_image.url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    };
  }
  // console.log({ headerMenu })
  const renderMenuItems = (items) => {
    return items.map((item) => (
      <li
        key={item.id}
        className={`${
          item.children ? "dropdown nav-item dropdown" : "nav-item"
        }`}
      >
        {item.type == 1 ? (
          <Link
            to={`/${item.url}/${language}`}
            // href={`/${item.url}/${language}`}
            className={`${
              item.children ? "nav-link  dropdown-toggle" : "nav-link"
            }`}
            data-bs-toggle={item.children ? "" : undefined}
            aria-expanded="false"
          >
            {item.text}
          </Link>
        ) : (
          <a
            href={item.url}
            className={`${
              item.children ? "nav-link  dropdown-toggle" : "nav-link"
            }`}
            data-bs-toggle={item.children ? "" : undefined}
            aria-expanded="false"
            target={`${item.children ? "" : "_blank"}`}
          >
            {" "}
            {item.text}
          </a>
        )}
        {item.children && (
          <ul
            className="dropdown-menu"
            style={{ display: "block", padding: "25px", width: "100%" }}
          >
            {renderMenuItems(item.children)}
          </ul>
        )}
      </li>
    ));
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
          <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
            {headerMenu ? renderMenuItems(JSON.parse(headerMenu)) : <></>}
          </ul>

          <h5>{post_meta?.quick_links ? post_meta.quick_links : ""}</h5>
          <ul className="list-unstyled text-small">
            {footer ? (
              footer.map((data) => (
                <li key={data.url}>
                  <Link to={`/${data.url}/${language}`}>{data.text}</Link>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SiteMap;
