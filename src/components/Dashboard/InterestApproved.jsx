import React, { useEffect, useState } from 'react';
import filmbazaar from "../../assets/img/filmbazaar.png";
import defaultimg from "../../assets/img/default.jpg";
import Header from '../Header';
import Footer from '../Footer/Footer';
import ApiClient from '../API/ApiClient';
import { Link } from 'react-router-dom';

const InterestApproved = () => {
   const [data, setData] = useState([])
   const [filmtype, setFilmtype] = useState([]);
   const [language, setlanguage] = useState([]);
   const [country, setCountry] = useState([]);


   const { getRequestApi } = ApiClient();
   const [pagination, setPagination] = useState({
      totalPosts: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
   });
   const [searchForm, setSearchForm] = useState({ title: '', category: '' });

   const handleSearchform = async (e) => {
      e.preventDefault();
      loadPreLoadData();
   }

   // Function to handle input changes
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSearchForm((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };
   const preloading = async () => {

      let data1 = await getRequestApi('site/film-type', {});
      if (data1.status) {
         setFilmtype(data1.data);
      }
      data1 = await getRequestApi('site/language', {});
      if (data1.status) {
         setlanguage(data1.data);
      }
      data1 = await getRequestApi('site/country', {});
      if (data1.status) {
         setCountry(data1.data);
      }
   }
   useEffect(() => {
      preloading();
      loadPreLoadData();
   }, []);
   const loadPreLoadData = async (page = 1) => {
      const queryParams = new URLSearchParams({

         limit: pagination.limit,
         page: page,
         ...searchForm,
      });

      try {
         const data = await getRequestApi('film/approved-interested-film', queryParams);
         if (data.status) {

            setData(data.data);
            setPagination({
               ...pagination,
               ...data.pagination,
            });
         }
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };


   const handlePageChange = (page) => {
      loadPreLoadData(page);
   };

   const [loadingData, setLoadingData] = useState({})






   return (
      <>

         <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
               <div className="offcanvas-header">
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
               </div>
               <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                  <div className="col-md-12 px-3 search-sidebar">
                     <p className="logo d-none-mobile"><img src={filmbazaar} alt="logo" /></p>
                     <h3>Filter</h3>
                     <form onSubmit={handleSearchform}>
                        <div className="form-group">
                           <label>Title of film</label>
                           <div className="input-group mb-3">
                              <input
                                 type="text"
                                 className="form-control"
                                 placeholder="Search"
                                 aria-label="Search"
                                 aria-describedby="basic-addon1"
                                 name="title"
                                 value={searchForm.title}
                                 onChange={handleInputChange}
                              />
                           </div>
                        </div>

                        <div className="form-group">
                           <button type="submit" className="btn btn-primary btn-yellow">
                              Submit
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
            <div className=" main-content-space ">

               <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                     <div className="row border-bottom mb-4 mt-4">
                        <div className="col-md-12">
                           <h2 className="d-flex filter-text">
                              <i className="bi bi-funnel"></i> Sort By
                              <select className="form-select w-70" >
                                 <option selected="">Select </option>
                                 <option value="1">Original Title</option>
                                 <option value="2">English Title</option>
                                 <option value="3">Language</option>
                                 <option value="3">Log Line</option>
                                 <option value="3">Synopsys</option>
                              </select>
                           </h2>
                        </div>

                     </div>

                     {

                        data.map((row) => {
                           const type2Document = row.FilmDocuments.find(doc => doc.type === 3);
                           console.log(type2Document);
                           const dataurl = process.env.REACT_APP_BASE_URL;
                           console.log({ dataurl });
                           return <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">

                              <div className="col-auto  d-lg-block">
                                 {type2Document ?
                                    <img src={`${dataurl}/film-buyer/file/read/${type2Document.url}`} alt={type2Document.name} style={{ width: "200px", height: "200px" }} />
                                    :
                                    <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                                 }
                              </div>
                              <div className="col p-4 d-flex flex-column position-static">
                                 <strong className="d-inline-block mb-2 text-primary-emphasis">{row?.FilmType?.name}</strong>
                                 <h3 className="mb-0 title-heading" >Title of the Film: {row.title}</h3>
                                 <div className="mb-1 text-body-secondary">
                                    Upload Date: {`${String(new Date(row.createdAt).getDate()).padStart(2, '0')}.${String(new Date(row.createdAt).getMonth() + 1).padStart(2, '0')}.${new Date(row.createdAt).getFullYear()}`}

                                 </div>
                                 <p className="card-text mb-auto">
                                    Is film Complete: {row.is_film_complete ? "yes" : "No"}
                                 </p>
                                 <Link to={`/film/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link">
                                    Continue reading
                                 </Link>
                              </div>
                           </div>
                        })
                     }



                  </div>
               </div>
               <nav aria-label="...">
                  <div class="col-md-12 mt-4">
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
               </nav>
            </div>
         </main>



      </>
   )
}

export default InterestApproved