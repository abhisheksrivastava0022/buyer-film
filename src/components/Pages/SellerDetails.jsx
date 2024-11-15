import React, { useEffect, useState } from 'react';
import defaultimg from "../../assets/img/default.jpg";
import filmbazaar from "../../assets/img/filmbazaar.png";
import ApiClient from '../API/ApiClient';
import { Link, useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const SellerDetails = () => {
    const { getRequestApi } = ApiClient();
    const [data, setData] = useState([])
    const [type2Document, setType2Document] = useState(null)
    const [type3Document, setType3Document] = useState(null)
    const [bannerStyle, setBannerStyle] = useState(null)

    const [dataurl, setdataurl] = useState(process.env.REACT_APP_BASE_URL)
    const { id } = useParams();
    const preloading = async () => {
        const data1 = await getRequestApi(`film/seller-projects/${id}`, {});
        if (data1.status) {
            setData(data1.data);
        }
    }
    useEffect(() => {
        preloading()
    }, [])

    const [loadingData, setLoadingData] = useState({})



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
            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <div className="col-md-12 px-3 search-sidebar">

                            <ul className="address">
                                <li> <i className="bi bi-geo-alt"></i>{data?.first_name} {data?.last_name}</li>
                                <li><i className="bi bi-envelope"></i>{data?.email}</li>

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
                        <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 card position-relative">

                            <div className="col-auto  d-lg-block">

                                <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />

                            </div>
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0 title-heading" >Name: {data?.first_name} {data?.last_name}</h3>
                                <p className="mb-0 title" >Email: {data?.email} </p>
                                <p className="mb-0 title" >  Project Count: {data?.Films?.length ?? '0'}
                                </p>


                            </div>

                        </div>
                        <h3 className=' mt-4 '>Project List</h3>
                        <div className='row mt-4 '>
                            {data?.Films?.length > 0 ? (
                                data.Films.map((film) => (
                                    <div className='col-sm-6 col-md-6 '>
                                        <div class="row card g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                            <div class="col-auto d-none d-lg-block p-3 pt-3 "><img src="https://iffigoa.org/nfdcapi/api/gallery/1727440010952_9064342.png" class="profile-img" alt="Profile" /></div>
                                            <div class="col p-3 d-flex flex-column position-static">
                                                <p class="mb-0 profile-link text-end">
                                                    <Link to={`/seller-projects/${film.id}`} className="btn btn-primary  stretched-link" style={{ color: "#fff" }}>
                                                        View
                                                    </Link>
                                                </p>
                                                <strong class="d-inline-block mb-2 text-success-emphasis">{film.title}</strong>
                                                <div class="card-text mb-auto">
                                                    <p class="mb-0"> <b className='bold-500'>Title in English</b> :{film.english_title}</p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))) : <></>
                            }

                        </div>

                    </div>

                </div>
            </main >




        </>
    )
}

export default SellerDetails

