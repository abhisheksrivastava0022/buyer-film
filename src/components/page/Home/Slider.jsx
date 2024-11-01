import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ApiClient from '../../API/ApiClient';

const Slider = () => {


    const { language = 'en' } = useParams();
    const { getRequestApi } = ApiClient();
    const [loadData, setLoadData] = useState([]);
    const homePage = useSelector((state) => state.homePage);
    const post_meta = (homePage?.post_meta) ? homePage.post_meta : {};
    const loadPreLoadData = async () => {
        const response = await getRequestApi(`post/type/banner/${language}`);
        if (response.status) {
            console.log({ dagsgsgs: response.data });
            setLoadData(response.data);
        }
    }
    useEffect(() => {
        loadPreLoadData();
    }, [language]);
    return (
        <>
            {/* <!-- Slider Starts --> */}
            <div id="myCarousel" className="carousel slide hero-banner-home" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {
                        loadData ? (
                            loadData.map((item, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.id}>
                                    <img src={`${process.env.REACT_APP_BASE_URL}/api/gallery/${item?.featured_image?.url}`} className="bd-placeholder-img" width="100%" height="100%" alt={item.title} />
                                    <div className="container">
                                        <div className="carousel-caption text-start">
                                            <h1>{item.title}</h1>
                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />

                                            {item?.post_meta?.external_link && (
                                                <p><Link className="btn btn-lg btn-primary border-btn" to={item.post_meta.external_link}>{post_meta?.button_redirect_text}</Link></p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : <></>
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div >
            {/* <!-- Slider Ends -->  */}
        </>
    )
}

export default Slider