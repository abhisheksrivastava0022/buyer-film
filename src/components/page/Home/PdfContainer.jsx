import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiClient from "../../API/ApiClient";

const PdfContainer = () => {
  const { language = "en" } = useParams();
  const { getRequestApi } = ApiClient();
  const [loadData, setLoadData] = useState([]);
  // const homePage = useSelector((state) => state.homePage);
  // const post_meta = homePage?.post_meta ? homePage.post_meta : {};
  // console.log(post_meta, "post meta")
  const loadPreLoadData = async () => {
    const response = await getRequestApi(`post/type/available_pdf/${language}`);
    if (response.status) {
      console.log({ dagsgsgs: response.data });
      setLoadData(response.data);
    }
  };
  useEffect(() => {
    loadPreLoadData();
  }, [language]);
  return (
    <>
      {/* <!-- PDF File Section Start --> */}

      <div className="col-lg-12 video-section ">
        <div className="container static-content">
          <div className="row mb-2">
            {loadData ? (
              loadData.map((item, index) => (
                <>
                  <div className="col-md-4 col-sm-4 d-flex">
                    <div className="card text-center">
                      <div className="card-body">
                        <p>
                          <a
                            href={
                              item?.post_meta?.pdf_link
                                ? item?.post_meta.pdf_link
                                : ""
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/api/gallery/${item?.featured_image?.url}`}
                              alt=""
                              className="img-fluid"
                            />
                          </a>
                        </p>
                      </div>
                      <div className="card-footer">
                        <h4 className="pt-2 mb-0 blue-font font-18">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* <!-- PDF File Section End --> */}
    </>
  );
};

export default PdfContainer;
