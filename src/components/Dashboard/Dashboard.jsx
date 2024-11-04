import React, { useEffect, useState } from 'react'
import ApiClient from '../API/ApiClient'
import { Link } from 'react-router-dom';
import { CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
const Dashboard = () => {
   const [data, setData] = useState([])
   const [loadData, setLoadData] = useState([]);
   const [typeCount, setTypeCount] = useState([])


   const { getRequestApi } = ApiClient();
   const [pagination, setPagination] = useState({
      totalPosts: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
   });

   const preloading = async () => {

      const data1 = await getRequestApi('film/type-count', {});
      if (data1.status) {
         setTypeCount(data1.data);
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
      });

      try {
         const data = await getRequestApi('film', queryParams);
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

   const InterestedApply = async (id) => {
      try {
         const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/${id}/interested`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: "include"
         });


         if (response.ok) {
            const data = await response.json();
            console.log('Response Data:', data);
            PageOnLoad()
         } else {
            console.error('Failed to  interest.');
         }
      } catch (error) {
         console.error('Error occurred:', error);
      }
   };

   const NotInterestedApply = async (id) => {
      try {
         const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/${id}/not-interested`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: "include"
         });


         if (response.ok) {
            const data = await response.json();
            console.log('Response Data:', data);
            PageOnLoad()
         } else {
            console.error('Failed to  interest.');
         }
      } catch (error) {
         console.error('Error occurred:', error);
      }
   };



   const PageOnLoad = async () => {
      try {
         const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/buyer`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: "include"
         });


         if (response.ok) {
            const data = await response.json();
            setLoadingData(data.data)
            console.log('Response Data:', data);

         } else {
            console.error('Failed to load data.');
         }
      } catch (error) {
         console.error('Error occurred:', error);
      }
   };

   useEffect(() => {
      PageOnLoad()
   }, [])


   return (
      <>
         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
               <h1 className="h2">Buyer</h1>
            </div>

            <div className="row mt-4 mb-4 topbox">
               <div className="d-flex col-xxl-3 col-sm-6">
                  <div className="flex-fill card">
                     <div className=" py-4 card-body">
                        <div className="d-flex align-items-start">
                           <div className="flex-grow-1">
                              <h4 className="mb-2">Film</h4>
                              <p className="mb-2 total">Total No. of </p>

                           </div>
                           <div className="d-inline-block ms-3">
                              <div className="stat">
                                 {typeCount?.[1] ? typeCount?.[1] : 0}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="d-flex col-xxl-3 col-sm-6">
                  <div className="flex-fill card">
                     <div className=" py-4 card-body">
                        <div className="d-flex align-items-start">
                           <div className="flex-grow-1">
                              <h4 className="mb-2">Web Series</h4>
                              <p className="mb-2 total">Total No. of </p>

                           </div>
                           <div className="d-inline-block ms-3">
                              <div className="stat">
                                 {typeCount?.[2] ? typeCount[2] : 0}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="d-flex col-xxl-3 col-sm-6">
                  <div className="flex-fill card">
                     <div className=" py-4 card-body">
                        <div className="d-flex align-items-start">
                           <div className="flex-grow-1">
                              <h4 className="mb-2">Script</h4>
                              <p className="mb-2 total">Total No. of </p>
                           </div>
                           <div className="d-inline-block ms-3">
                              <div className="stat">
                                 {typeCount?.[3] ? typeCount[3] : 0}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="d-flex col-xxl-3 col-sm-6">
                  <div className="flex-fill card">
                     <div className=" py-4 card-body">
                        <div className="d-flex align-items-start">
                           <div className="flex-grow-1">
                              <h4 className="mb-2">Trailer</h4>
                              <p className="mb-2 total">Total No. of </p>

                           </div>
                           <div className="d-inline-block ms-3">
                              <div className="stat">
                                 {typeCount?.[4] ? typeCount[4] : 0}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="d-flex col-xxl-3 col-sm-6">
                  <div className="flex-fill card">
                     <div className=" py-4 card-body">
                        <div className="d-flex align-items-start">
                           <div className="flex-grow-1">
                              <h4 className="mb-2">Project Idea</h4>
                              <p className="mb-2 total">Total No. of </p>
                           </div>
                           <div className="d-inline-block ms-3">
                              <div className="stat">
                                 {typeCount?.[5] ? typeCount[5] : 0}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="card mt-4 mb-4">
               <div className="card-body">
                  <div className="row border-bottom mb-4">
                     <div className="col-md-8">
                        <h2><i className="bi bi-funnel"></i> Filter/Categories </h2>
                     </div>
                     <div className="col-md-4">
                        <select className="form-select" aria-label="Default select example">
                           <option selected>Select </option>
                           <option value="1">Original Title</option>
                           <option value="2">English Title</option>
                           <option value="3">Language</option>
                           <option value="3">Log Line</option>
                           <option value="3">Synopsys</option>
                        </select>
                     </div>
                  </div>
                  <div className="table-responsive">
                     <table className="table table-striped table-sm">
                        <thead>
                           <tr>
                              <th scope="col">#</th>
                              <th scope="col">title</th>
                              <th scope="col">Project Status</th>
                              <th scope="col">Language</th>
                              <th scope="col">Country</th>
                              <th scope="col">Genre</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {

                              data.map((row) => (
                                 <tr>
                                    <td>{row.id}</td>
                                    <td>{row.title}</td>
                                    <td className="red">{row.is_film_complete ? "Completed" : 'Partially'}</td>
                                    <td>{row?.Language?.name}</td>
                                    <td>{row?.Country?.name}</td>
                                    <td>{row.genre}</td>
                                    <td>


                                       {loadingData?.film_interest?.[row.id] ?
                                          <FavoriteIcon
                                             style={{
                                                cursor: 'pointer',
                                                color: "red"
                                             }}
                                             onClick={() => NotInterestedApply(row.id)} />
                                          :
                                          <FavoriteIcon
                                             style={{
                                                cursor: 'pointer',
                                                color: "D3D3D3"
                                             }}
                                             onClick={() => InterestedApply(row.id)} />
                                       }&nbsp;
                                       {/* <Link to={`film/${row.id}`}><i className="bi bi-eye"></i></Link> */}
                                       <Link
                                       
                                       // to={`film/${row.id}`}
                                       to={`/view-film/${row.id}`}
                                       
                                       ><i className="bi bi-eye"></i></Link>



                                    </td>
                                 </tr>
                              ))
                           }


                        </tbody>
                     </table>
                  </div>

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


               </div>
            </div>
         </main>
      </>
   )
}

export default Dashboard