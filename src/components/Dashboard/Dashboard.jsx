import React from 'react'

const Dashboard = () => {
   return (
      <>
         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
               <h1 className="h2">Seller</h1>
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
                                 50
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
                                 50
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
                                 100
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
                                 70
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
                                 100
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
                              <th scope="col">Category</th>
                              <th scope="col">Project Status</th>
                              <th scope="col">Language</th>
                              <th scope="col">Country</th>
                              <th scope="col">Genre</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>1</td>
                              <td>random</td>
                              <td className="red"> Partial Completed</td>
                              <td>data</td>
                              <td>text</td>
                              <td>placeholder</td>
                              <td><a href=""><i className="bi bi-eye"></i></a> </td>
                           </tr>
                           <tr>
                              <td>1</td>
                              <td>random</td>
                              <td className="green">Completed</td>
                              <td>data</td>
                              <td>text</td>
                              <td>placeholder</td>
                              <td><a href=""><i className="bi bi-eye"></i></a></td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <nav aria-label="...">
                     <ul className="pagination">
                        <li className="page-item disabled">
                           <a className="page-link">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active" aria-current="page">
                           <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                           <a className="page-link" href="#">Next</a>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
         </main>
      </>
   )
}

export default Dashboard