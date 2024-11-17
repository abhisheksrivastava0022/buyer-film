import React from 'react'

const Sidebar = () => {
  return (
   <>
    <ul className="list-unstyled ps-0 sidebar-navigation">
                                <li><a href="#" > <i className="bi bi-speedometer"></i> Dashboard</a></li>
                                <li>
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                        <i className="bi bi-grid"></i> Project
                                    </button>
                                    <div className="collapse" id="dashboard-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">In Progress</a></li>
                                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Submitted</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                        Orders
                                    </button>
                                    <div className="collapse" id="orders-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
                                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Processed</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="#"><i className="bi bi-person"></i> Profile</a></li>
                                <li><a href="#"> <i className="bi bi-gear"></i>Settings</a></li>
                                <li><a href="#" > <i className="bi bi-box-arrow-left"></i> Sign out</a></li>
                            </ul>
   </>
  )
}

export default Sidebar