import React, { useEffect, useState } from 'react';
import defaultimg from "../../assets/img/default.jpg";
import filmbazaar from "../../assets/img/filmbazaar.png";
import ApiClient from '../API/ApiClient';
import { useParams } from 'react-router-dom';

const ViewFilmDetails = () => {
  const { getRequestApi } = ApiClient();
  const [data, setData] = useState([])
  const [type2Document, setType2Document] = useState(null)
  const [type3Document, setType3Document] = useState(null)
  const [bannerStyle, setBannerStyle] = useState(null)

  const [dataurl, setdataurl] = useState(process.env.REACT_APP_BASE_URL)
  const { id } = useParams();
  const preloading = async () => {
    const data1 = await getRequestApi(`film/${id}`, {});
    if (data1.status) {

      const type2 = data1.data.FilmDocuments.find(doc => doc.type === 2);
      const type3 = data1.data.FilmDocuments.find(doc => doc.type === 3);

      if (type2) {
        console.log({
          backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/film-buyer/file/read/${type2})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        });
        setBannerStyle({
          backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/film-buyer/file/read/${type2.url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        });
      }
      setType2Document(type2);
      setType2Document(type3);
      setData(data1.data);
    }
  }
  useEffect(() => {
    preloading()
  }, [])

  return (
    <>
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <div className="col-md-12 px-3 search-sidebar">

              <ul className="address">
                <li> <i className="bi bi-geo-alt"></i>{data?.FilmMaker?.first_name} {data?.FilmMaker?.last_name}</li>
                <li><i className="bi bi-envelope"></i> {data?.FilmMaker?.email}</li>
                <li> <i className="bi bi-globe"></i> https://filmbazaarindia.com/</li>
                <li> <i className="bi bi-calendar3"></i> June 02, 1988</li>
                <li><a href=""><i className="bi bi-facebook"></i></a> <a href=""><i className="bi bi-twitter"></i></a> <a href=""><i className="bi bi-linkedin"></i></a></li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

        <div className=" main-content-space ">

          <div className="tab-content" >

            {/* <div class=" page-header mb-3 mt-4">
                  <div class=" text-center text-wihte ">
                  <img src="img/carousel-1.jpg" class="img-fluid"/>
                  
                     
                  </div>
          </div> */}
            <div className=" page-header py-5 mb-3 mt-4" style={bannerStyle}>
              <div className="container text-center text-wihte py-5">

              </div>
            </div>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">

              <div className="col-auto  d-lg-block">
                {type2Document ?
                  <img src={`${dataurl}/film-buyer/file/read/${type2Document.url}`} alt={type2Document.name} style={{ width: "200px", height: "200px" }} />
                  :
                  <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                }
              </div>
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">{data?.FilmType?.name}</strong>
                <h3 className="mb-0 title-heading" >Title of the Film: {data.title}</h3>
                <div className="mb-1 text-body-secondary">
                  Upload Date: {`${String(new Date(data.createdAt).getDate()).padStart(2, '0')}.${String(new Date(data.createdAt).getMonth() + 1).padStart(2, '0')}.${new Date(data.createdAt).getFullYear()}`}

                </div>
                <p className="card-text mb-auto">
                  Is film Complete: {data.is_film_complete ? "yes" : "No"}
                </p>

              </div>
            </div>
          </div>

        </div>
      </main>




    </>
  )
}

export default ViewFilmDetails