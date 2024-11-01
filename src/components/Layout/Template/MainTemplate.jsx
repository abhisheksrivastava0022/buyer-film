import React, { useEffect } from 'react'
import SocialMediaLink from '../../SocialMediaLink/SocialMediaLink'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import HeaderTop from '../../HeaderTop'
import HeaderInner from '../../HeaderInner'
import { useDispatch } from 'react-redux';
import { InnerPageData } from '../../../action/index'; // import the action
import ApiClient from '../../API/ApiClient'

const MainTemplate = () => {
    const navigate = useNavigate();
    const { getRequestApi } = ApiClient();
    const dispatch = useDispatch();
    const { slug, language = 'en' } = useParams();

    const loadPreLoadData = async () => {
        if (slug) {
            const response = await getRequestApi(`post/${slug}/${language}`);
            if (response?.status && response.data) {
                dispatch(InnerPageData(response.data));
            } else {
                // alert("dd");
                navigate("404");

            }
            console.log({ response });
        }

    }
    useEffect(() => {
        loadPreLoadData();
    }, [language, slug]);
    return (
        <>
            <HeaderTop />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainTemplate