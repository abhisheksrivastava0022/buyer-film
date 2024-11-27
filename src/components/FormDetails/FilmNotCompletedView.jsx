import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import defaultimg from '../../assets/img/default.jpg';
import ApiClient from '../API/ApiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Select } from '@mui/material';


const FilmNotCompletedView = ({ loadFormatTypes }) => {

    const toRoman = (num) => {
        const romanNumerals = [
            ["XL", 40],
            ["X", 10],
            ["IX", 9],
            ["V", 5],
            ["IV", 4],
            ["I", 1]
        ];

        let roman = "";
        for (let [letter, value] of romanNumerals) {
            while (num >= value) {
                roman += letter;
                num -= value;
            }
        }
        return roman;
    };

    const navigate = useNavigate();
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countries, setcountries] = useState([]);
    const [languages, setlanguage] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BASE_PREFIX;

    const [ratios, setRatios] = useState([]);
    const [sounds, setSounds] = useState([]);
    const [prints, setprints] = useState([]);

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
        data = await getRequestApi(`site/aspect-ratio`, {});
        if (data.status) {
            setRatios(data.data)
        }
        data = await getRequestApi(`site/sound-format`, {});
        if (data.status) {
            setSounds(data.data)
        }
        data = await getRequestApi(`site/film-type`, {});
        if (data.status) {
            setTypes(data.data)
        }
        data = await getRequestApi(`site/print-format`, {});
        if (data.status) {
            setprints(data.data)
        }
    }

    useEffect(() => {
        loadPreDefaultdata();
    }, [])
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
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/site/videography-type`, {
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
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/site/format-type`, {
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
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/site/stage-type`, {
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

    // const getFilmNames = (filmIds) => {
    //     if (!filmIds) return "";
    //     return filmIds.map(id => types.find(filmDetails => filmDetails.id === id)?.name || 'Unknown').join(', ');
    // };

    const getFilmNames = (filmIds) => {
        if (!filmIds) return "";

        // Check if countryIds is an array; if not, treat it as a single ID
        const idsArray = Array.isArray(filmIds) ? filmIds : [filmIds];

        return idsArray
            .map(id => types?.find(films => films.id === id)?.name || 'Unknown')
            .join(', ');
    };

    // const getPrintFormat = (printFormatIds) => {
    //     if (!printFormatIds) return "";
    //     return printFormatIds.map(id => prints.find(filmDetails => filmDetails.id === id)?.name || 'Unknown').join(', ');
    // };

    const getPrintFormat = (printFormatIds) => {
        if (!printFormatIds) return "";

        // Check if countryIds is an array; if not, treat it as a single ID
        const idsArray = Array.isArray(printFormatIds) ? printFormatIds : [printFormatIds];

        return idsArray
            .map(id => prints?.find(printFormat => printFormat.id === id)?.name || 'Unknown')
            .join(', ');
    };

    // const getAspectRatio = (AspectRatioIds) => {
    //     if (!AspectRatioIds) return "";
    //     return AspectRatioIds.map(id => ratios.find(filmDetails => filmDetails.id === id)?.name || 'Unknown').join(', ');
    // };


    const getAspectRatio = (AspectRatioIds) => {
        if (!AspectRatioIds) return "";

        // Check if countryIds is an array; if not, treat it as a single ID
        const idsArray = Array.isArray(AspectRatioIds) ? AspectRatioIds : [AspectRatioIds];

        return idsArray
            .map(id => ratios?.find(printFormat => printFormat.id === id)?.name || 'Unknown')
            .join(', ');
    };

    // const getSoundFormat = (soundFormatIds) => {
    //     if (!soundFormatIds) return "";
    //     return soundFormatIds.map(id => sounds.find(filmDetails => filmDetails.id === id)?.name || 'Unknown').join(', ');
    // };

    const getSoundFormat = (soundFormatIds) => {
        if (!soundFormatIds) return "";

        // Check if countryIds is an array; if not, treat it as a single ID
        const idsArray = Array.isArray(soundFormatIds) ? soundFormatIds : [soundFormatIds];

        return idsArray
            .map(id => sounds?.find(printFormat => printFormat.id === id)?.name || 'Unknown')
            .join(', ');
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
                                            <img src={defaultimg} alt="user" style={{ width: '200px', height: '200px' }}  />
                                        )}
                                    </div>
                                    <div className="col p-4 d-flex flex-column position-static pt-0">
                                        <h3 className="d-inline-block mb-2 text-primary-emphasis"> {film.title} </h3>
                                        <div className="mb-1 text-body-secondary">  <strong>Completion Year :</strong> {film.year_of_completion}</div>
                                        <div className="mb-1 text-body-secondary">   <strong>Duration:</strong> {film.duration} minutes</div>
                                        <p className="card-text mb-auto"> <strong>Film Complete:</strong> {film.is_film_complete ? 'Yes' : 'No'}</p>
                                        <p className="card-text mb-auto"> <strong>Countries of Production:</strong> {getCountryNames(film.country)}</p>
                                        <p className="card-text mb-auto"> <strong>Languages:</strong> {getLanguageNames(film.language)}</p>
                                    </div>


                                </div>
                                <Grid item xs={12} sm={12} md={12} lg={12}>

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

                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Film information</h6>
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
                                                <th scope="row">Countries of production :</th>
                                                <td>{getCountryNames(film.country)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Original Language :</th>
                                                <td>{getLanguageNames(film.language)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Film Type:</th>
                                                <td>{getFilmNames(film.type)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Do you have a rough cut of your film?:</th>
                                                <td>{film.has_rough_cut ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Post-production work remaining on the film:</th>
                                                <td>{film.post_production_work}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Will your film be complete by November 20, 2024? :</th>
                                                <td>{film.will_be_complete_by ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Duration of the Rough Cut:</th>
                                                <td>{film.rough_cut_duration}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Final Duration :</th>
                                                <td>{film.duration}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Month of Completion :</th>
                                                <td>{film.month_of_completion}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Year of Completion :</th>
                                                <td>{film.year_of_completion}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>
                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Other Project Details</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Synopsis of Film :</th>
                                                <td>{film.synopsis}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Director's Note :</th>
                                                <td>{film.director_comment}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Screenplay :</th>
                                                <td>{film.screenplay ? "Yes" : "No"}</td>
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
                                                    {getPrintFormat(film.print_format)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Aspect ratio :</th>
                                                <td>
                                                    {getAspectRatio(film.aspect_ratio)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sound Format :</th>
                                                <td>
                                                    {getSoundFormat(film.sound_format)}
                                                </td>
                                            </tr>
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
                                        <Table sx={{ minWidth: 650 }} aria-label="caption table" className='table table-bordered'>
                                            <TableHead className='form-space'>
                                                <TableRow>
                                                    <TableCell align='center'>Sr No.</TableCell>
                                                    <TableCell align='center'>Designation</TableCell>
                                                    <TableCell align='center'>Name</TableCell>
                                                    <TableCell align="center">E-mail</TableCell>
                                                    <TableCell align="center">Phone</TableCell>
                                                    <TableCell align="center">Company</TableCell>
                                                    <TableCell align="center">City</TableCell>
                                                    <TableCell align="center">State</TableCell>
                                                    <TableCell align="center">Country</TableCell>
                                                    <TableCell align="center">Photo</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {film.film_contact.map((contact, index) => (
                                                    <React.Fragment key={contact.id || index}>
                                                        <TableRow key={contact.name}>
                                                            <TableCell align="center">({toRoman(index + 1)})</TableCell>
                                                            <TableCell align="center">  {
                                                                designationOptions.find(option => option.id === contact.type)?.name || 'Not Defined'
                                                            }</TableCell>
                                                            <TableCell align="center">{`${contact.first_name} ${contact.last_name}`}</TableCell>
                                                            <TableCell align="center">{contact.email}</TableCell>
                                                            <TableCell align="center">{contact.phone}</TableCell>
                                                            <TableCell align="center">{contact.company}</TableCell>
                                                            <TableCell align="center">{contact.city}</TableCell>
                                                            <TableCell align="center">{contact.state}</TableCell>
                                                            <TableCell align="center">{getCountryNames(contact.country)}</TableCell>
                                                            <TableCell align="center">
                                                                {contact.image_temp && contact.image_temp.url ? (
                                                                    <img
                                                                        src={`${BASE_URL}/file/read/${contact.image_temp.url}`}
                                                                        alt={contact.image_temp.name || "Uploaded"}
                                                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={defaultimg}
                                                                        alt="Default"
                                                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                    />
                                                                )}
                                                            </TableCell>
                                                            {/* <TableCell align="center">{contact.address}</TableCell>
                            <TableCell align="center">{contact.website}</TableCell>
                            <TableCell align="center">{(contact.indian_nationality) ? 'Indian' : 'Non Indian'}</TableCell> */}

                                                        </TableRow>
                                                    </React.Fragment>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}


                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>
                                    {/* <h6>Script Completed</h6> */}
                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Crew Information </h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Lead Cast :</th>
                                                <td>{film.lead_cast}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Writer :</th>
                                                <td>{film.writer}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Director of Photography :</th>
                                                <td>{film.director_of_photography}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Editor :</th>
                                                <td>{film.editor}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Editor’s Filmography :</th>
                                                <td>{film.editor_filmography}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sound :</th>
                                                <td>{film.sound}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Music :</th>
                                                <td>{film.music}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Production Designer:</th>
                                                <td>{film.production_design}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Costume :</th>
                                                <td>{film.costume}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Additional Crew :</th>
                                                <td>{film.additional_crew}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>
                                    {/* <h6>Script Completed</h6> */}
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
                                    {/* <h6>Script Completed</h6> */}
                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Attachments</h6>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Required Documents</th>
                                                    {/* <th scope="col">Document Specifications</th> */}
                                                    <th scope="col">View</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {film?.film_document?.map((doc, index) => (
      <tr key={doc.id}>
        <td>{index + 1}</td>
        <td>
          <p>{typeMapping[doc.type] || "Unknown Document"}</p>
        </td>
      
        <td>
          <span className="inputoffield">
            <div className="Attach_Photo_ID">
              <p>
                <a
                  href={`${BASE_URL}/file/read/${doc.url}`}
                  download={doc.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <FileDownloadIcon /> {doc.name}
                  </span>
                </a>
              </p>
            </div>
          </span>
        </td>
      </tr>
    ))} */}
                                                {[
                                                    { srNo: 1, name: "Film Stills", type: 1 },
                                                    { srNo: 2, name: "Poster of the Film", type: 2 },
                                                    { srNo: 3, name: "Director Photo", type: 3 },
                                                    { srNo: 4, name: "Project Image", type: 8 },
                                                ].map((requiredDoc) => {
                                                    // Find the matching document from uploaded data
                                                    const uploadedDoc = film?.film_document?.find(
                                                        (doc) => doc.type === requiredDoc.type
                                                    );

                                                    return (
                                                        <tr key={requiredDoc.srNo}>
                                                            {/* Static Sr No */}
                                                            <td>{requiredDoc.srNo}</td>

                                                            {/* Static Required Document Name */}
                                                            <td>
                                                                <p>{requiredDoc.name}</p>
                                                            </td>

                                                            {/* Dynamic Uploaded Document or Blank */}
                                                            <td>
                                                                {uploadedDoc ? (
                                                                    <span className="inputoffield">
                                                                        <div className="Attach_Photo_ID">
                                                                            <p>
                                                                                <a
                                                                                    href={`${BASE_URL}/file/read/${uploadedDoc.url}`}
                                                                                    download={uploadedDoc.name}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    <span>
                                                                                        <FileDownloadIcon /> {uploadedDoc.name}
                                                                                    </span>
                                                                                </a>
                                                                            </p>
                                                                        </div>
                                                                    </span>
                                                                ) : (
                                                                    // Blank cell if no document is uploaded
                                                                    <p>No document uploaded</p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>

                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Preview Link</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Downloadable Preview Link :</th>
                                                <td>{film.download_preview_link}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Preview Link Password :</th>
                                                <td>{film.preview_link_password}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>





                                <Grid item xs={12} sm={12} md={12} lg={12} className='mt-4'>
                                    <div className="list-group-item active header-title-bg mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6>Notes</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Notes (if any) :</th>
                                                <td>{film.note}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>




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

export default FilmNotCompletedView;
