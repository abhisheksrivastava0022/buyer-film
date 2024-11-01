import React, { useEffect, useState } from "react";
import wave_line_black from "../../../assets/images/wave-line-black.svg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

const Gallery = () => {
  const homePage = useSelector((state) => state.homePage);
  const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  const [loadData, setLoadData] = useState([]);
  const { getRequestApi } = ApiClient();
  const { language = "en" } = useParams();

  const loadPreLoadData = async () => {
    try {
      const query = {
        show_on_home: "yes",
      };
      const response = await getRequestApi(`post/type/homegallery/${language}`, {
        post_meta: query,
      });

      if (response.status) {
        const sortedData = response.data.sort(
          (a, b) => Number(a.post_meta.sort_order) - Number(b.post_meta.sort_order)
        );
        //  console.log({ dagsgsgs: response.data });
        setLoadData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadPreLoadData();
  }, [language]);

  return (
    <>
      {/* <!-- Gallery Section start --> */}

      <div className="container gallery-section-home mt-4 mb-4">
        <div className="row">
          <h3 className="text-center ">
            {" "}
            {post_meta?.sec_6_heading ? post_meta.sec_6_heading : <></>}{" "}
          </h3>
          <p className="text-center ">
            <img src={wave_line_black} alt="Wave Line" />
          </p>
          {loadData ? (
            loadData.map((item, index) => (
              <>
                <div className="col-md-4 d-flex">
                  <div className="card mb-4 p-2">
                    <p>
                      {/* <a
                        href={
                          item?.post_meta?.pdf_link
                            ? item?.post_meta.pdf_link
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      > */}
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/gallery/${item?.featured_image?.url}`}
                        alt={item.title}
                        className="img-fluid"
                      />
                      {/* </a> */}
                    </p>
                    <div className="card-text">
                      <strong className="d-inline-block mb-2 text-primary-emphasis">
                        {item.title}
                      </strong>
                      {item.content && <p><div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                      </p>}

                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <></>
          )}


          <p className="text-center">
            <Link to={`/media/${language}`} className="btn btn-lg btn-primary">
              {post_meta?.sec_6_button_text ? (
                post_meta.sec_6_button_text
              ) : (
                <></>
              )}
            </Link>
          </p>
        </div>
      </div>

      {/* <!-- Gallery Section End --> */}
    </>
  );
};

export default Gallery;
