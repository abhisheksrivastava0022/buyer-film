import React, { useEffect, useState } from 'react';

import ScriptView from './ScriptView';
import FilmView from './FilmView';
import CPMFeatureView from "./CPMFeatureView";
import CPMWebSeriesView from "./CPMWebSeriesView";
import FilmNotCompletedView from "./FilmNotCompletedView";
import logo from '../../assets/img/filmbazaar.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
const BASE_URL = process.env.REACT_APP_BASE_URL + "/film-buyer";
const MainView = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    //  alert(BASE_URL)
    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await fetch(`${BASE_URL}/film/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch film data');
                }
                const data = await response.json();
                console.log('Fetched film data:', data); // Log entire response data for inspection

                // Check if the `data` object has `data` property and log its structure
                if (data && data.data) {
                    console.log('Film data exists:', data.data);
                    console.log('type2Document in film:', data.data.film_document); // Log `type2Document` object if it exists

                    // Check if `type2Document` has the `url` property
                    if (data.data.film_document && data.data.film_document.url) {
                        console.log('type2Document URL exists:', data.data.film_document.url);
                    } else {
                        console.warn('type2Document or its URL is missing in the film data');
                    }
                } else {
                    console.warn('Film data is missing in the response');
                }
                setFilm(data.data);
            } catch (error) {
                console.error('Error fetching film data:', error);
                //   setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFilm();
    }, [id]);
    const renderTemplate = () => {
        // return (
        //     <>
        //         {/* <FilmView /> */}
        //         {/* <CPMFeatureView /> */}
        //         {/* <CPMWebSeriesView/> */}
        //         <FilmNotCompletedView/>
        //     </>
        // );
        if (film?.stage_type == 1) {

            return (
                <>
                    <ScriptView />
                </>
            );

        } else if (film?.format_type == 4) {// Webs
            if (film?.stage_type == 4) {
                return (
                    <>
                        <CPMFeatureView />
                    </>
                );
            } else {
                return (
                    <>
                        <CPMWebSeriesView />
                    </>
                );
            }
        } else {
            if (film?.stage_type == 4) {
                return (
                    <>
                        <FilmView />
                    </>
                );
            } else {
                return (
                    <>
                        <FilmNotCompletedView />
                    </>
                );
            }

        }

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

                            <ul className="address">
                                {/* <li> <i className="bi bi-geo-alt"></i>{data?.FilmMaker?.first_name} {data?.FilmMaker?.last_name}</li>
                                <li><i className="bi bi-envelope"></i> {data?.FilmMaker?.email}</li>
                                <li> <i className="bi bi-globe"></i> https://filmbazaarindia.com/</li>
                                <li> <i className="bi bi-calendar3"></i> June 02, 1988</li>
                                <li><a href=""><i className="bi bi-facebook"></i></a> <a href=""><i className="bi bi-twitter"></i></a> <a href=""><i className="bi bi-linkedin"></i></a></li> */}

                            </ul>
                            <Sidebar/>

                        </div>
                    </div>
                </div>
            </div>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div className=" main-content-space ">

                    <div className="tab-content" >
                        <div className="tab-content1" >
                            <div className='mx-auto mt-4'>
                                <div className="list-group">
                                    {renderTemplate()}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </>
    )
}

export default MainView 