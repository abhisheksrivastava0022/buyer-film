import React, { useEffect, useState } from 'react'
import defaultimg from '../assets/img/default.jpg';
import ApiClient from './API/ApiClient';
import { Link } from 'react-router-dom';
const Notification = () => {
    const { getRequestApi } = ApiClient();
    const [data, setData] = useState([]);
    const [unreadMessage, setUnreadMessage] = useState(0);

    const preLoadData = async () => {
        const data = await getRequestApi('film/fetch-last-messages', {});
        console.log({ data });
        setData(data.data);

        const response = await getRequestApi(`film/find-new-chat-all/`);
        setUnreadMessage(response.data)
    }

    useEffect(() => {
        preLoadData();

        setInterval(async () => {
            const response = await getRequestApi(`film/find-new-chat-all/`);
            if (response.data) {
                preLoadData();
            }

        }, 30000);
        setInterval(async () => {
            preLoadData();
        }, 120000);
    }, []);
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
        <div className='notification1'>
            <div className='notification-social-icon'>
            <ul className='chat-notification'>
                <li><span><i class="bi bi-chat-dots" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1"></i><sup>{unreadMessage}</sup></span></li>
                <li><a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><i class="bi bi-bell"></i><sup>1</sup></a></li>
            </ul>
            </div>

           
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Notifications</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body ">
                    <div className='notification-list'>
                        <ul>
                            <li>
                                <div><img src={defaultimg} alt="" className='user-img-notification' /></div>
                                <div className='text-notification'>
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                                    </p>
                                    <p className='date'>4 months ago</p>
                                </div>
                            </li>
                            <li>
                                <div><img src={defaultimg} alt="" className='user-img-notification' /></div>
                                <div className='text-notification'>
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                                    </p>
                                    <p className='date'>4 months ago</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample1" aria-labelledby="offcanvasExampleLabel1">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel1">Chat</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body ">
                    <div className='notification  last-chat-list'>
                        <ul>
                            {data.map((row) => (
                                <li className="chatdiv">
                                    <div className='imagechat'><img src={defaultimg} alt="" className='user-img-notification' /></div>
                                    <div className="text-notification">
                                        <p>
                                            <b>{row.name}</b>
                                        </p>
                                        <p>{row.message}</p>
                                        <p className="date">{renderDate(row.createdAt)}</p>
                                        {row.type === 4 ? (
                                            <a href={`/film-buyer/buyer/chat/${row.user_chat_id}`} >click</a>
                                        ) : (
                                            <a href={`/film-buyer/seller/chat/${row.receiver_id}`} >click</a>
                                        )}
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification