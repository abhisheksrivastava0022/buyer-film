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
                path: '/profile',
                // element: <HomePage />,
                element: (
                    <Profile/>
                ),

            }
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

];
