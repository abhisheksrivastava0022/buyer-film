import React, { useEffect, useState } from 'react';
import filmbazaar from "../../assets/img/filmbazaar.png";
import defaultimg from "../../assets/img/default.jpg";
import Header from '../Header';
import Footer from '../Footer/Footer';
import ApiClient from '../API/ApiClient';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Sidebar from '../Sidebar/Sidebar';

const Interest = () => {
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

    const [formDataDetails, setFormDataDetails] = useState([]);
    const [formatTypes, setFormatTypes] = useState([]);
    const [stageTypes, setStageTypes] = useState([]);



    useEffect(() => {
        const fetchVideographyTypes = async () => {
            try {
                const response = await fetch("https://119.82.68.149:3001/film-buyer/site/videography-type", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    setFormDataDetails(result.data);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Error fetching videography types:", error);
            }
        };
        fetchVideographyTypes();
    }, []);

    useEffect(() => {

        const loadFormatTypes = async () => {
            try {
                const response = await fetch("https://119.82.68.149:3001/film-buyer/site/format-type", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    setFormatTypes(result.data);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Error fetching format types:", error);
            }
        };
        loadFormatTypes();
    }, []);

    useEffect(() => {

        const loadStageTypes = async () => {
            try {
                const response = await fetch("https://119.82.68.149:3001/film-buyer/site/stage-type", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    setStageTypes(result.data);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Error fetching stage types:", error);
            }
        };
        loadStageTypes();
    }, []);


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
                PageOnLoad()
                console.log('Response Data:', data);

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
                PageOnLoad()
                console.log('Response Data:', data);

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



    const getVideography = (videoIds) => {
        if (!videoIds) return "";

        const Videography = formDataDetails?.find((c) => c.id === videoIds);
        return Videography ? Videography.name : "";
    };
    const getformattype = (formatIds) => {
        if (!formatIds) return "";

        const getformattypedetails = formatTypes?.find((c) => c.id === formatIds);
        return getformattypedetails ? getformattypedetails.name : "";
    };
    const getformatstagetype = (stageIds) => {
        if (!stageIds) return "";

        const stagetype = stageTypes?.find((c) => c.id === stageIds);
        return stagetype ? stagetype.name : "";
    };



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
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                <div className=" main-content-space ">

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">



                            <div className="accordion accordion-flush" id="accordionFlushExample1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button " style={{ background: "#10631d" }} type="button" data-bs-toggle="collapse" aria-expanded="true" data-bs-target="#flush-collapseOne" aria-controls="flush-collapseOne">
                                            Connection Build
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample1">
                                        <div class="accordion-body">

                                            <div className="tab-content1  " >
                                                <div>
                                                    <div className='col-sm-12 col-md-12 col-lg-12 mx-auto' >
                                                        <div className="list-group">

                                                            <div className="list-group-item form-space " >


                                                                <div className="row border-0 mt-4 mb-4">
                                                                    <div className='row mt-4'>
                                                                        {

                                                                            data.map((row) => {
                                                                                const type2Document = row.FilmDocuments.find(doc => doc.type === 3);
                                                                                console.log(type2Document, "data");
                                                                                const dataurl = process.env.REACT_APP_BASE_URL;
                                                                                console.log({ dataurl });
                                                                                return <div className='col-md-6 col-sm-6'>
                                                                                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                                                                        <div className="col-auto  d-lg-block">
                                                                                            {type2Document ?
                                                                                                <img src={`${dataurl}/film-buyer/file/read/${type2Document.url}`} alt={type2Document.name} style={{ width: "200px", height: "200px" }} />
                                                                                                :
                                                                                                <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                                                                                            }
                                                                                        </div>
                                                                                        <div className="col p-4 d-flex flex-column position-static">
                                                                                            <h3 className="mb-0 title-heading" > {row.title}</h3>
                                                                                            {getVideography(row.videography_type)} | {getformattype(row.format_type)}  | {getformatstagetype(row.stage_type)}
                                                                                            <br />
                                                                                            <br />
                                                                                            <br />
                                                                                            <div className='btn-link-card'>
                                                                                                <button className='btn btn-primary  w-auto'>
                                                                                                    <Link to={`/seller-projects/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link" style={{ color: "#fff" }}>
                                                                                                        View Details
                                                                                                    </Link>
                                                                                                </button>



                                                                                            </div>

                                                                                        </div>


                                                                                    </div>
                                                                                </div>
                                                                            })
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="accordion accordion-flush mt-4" id="accordionFlushExample2">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" style={{ background: "red" }} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Decline
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample2">
                                        <div class="accordion-body">

                                            <div className="tab-content1  " >
                                                <div>
                                                    <div className='col-sm-12 col-md-12 col-lg-12 mx-auto' >
                                                        <div className="list-group">

                                                            <div className="list-group-item form-space " >


                                                                <div className="row border-0 mt-4 mb-4">
                                                                    <div className='row mt-4'>
                                                                        {

                                                                            data.map((row) => {
                                                                                const type2Document = row.FilmDocuments.find(doc => doc.type === 3);
                                                                                console.log(type2Document, "data");
                                                                                const dataurl = process.env.REACT_APP_BASE_URL;
                                                                                console.log({ dataurl });
                                                                                return <div className='col-md-6 col-sm-6'>
                                                                                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                                                                        <div className="col-auto  d-lg-block">
                                                                                            {type2Document ?
                                                                                                <img src={`${dataurl}/film-buyer/file/read/${type2Document.url}`} alt={type2Document.name} style={{ width: "200px", height: "200px" }} />
                                                                                                :
                                                                                                <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                                                                                            }
                                                                                        </div>
                                                                                        <div className="col p-4 d-flex flex-column position-static">
                                                                                            <h3 className="mb-0 title-heading" > {row.title}</h3>
                                                                                            {getVideography(row.videography_type)} | {getformattype(row.format_type)}  | {getformatstagetype(row.stage_type)}
                                                                                            <br />
                                                                                            <br />
                                                                                            <br />

                                                                                        </div>


                                                                                    </div>
                                                                                </div>
                                                                            })
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="accordion accordion-flush mt-4" id="accordionFlushExample3">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Pending
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample3">
                                        <div class="accordion-body">

                                            <div className="tab-content1  " >
                                                <div>
                                                    <div className='col-sm-12 col-md-12 col-lg-12 mx-auto' >
                                                        <div className="list-group">

                                                            <div className="list-group-item form-space " >


                                                                <div className="row border-0 mt-4 mb-4">
                                                                    <div className='row mt-4'>
                                                                        {

                                                                            data.map((row) => {
                                                                                const type2Document = row.FilmDocuments.find(doc => doc.type === 3);
                                                                                console.log(type2Document, "data");
                                                                                const dataurl = process.env.REACT_APP_BASE_URL;
                                                                                console.log({ dataurl });
                                                                                return <div className='col-md-6 col-sm-6'>
                                                                                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                                                                        <div className="col-auto  d-lg-block">
                                                                                            {type2Document ?
                                                                                                <img src={`${dataurl}/film-buyer/file/read/${type2Document.url}`} alt={type2Document.name} style={{ width: "200px", height: "200px" }} />
                                                                                                :
                                                                                                <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                                                                                            }
                                                                                        </div>
                                                                                        <div className="col p-4 d-flex flex-column position-static">
                                                                                            <h3 className="mb-0 title-heading" > {row.title}</h3>
                                                                                            {getVideography(row.videography_type)} | {getformattype(row.format_type)}  | {getformatstagetype(row.stage_type)}
                                                                                            <br />
                                                                                            <br />
                                                                                            <br />
                                                                                            <div className='btn-link-card'>



                                                                                                {loadingData?.film_interest?.[row.id] ?
                                                                                                    <>
                                                                                                        <button className='btn btn-danger make-above-link w-auto' onClick={() => NotInterestedApply(row.id)} style={{
                                                                                                            cursor: 'pointer',

                                                                                                        }}>Not Interested</button>

                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        <button className='btn btn-yellow make-above-link  w-auto' onClick={() => InterestedApply(row.id)} style={{
                                                                                                            cursor: 'pointer',

                                                                                                        }}>Show interest</button>
                                                                                                    </>

                                                                                                }
                                                                                            </div>

                                                                                        </div>


                                                                                    </div>
                                                                                </div>
                                                                            })
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* {

                                data.map((row) => {
                                    const type2Document = row.FilmDocuments.find(doc => doc.type === 3);
                                    console.log(type2Document, "data");
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

                                        <div className='star'>

                                            <button className='btn btn-primary'>
                                                <Link to={`/seller-projects/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link" style={{ color: "#fff" }}>
                                                    View Details
                                                </Link>
                                            </button> &nbsp;


                                            <button className='btn btn-yellow make-above-link' style={{
                                                cursor: 'default',

                                            }}>Pending</button>   &nbsp;
                                            <button className='btn btn-danger make-above-link' style={{
                                                cursor: 'default',

                                            }}>Pending</button>   &nbsp;
                                            <button className='btn btn-success make-above-link' style={{
                                                cursor: 'default',

                                            }}>Connection Build</button> &nbsp;
                                        </div>
                                    </div>

                                })
                            } */}





                        </div>
                    </div>
                    {/* <nav aria-label="...">
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
                    </nav> */}
                </div>
            </main>



        </>
    )
}

export default Interest