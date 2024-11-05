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
                    <Dashboard />

                ),

            },
            {
                path: '/interest-send',
                // element: <HomePage />,
                element: (
                    <InterestSend />
                ),

            },
            {
                path: '/interest-Decline',
                // element: <HomePage />,
                element: (
                    <InterestDecline />
                ),

            },
            {
                path: '/interest-approved',
                // element: <HomePage />,
                element: (
                    <InterestApproved />
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
                path: '/film',
                element: <SellerListing />,
            },
            {
                path: '/film/:id',
                element: <ViewFilmDetails />,
            },
        ],

        loader: async () => {

            return false;
        },
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
