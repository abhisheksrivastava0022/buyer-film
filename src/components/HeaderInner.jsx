import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const HeaderInner = () => {
  const { slug = "", language = "en" } = useParams();
  const homePagedata = useSelector((state) => state.homePage);
  const headerMenu = useSelector((state) => state.headerMenu);
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  // console.log({ headerMenu })
  const renderMenuItems = (items) => {
    return items.map((item) => (
      <li
        key={item.id}
        className={`${item.children ? "dropdown nav-item dropdown" : "nav-item"
          }`}
      >
        {item.type == 1 ? (
          <Link
            to={`/${item.url}/${language}`}
            // href={`/${item.url}/${language}`}
            className={`${item.children ? "nav-link  dropdown-toggle" : "nav-link"
              }`}
            data-bs-toggle={item.children ? "dropdown" : undefined}
            aria-expanded="false"
          >
            {item.text}
          </Link>
        ) : (
          <a
            href={item.url}
            className={`${item.children ? "nav-link  dropdown-toggle" : "nav-link"
              }`}
            data-bs-toggle={item.children ? "dropdown" : undefined}
            aria-expanded="false"
            target={`${item.children ? "" : "_blank"}`}
          >
            {" "}
            {item.text}
          </a>
        )}
        {item.children && (
          <ul className="dropdown-menu">{renderMenuItems(item.children)}</ul>
        )}
      </li>
    ));
  };
  return (
    <>
      {/* <!-- Header Starts --> */}
      <nav
        class="navbar navbar-expand-lg navbar-default noBG-menu"
        id="navbar"
        aria-label="Eighth navbar example"
        style={{ zIndex: 99 }}
      >
        <div class="container">
          <div class="text-center logo-ndfc   ">
            <Link to={"/"}>
              <img
                src={post_meta?.header_logo_1 ? post_meta.header_logo_1 : ""}
                alt="logo"
              />
            </Link>
            <Link to={"/"}>
              <img
                src={post_meta?.header_logo_2 ? post_meta.header_logo_2 : ""}
                alt="logo"
              />
            </Link>
          </div>
          <Link to={"/"} class="navbar-brand show-logo-scroll">
            <img
              src={post_meta?.header_logo_3 ? post_meta.header_logo_3 : ""}
              alt="logo"
              className="navbar-scroll-image"
            />
          </Link>
          <Link to={"/"} class="show-logo-scroll">
            <img
              src={post_meta?.header_logo_4 ? post_meta.header_logo_4 : ""}
              alt="logo"
              className="scroll-logo"
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample07"
            aria-controls="navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
              {headerMenu ? renderMenuItems(JSON.parse(headerMenu)) : <></>}
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- Header End --> */}
    </>
  );
};

export default HeaderInner;
