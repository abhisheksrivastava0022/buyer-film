import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import defaultimg from '../../assets/img/default.jpg';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Table, TableBody, TableCell, Box, Button, TableContainer, TableHead, TableRow, Paper, InputLabel, Select } from '@mui/material';
import logo from '../../assets/img/filmbazaar.png';
import ApiClient from '../API/ApiClient';
import Sidebar from '../Sidebar/Sidebar';

const dataurl = process.env.REACT_APP_BASE_URL;
const BuyerChat = () => {
    const panelRef = useRef(null); // Reference for the panel
    const { getRequestApi, postRequestApi } = ApiClient();
    const { id } = useParams();
    const [buyer, setBuyer] = useState([]);
    const [data, setData] = useState([]);
    const [chatlist, SetChatlist] = useState([]);
    const [countries, setcountries] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const preLoadData = async () => {
        const data = await getRequestApi('film/buyer', {});
        setData(data.data);
    }
    const fetchChatDetails = async () => {

        const response = await getRequestApi(`film/chat/${id}/4`, { message });
        // Check if the `data` object has the `data` property
        if (response.status) {
            console.log({ data: response.data });
            SetChatlist(response.data); // Wrap the `data.data` in an array if it's a single object
            setTimeout(() => {
                if (panelRef.current) {
                    panelRef.current.scrollTop = panelRef.current.scrollHeight;
                }
            }, 100);
        }
    }
    useEffect(() => {
        fetchChatDetails();
        preLoadData();
        const fetchBuyerDetails = async () => {
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

        setInterval(async () => {
            const response = await getRequestApi(`film/find-new-chat/${id}/4`);
            if (response.data) {
                fetchChatDetails();
            }

        }, 10000);
    }, [id]);
    const [message, setMessage] = useState('');
    const handleChange = (event) => {
        setMessage(event.target.value);
    };
    const handleSubmit = async (e) => {
        if (message) {
            const response = await postRequestApi(`film/chat/${id}/4`, { message });
            if (response.status) {
                // alert("data pass")
                fetchChatDetails();
            }
            setMessage("");
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default enter key behavior (new line in textarea)
            handleSubmit(e); // Call handleSubmit when Enter is pressed
        }
    };


    const renderDate = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffInMs = now - createdDate;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (diffInHours < 24) {
            if (diffInHours === 0) {
                const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
                return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
            }
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        }

        // Format for older dates
        return `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };
    return (
        <>
            <div className="sidebar border border-right col-md-3 col-lg-3 p-0 bg-body-tertiary">
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <div className="col-md-12 px-3 search-sidebar">
                            <ul className="address">
                                {/* 
               <li> <i className="bi bi-geo-alt"></i>{data?.FilmMaker?.first_name} {data?.FilmMaker?.last_name}</li>
               <li><i className="bi bi-envelope"></i> {data?.FilmMaker?.email}</li>
               <li> <i className="bi bi-globe"></i> https://filmbazaarindia.com/</li>
               <li> <i className="bi bi-calendar3"></i> June 02, 1988</li>
               <li><a href=""><i className="bi bi-facebook"></i></a> <a href=""><i className="bi bi-twitter"></i></a> <a href=""><i className="bi bi-linkedin"></i></a></li>
               */}
                            </ul>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <main className="main-content-space col-md-8 ms-sm-auto col-lg-9 px-md-4">

                {/* Notification code */}

                {/* <ChatAll /> */}
                {/* Notification code end*/}
                <div className="pagetitle-name">
                    <h1> <i class="bi bi-chat-left-text"></i> Chat</h1>
                </div>
                <div className="tab-content1" >
                    <div className="row form-group">
                        <div className=" col-md-12 ">
                            <div className="panel panel-primary">
                                <div className="panel-body body-panel" ref={panelRef}>
                                    <ul className="chat">
                                        {chatlist.map((row) => (
                                            row.receiver_id == id ? (
                                                <li key={row.id} className="right clearfix">
                                                    <span className="chat-img pull-left">
                                                        <img
                                                            src={data?.passport?.url ? `${dataurl}${process.env.REACT_APP_BASE_PREFIX}/file/${data.passport.url}` : defaultimg}
                                                            alt={data?.passport?.name ? `${data.passport.name}` : "defaultimg"} />
                                                    </span>
                                                    <div className="chat-body clearfix">
                                                        <p>{row.message}</p>
                                                        <div className="header">
                                                            {/* <strong className="primary-font">You</strong>{" "} */}
                                                            <small className="pull-right text-muted">
                                                                <span className="glyphicon glyphicon-time"></span>
                                                                {renderDate(row.createdAt)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </li>
                                            ) : (
                                                <li key={row.id} className="left clearfix">
                                                    <span className="chat-img pull-left">
                                                        <img
                                                            src={buyer?.passport?.url ? `${dataurl}${process.env.REACT_APP_BASE_PREFIX}/file/${buyer.passport.url}` : defaultimg}
                                                            alt={buyer?.passport?.name ? `${buyer.passport.name}` : "defaultimg"} />
                                                    </span>
                                                    <div className="chat-body clearfix">
                                                        <p>{row.message}</p>
                                                        <div className="header">
                                                            {/* <strong className="primary-font">{buyer?.first_name} {buyer?.last_name}</strong>{" "} */}
                                                            <small className="pull-right text-muted">
                                                                <span className="glyphicon glyphicon-time"></span>
                                                                {renderDate(row.createdAt)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                                <div className="panel-footer clearfix">
                                    <div className="input-group mb-3">
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={message} // Controlled component
                                            onChange={handleChange}
                                            placeholder="Type your message here"
                                            onKeyDown={handleKeyDown} // Add keydown event handler
                                        ></textarea>
                                        <button
                                            onClick={handleSubmit}
                                            className=" chat-send  btn btn-warning  "
                                            id="btn-chat"
                                        >
                                            <i class="bi bi-send"></i>
                                        </button>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default BuyerChat;