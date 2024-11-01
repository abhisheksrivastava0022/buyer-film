import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

const HeaderTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const location = useLocation();
  const { slug, language = "en", param } = useParams();
  const [langENUrl, setLangENUrl] = useState("/");
  const [langHIUrl, setLangHIUrl] = useState("/home/hi");
  useEffect(() => {
    //
    if (location.pathname == "/") {
    } else if (location.pathname == "/home/hi") {
    } else {
      const pathname = location.pathname;
      if (language == "en") {
        let result = pathname.replace("/en", "");
        setLangHIUrl(`${result}/hi`);
        scrollToTop();
      } else {
        let result = pathname.replace("/hi", "");
        setLangENUrl(result);
        scrollToTop();
      }
    }
    // console.log({ location })
  }, [slug, language]);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false); // State to manage toggle

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // alert("abc")
      // Redirect to the search page with the query as a parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded); // Toggle expanded state
  };
  return (
    <>
      <div className="col-lg-12 hero-banner-inner dont_change_layout">
        <div className="text-resize blackBG">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-4">
                <div className="soclial-link-top">
                  <a
                    href={
                      post_meta?.facebook_link ? post_meta.facebook_link : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href={post_meta?.twitter_link ? post_meta.twitter_link : ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a
                    href={
                      post_meta?.linkedin_link ? post_meta.linkedin_link : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a
                    href={post_meta?.youtube_link ? post_meta.youtube_link : ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-youtube"></i>
                  </a>
                  <a href="#" rel="noopener noreferrer">
                    <i className="bi bi-pinterest"></i>
                  </a>
                  <div className="search-container d-flex">
                    <button
                      className="btn btn-primary search-btn"
                      id="searchButton"
                      onClick={handleToggleExpand}
                    >
                      <i className="bi bi-search"></i>
                    </button>
                    {/* <input type="text" className="form-control search-input" id="searchInput" placeholder="Search..." /> */}
                    <input
                      type="text"
                      className={`form-control search-input ${
                        expanded ? "expanded" : ""
                      }`}
                      id="searchInput"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-8">
                <div className="resize-content">
                  <span>
                    <a href="#welcome" className="skip">
                      <i className="bi bi-arrow-return-left btn-circle"></i>
                    </a>
                  </span>
                  <button className="btn-circle" id="increaseTextSize">
                    A<sup>+</sup>
                  </button>
                  <button
                    className="btn-circle"
                    id="resetTextSize"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Tooltip on top"
                  >
                    A
                  </button>
                  <button className="btn-circle" id="decreaseTextSize">
                    A <sup>-</sup>
                  </button>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle secelct-lang "
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {post_meta?.language ? post_meta.language : ""}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to={language == "en" ? "#" : langENUrl}
                        >
                          {post_meta?.english_language
                            ? post_meta.english_language
                            : ""}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={language == "hi" ? "#" : langHIUrl}
                        >
                          {post_meta?.hindi_language
                            ? post_meta.hindi_language
                            : ""}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-resize blackBG" style={{ fontSize: '11px' }}>
                        <div className="container" style={{ fontSize: '12px' }}>
                            <div className="row" style={{ fontSize: '13px' }}>
                                <div className="col-md-6 col-sm-4" style={{ fontSize: '14px' }}>
                                    <div className="soclial-link-top" style={{ fontSize: '15px' }}>
                                        <a href={post_meta?.facebook_link ? post_meta.facebook_link : ''} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16" style={{ fontSize: '13px' }}>
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" style={{ fontSize: '14px' }} />
                                            </svg>
                                        </a>
                                        <a href={post_meta?.twitter_link ? post_meta.twitter_link : ''} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16" style={{ fontSize: '13px' }}>
                                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" style={{ fontSize: '14px' }} />
                                            </svg>
                                        </a>
                                        <a href={post_meta?.linkedin_link ? post_meta.linkedin_link : ''} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16" style={{ fontSize: '13px' }}>
                                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" style={{ fontSize: '14px' }} />
                                            </svg>
                                        </a>
                                        <a href={post_meta?.youtube_link ? post_meta.youtube_link : ''} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16" style={{ fontSize: '13px' }}>
                                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" style={{ fontSize: '14px' }} />
                                            </svg>
                                        </a>
                                        <div className="search-container d-flex" style={{ fontSize: '16px' }}>
                                            <button onClick={handleToggleExpand} className="btn btn-primary search-btn" id="searchButton">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                className={`form-control search-input ${expanded ? 'expanded' : ''}`}
                                                id="searchInput"
                                                placeholder="Search..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-8 ">
                                    <div className="resize-content ">
                                        <span><Link to={"#welcome"} className="skip">
                                            {post_meta?.skip_content ? post_meta.skip_content : ''}
                                        </Link></span>
                                        <button id="increaseTextSize">A<sup>+</sup></button>
                                        <button id="resetTextSize">A</button>
                                        <button id="decreaseTextSize">A <sup>-</sup></button>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle secelct-lang " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {post_meta?.language ? post_meta.language : ''}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to={(language == 'en') ? '#' : langENUrl}>{post_meta?.english_language ? post_meta.english_language : ''}</Link></li>
                                                <li><Link className="dropdown-item" to={(language == 'hi') ? '#' : langHIUrl} >{post_meta?.hindi_language ? post_meta.hindi_language : ''}</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
      </div>
    </>
  );
};

export default HeaderTop;
