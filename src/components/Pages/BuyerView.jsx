import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import defaultimg from '../../assets/img/default.jpg';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Table, TableBody, TableCell, Box, Button, TableContainer, TableHead, TableRow, Paper, InputLabel, Select } from '@mui/material';

import logo from '../../assets/img/filmbazaar.png';
import ApiClient from '../API/ApiClient';
import Sidebar from '../Sidebar/Sidebar';

const BuyerView = () => {
    const { getRequestApi } = ApiClient();
    const { id } = useParams();
    const [buyer, setBuyer] = useState([]);
    const [countries, setcountries] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;


    useEffect(() => {
        const fetchBuyerDetails = async () => {
            const data = await getRequestApi(`site/country`, {});
            if (data.status) {
                setcountries(data.data)
            }
            try {
                const response = await getRequestApi(`film/buyer/${id}`);
                // Check if the `data` object has the `data` property

                setBuyer(response.data); // Wrap the `data.data` in an array if it's a single object

            } catch (error) {
                console.error('Error fetching film data:', error);


            } finally {

            }
        };

        fetchBuyerDetails();
    }, [id]);


    const getCountryNames = (countryId) => {
        const country = countries?.find(c => c.id === countryId); // Find the country with the matching ID
        return country ? country.name : ''; // Return the country name or a default value
    };

    return (
        <>


            <div className="sidebar border border-right col-md-4 col-lg-3 p-0 bg-body-tertiary">
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
                            <Sidebar />

                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
          <main className="main-content-space col-md-8 ms-sm-auto col-lg-9 px-md-4">
                <div className="pagetitle-name">
                    <h1>Buyer Information</h1>
                </div>
                <div className="tab-content1" >

                    <div className='col-sm-12 col-md-12 col-lg-12 mx-auto mt-5' >

                    
                    <div className='card'>
                        <div className='card-body'>
                        <div className="row g-0  overflow-hidden flex-md-row mb-4  h-md-250  position-relative">
                                    <div className="col-auto d-lg-block">
                                    {buyer?.passport && buyer.passport.url ? (
                                                            <img src={`${BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/file/read/${buyer.passport.url}`} alt={buyer.passport.name} style={{ width: '200px', height: '200px' }} />
                                                        ) : (
                                                            <img src={defaultimg} alt="user" style={{ width: '200px', height: '200px' }} />
                                                        )}
                                    </div>
                                    <div className="col p-4 d-flex flex-column position-static pt-0">
                                        <h3 className="d-inline-block mb-2 text-primary-emphasis">{buyer.first_name} </h3>
                                        <div className="mb-1 text-body-secondary">  <strong>First Name :</strong> {buyer.first_name}</div>
                                        <div className="mb-1 text-body-secondary">  <strong>Last Name :</strong> {buyer.last_name}</div>
                                        <div className="mb-1 text-body-secondary">   <strong>Position :</strong> {buyer.job_title}</div>
                                        <div className="mb-1 text-body-secondary">   <strong>Company :</strong> {buyer.company}</div>
                
                                    </div>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {/* <h6>Script Completed</h6> */}
                                    <div className="list-group-item active header-title-bg mt-4 mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6 className='buyer-heading'>Address</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">

                                        <tbody>
                                            <tr>
                                                <th scope="row">Street :</th>
                                                <td> {buyer.address}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> City:</th>
                                                <td> {buyer.city}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">  Country :</th>
                                                <td> {getCountryNames(buyer.country_id)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"> Email :</th>
                                                <td>  {buyer.email}</td>
                                            </tr>   
                                           
                                            <tr>
                                                <th scope="row"> Phone :</th>
                                                <td>{buyer.phone}</td>
                                            </tr>  
                                            

                                        </tbody>
                                    </table>
                                </div>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {/* <h6>Script Completed</h6> */}
                                    <div className="list-group-item active header-title-bg mt-4 mb-4">
                                        <div className="d-flex align-items-center justify-content-start w-100">
                                            <h6 className='buyer-heading'>Profile</h6>
                                        </div>
                                    </div>
                                </Grid>
                                <div className="table-responsive">
                                    <table className="table table-striped table-list-view">

                                        <tbody>
                                            <tr>
                                                {/* <th scope="row">Profile :</th> */}
                                                <td>{buyer.about_us}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                </div>
                        </div>
                    </div>
                        {/* <div className="list-group">


                            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table" className='table table-bordered'>
                                    <TableRow className='form-white'>
                                        <TableCell align="center" colSpan={10} className='form-white'>
                                            <form className='form-white'>
                                                <div class="row g-0  overflow-hidden flex-md-row mb-4  h-md-250  position-relative">
                                                    <div className="col-auto d-lg-block">
                                                        {buyer?.passport && buyer.passport.url ? (
                                                            <img src={`${BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/file/read/${buyer.passport.url}`} alt={buyer.passport.name} style={{ width: '200px', height: '200px' }} />
                                                        ) : (
                                                            <img src={defaultimg} alt="user" style={{ width: '200px', height: '200px' }} />
                                                        )}
                                                    </div>

                                                </div>
                                                <h5 className='text-yellow'>CONTACT INFO</h5>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                First Name:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.first_name}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                Last Name:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.last_name}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                Position:      {buyer.job_title}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.position}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                Company:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.company}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                                <h5 className='text-yellow mt-4'>ADDRESS</h5>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                Street:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.address}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                City:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.city}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                Country:
                                                            </Typography>
                                                            <Typography variant="body1">

                                                                {getCountryNames(buyer.country_id)}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                E-mail:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.email}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="subtitle1" className="form-label" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                Phone:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {buyer.phone}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                                <h5 className='text-yellow mt-4'>Profile</h5>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                        <Box display="flex" alignItems="justify">
                                                            <Typography variant="subtitle1" className="form-label" style={{ textAlign: 'justify', marginRight: '8px' }}>
                                                                {buyer.about_us}
                                                            </Typography>

                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </div> */}
                    </div>
                </div>
            </main>

        </>
    );


};



export default BuyerView;

