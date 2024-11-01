// import React from 'react';
import React, { Suspense, lazy } from 'react';
//import HomePage from "../components/HomePage/HomePage";
//import AboutPage from '../components/AboutPage/AboutPage';
// import NotFound from '../components/NotFound/NotFound';
import MainLayout from '../components/Layout/MainLayout';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
// import InnerPage from '../components/page/InnerPage';
// import HomePage from '../components/page/HomePage';
// import SearchPage from '../components/page/Template/SearchPage';

// Lazy load the components
const HomePage = lazy(() => import('../components/page/HomePage'));
const InnerPage = lazy(() => import('../components/page/InnerPage'));
const NotFound = lazy(() => import('../components/NotFound/NotFound'));
const SearchPage = lazy(() => import('../components/page/Template/SearchPage'));

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

            }
        ],

        loader: async () => {

            return false;
        },
    },
    {
        path: '/login',
        element: <Login/>,
        //     errorElement: <ErrorBoundary />,
    },
    {
        path: '*', // This catches all undefined routes
        element: <NotFound />,
        //   errorElement: <ErrorBoundary />,
    },

];
