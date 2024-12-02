// import React from 'react';
import React, { Suspense, lazy } from 'react';
//import HomePage from "../components/HomePage/HomePage";
//import AboutPage from '../components/AboutPage/AboutPage';
// import NotFound from '../components/NotFound/NotFound';
import MainLayout from '../components/Layout/MainLayout';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import Signup from '../components/SignUp/SignUp';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import RecoverPassword from '../components/RecoverPassword/RecoverPassword';
import Profile from '../components/Profile/Profile';
import InterestSend from '../components/Dashboard/InterestSend';
import InterestDecline from '../components/Dashboard/InterestDecline';
import InterestApproved from '../components/Dashboard/InterestApproved';
import ViewDetails from '../components/ViewDetails/ViewDetails';
import SellerListing from '../components/Film/SellerListing';
import ViewFilmDetails from '../components/Film/ViewFilmDetails';
import Seller from '../components/Pages/Seller';
import SellerDetails from '../components/Pages/SellerDetails';
import Buyer from '../components/Pages/Buyer';
import BuyerDetails from '../components/Pages/BuyerDetails';
import MainView from '../components/FormDetails/MainView';
import Interest from '../components/Dashboard/Interest';
import InterestReceived from '../components/InterestReceived';
import ConnectionBuild from '../components/ConnectionBuild';
import BuyerView from '../components/Pages/BuyerView';
import SellerView from '../components/Pages/SellerView';
import VerifyUser from '../components/Login/VerifyUser';
import BuyerChat from '../components/Pages/BuyerChat';
import SellerChat from '../components/Pages/SellerChat';


const NotFound = lazy(() => import('../components/NotFound/NotFound'));

export const routes = [

    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                // element: <HomePage />,
                element: (
                    <SellerListing />

                ),

            },
            {
                path: '/explore-project',
                // element: <HomePage />,
                element: (
                    <SellerListing />
                ),

            },

            {
                path: '/my-liked-project',
                // element: <HomePage />,
                element: (
                    <Interest />
                ),

            },

            {
                path: '/profile',
                // element: <HomePage />,
                element: (
                    <Profile />
                ),

            },
            {
                path: '/view-film/:id',
                // element: <HomePage />,
                element: (
                    <ViewDetails />
                ),

            },
            {
                path: '/seller-projects',
                element: <SellerListing />,
            },
            {
                path: '/seller-projects/:id',
                element: <MainView />,
            },
            {
                path: '/seller',
                element: <Seller />,
            },
            {
                path: '/seller/:id',
                element: <SellerDetails />,
            },
            {
                path: '/buyer',
                element: <Buyer />,
            },
            {
                path: '/buyer/:id',
                element: <BuyerDetails />,
            },
            {
                path: '/buyer/chat/:id',
                element: <BuyerChat />,
            },
            {
                path: '/seller/chat/:id',
                element: <SellerChat />,
            },
            {
                path: '/buyer/view/:id',
                element: <BuyerView />,
            },
            {
                path: '/seller/view/:id',
                element: <SellerView />,
            },
            {
                path: '/interest-received',
                element: <InterestReceived />,
            },
            {
                path: '/connection-build',
                element: <ConnectionBuild />,
            },

        ],
        loader: async () => {

            return false;
        },
    },
    {
        path: '/verify/:token',
        element: <VerifyUser />,
        //     errorElement: <ErrorBoundary />,
    },
    {
        path: '/login',
        element: <Login />,
        //     errorElement: <ErrorBoundary />,
    },
    {
        path: '/signup',
        element: <Signup />,
        //     errorElement: <ErrorBoundary />,
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />,
        //     errorElement: <ErrorBoundary />,
    },
    {
        path: '/change-password/:token',
        element: <RecoverPassword />,
        //     errorElement: <ErrorBoundary />,
    },
    {
        path: '*', // This catches all undefined routes
        element: <NotFound />,
        //   errorElement: <ErrorBoundary />,
    },
    {
        path: '/sellerlist',
        element: <SellerListing />,
    },
    {
        path: '/view-film-details',
        element: <ViewFilmDetails />,
    },



];
