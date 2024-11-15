import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';


import defaultimg from '../../assets/img/default.jpg';
import ApiClient from '../API/ApiClient';
const CPMWebSeriesView = ({ loadFormatTypes }) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [countries, setcountries] = useState([]);
    const [languages, setlanguage] = useState([]);
    const [types, setTypes] = useState([]);
    const { getRequestApi } = ApiClient();
    const loadPreDefaultdata = async () => {
        let data = await getRequestApi(`site/language`, {});
        if (data.status) {
            setlanguage(data.data)
        }
        data = await getRequestApi(`site/country`, {});
        if (data.status) {
            setcountries(data.data)
        }
        data = await getRequestApi(`site/film-type`, {});
        if (data.status) {
            setTypes(data.data)
        }
    }
    useEffect(() => {
        loadPreDefaultdata();
    }, [])
    const BASE_URL = process.env.REACT_APP_BASE_URL + "/film-buyer/";
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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFilm();
    }, [id]);

    const [formDataDetails, setFormDataDetails] = useState([]);
    const [formatTypes, setFormatTypes] = useState([]);
    const [stageTypes, setStageTypes] = useState([]);


    console.log('video', formDataDetails.data)
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


    // const getCountryNames = (countryIds) => {
    //     if (!countryIds) return "";
    //     return countryIds.map(id => countries?.find(country => country.id === id)?.name || 'Unknown').join(', ');
    // };

    // const getLanguageNames = (languageIds) => {
    //     if (!languageIds) return "";
    //     return languageIds.map(id => languages.find(language => language.id === id)?.name || 'Unknown').join(', ');
    // };

    const getFilmNames = (filmIds) => {
        if (!filmIds) return "";
        return filmIds.map(id => types.find(filmDetails => filmDetails.id === id)?.name || 'Unknown').join(', ');
    };

    // const getVideography = (videoIds) => {
    //     return videoIds.map(id => formDataDetails?.data.find(video => video.id === id)?.name || 'Unknown').join(', ');
    // };
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
    const documentUrl = film?.type2Document?.url
    console.log('film', documentUrl)

    const lookingForOptions = {
        1: 'Gap Financing/Finishing Funds/P&A Funds',
        2: 'Sales and Distribution',
        3: 'Film Festival',
        // Add other mappings as needed
    };

    const genreOptions = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Horror' },
        { id: 3, name: 'Arts, Music and Culture' },
        { id: 4, name: 'Mystery' },
        { id: 5, name: 'Comedy' },
        { id: 6, name: 'Others' },
        { id: 7, name: 'Cultural Figure' },
        { id: 8, name: 'Romance' },
        { id: 9, name: 'Drama' },
        { id: 10, name: 'Thriller' },
        { id: 11, name: 'Fantasy' }
    ];

    const designationOptions = [
        { id: 1, name: 'Primary Conatct Person' },
        { id: 2, name: 'Screen Writer' },
        { id: 3, name: 'Co-Screen Writer' },
        { id: 4, name: 'Director' },
        { id: 5, name: 'Co-Director' },
        { id: 6, name: 'Producer' },
        { id: 7, name: 'Co-Producer' },
        { id: 8, name: 'Attendee' },
    ];



    const isPartOfOptions = [
        { id: 1, name: 'Film Market' },
        { id: 2, name: 'Film Festival' },
        { id: 3, name: 'Distribution' },
        // Add more options as needed
    ];

    const getCountryNames = (countryIds) => {
        if (!countryIds) return "";

        // Check if countryIds is an array; if not, treat it as a single ID
        const idsArray = Array.isArray(countryIds) ? countryIds : [countryIds];

        return idsArray
            .map(id => countries?.find(country => country.id === id)?.name || 'Unknown')
            .join(', ');
    };


    const getLanguageNames = (languageIds) => {
        if (!languageIds) return "";

        // Check if languageIds is an array; if not, treat it as a single ID
        const idsArray = Array.isArray(languageIds) ? languageIds : [languageIds];

        return idsArray
            .map(id => languages.find(language => language.id === id)?.name || 'Unknown')
            .join(', ');
    };



    return (
        <>
            <div className="mt-4">
                <h3 className="mb-2">Film Details</h3>
                <div className='card'>
                    <div className='card-body'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : film ? (
                            <>
                                <div className="row g-0  overflow-hidden flex-md-row mb-4  h-md-250  position-relative">
                                    <div className="col-auto d-lg-block">
                                        {film.film_document && film.film_document.url ? (
                                            <img src={`${BASE_URL}/file/read/${film.film_document.url}`} alt={film.film_document.name} style={{ width: '200px', height: '200px' }} />
                                        ) : (
                                            <img src={defaultimg} alt="user" style={{ width: '200px', height: '200px' }} />
                                        )}
                                    </div>
                                    <div className="col p-4 d-flex flex-column position-static pt-0">
                                        <h3 className="d-inline-block mb-2 text-primary-emphasis"> {film.title} </h3>
                                        <div className="mb-1 text-body-secondary">  <strong>Completion Year :</strong> {film.year_of_completion}</div>
                                        <div className="mb-1 text-body-secondary">   <strong>Duration :</strong> {film.duration} minutes</div>
                                        <p className="card-text mb-auto"> <strong>Film Complete :</strong> {film.is_film_complete ? 'Yes' : 'No'}</p>
                                        <p className="card-text mb-auto"> <strong>Countries of Production :</strong> {getCountryNames(film.country)}</p>
                                        <p className="card-text mb-auto"> <strong>Languages :</strong> {getLanguageNames(film.language)}</p>
                                    </div>


                                </div>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {/* <h6>Script Completed</h6> */}
                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Basic information</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">

                                        <tbody>
                                            <tr>
                                                <th scope="row">Original Title :</th>
                                                <td>  {film.english_title}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Videography :</th>
                                                <td>{getVideography(film.videography_type)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Format Type :</th>
                                                <td>{getformattype(film.format_type)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Stage Type :</th>
                                                <td>{getformatstagetype(film.stage_type)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>
                                    {/* <h6>Script Completed</h6> */}
                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Project information</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">

                                        <tbody>
                                            <tr>
                                                <th scope="row">Original Title :</th>
                                                <td>  {film.english_title}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">English Title :</th>
                                                <td>  {film.english_title}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Countries :</th>
                                                <td>{getCountryNames(film.country)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Original Language :</th>
                                                <td>{getLanguageNames(film.language)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Anticipated Duration per episode :</th>
                                                <td>{film.anticipated_duration_per_episode}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Number of Episodes :</th>
                                                <td>{film.number_of_episode}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Series based on :</th>
                                                <td>{film.series_based_on}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Shooting format :</th>
                                                <td>{film.shooting_format}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Shoot Locations/s :</th>
                                                <td>{film.shoot_location}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Target Audience :</th>
                                                <td>{film.target_audience}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Distribution and Marketing Strategy :</th>
                                                <td>{film.duration_and_market_strategy}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Logline :</th>
                                                <td>{film.series_logline}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Short Synopsis  :</th>
                                                <td>{film.short_synopsis}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Director's Statement:</th>
                                                <td>{film.director_comment}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Producer's Note :</th>
                                                <td>{film.producer_note}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Please mention if your project has been a part of :</th>
                                                <td>

                                                    {film.is_part_of && film.is_part_of.length > 0
                                                        ? film.is_part_of
                                                            .map(id => {
                                                                const partOfProject = isPartOfOptions.find(option => option.id === id);
                                                                return partOfProject ? partOfProject.name : 'Unknown';
                                                            })
                                                            .join(', ')
                                                        : 'No options selected'}


                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Please specify details :</th>
                                                <td>{film.is_part_of_details}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>
                                    {/* <h6>Script Completed</h6> */}
                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Select Genre</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Select Genres :</th>
                                                <td>
                                                    {film.genre && film.genre.length > 0
                                                        ? film.genre
                                                            .map(id => {
                                                                const genre = genreOptions.find(option => option.id === id);
                                                                return genre ? genre.name : 'Unknown';
                                                            })
                                                            .join(', ')
                                                        : 'No options selected'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Print Format :</th>
                                                <td>
                                                    {film.print_format}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Aspect ratio :</th>
                                                <td>
                                                    {film.aspect_ratio}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sound Format :</th>
                                                <td>
                                                    {film.sound_format}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>

                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>At Film Bazaar You are Looking For</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">

                                        <tbody>
                                            <tr>

                                                <td>
                                                    {film.looking_for
                                                        ? film.looking_for.map(id => lookingForOptions[id] || 'Unknown').join(', ')
                                                        : 'No options selected'}
                                                </td>                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>

                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Contacts</h6>
                                        </div>
                                    </div>
                                </Grid>
                                {!film?.film_contact || film.film_contact.length === 0 ? (
                                    <p>No contact information available.</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-striped table-list-view">
                                            <thead>
                                                <tr>
                                                    <th>Field</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {film.film_contact.map((contact, index) => (
                                                    <React.Fragment key={contact.id || index}>
                                                        <tr>
                                                            <th scope="row">Designation :</th>
                                                            <td>
                                                                {designationOptions.find(option => option.id === contact.type)?.name || 'Not Defined'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Name :</th>
                                                            <td>{`${contact.first_name} ${contact.last_name}`}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Email :</th>
                                                            <td>{contact.email || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Company :</th>
                                                            <td>{contact.company || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Phone :</th>
                                                            <td>{contact.phone || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Address :</th>
                                                            <td>{contact.address || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">City :</th>
                                                            <td>{contact.city || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">State :</th>
                                                            <td>{contact.state || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Country :</th>
                                                            <td>{getCountryNames(contact.country) || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Website :</th>
                                                            <td>{contact.website || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Facebook :</th>
                                                            <td>{contact.facebook || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Twitter :</th>
                                                            <td>{contact.twitter || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Instagram :</th>
                                                            <td>{contact.instagram || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Biography :</th>
                                                            <td>{contact.biography || 'Not Provided'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Filmography :</th>
                                                            <td>{contact.filmography || 'Not Provided'}</td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}





















                            </>
                        ) : (
                            <p>No film data available.</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default CPMWebSeriesView;
