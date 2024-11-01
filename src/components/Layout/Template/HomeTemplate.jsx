import React from 'react'
import SocialMediaLink from '../../SocialMediaLink/SocialMediaLink'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import HeaderTop from '../../HeaderTop'
const MainTemplate = () => {

    return (
        <>
            <HeaderTop />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainTemplate