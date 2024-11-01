// import React from 'react';
import React, { Suspense, lazy } from 'react';
//import HomePage from "../components/HomePage/HomePage";
//import AboutPage from '../components/AboutPage/AboutPage';
// import NotFound from '../components/NotFound/NotFound';
import MainLayout from '../components/Layout/MainLayout';
import Dashboard from '../components/Dashboard/Dashboard';
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
                path: '/dashboard',
                // element: <HomePage />,
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <Dashboard/>
                    </Suspense>
                ),

            },
            {
                path: '/',
                // element: <HomePage />,
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <HomePage />
                    </Suspense>
                ),

            },
            {
                path: '/home/:language',
                // element: <HomePage />,
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <HomePage />
                    </Suspense>
                ),

            },
            {
                path: '/search',
                // element: <SearchPage />,
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <SearchPage />
                    </Suspense>
                ),

            },
            {
                path: '/:slug',
                // element: <InnerPage />,
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <InnerPage />
                    </Suspense>
                ),

            },
            {
                path: '/:slug/:language',
                // element: <InnerPage />,
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <InnerPage />
                    </Suspense>
                ),

            },
            {
                path: '404',
                // element: <NotFound />
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <NotFound />
                    </Suspense>
                ),
            },
            {
                path: '*',
                // element: <NotFound />
                element: (
                    <Suspense fallback={<div>Loading Page...</div>}>
                        <NotFound />
                    </Suspense>
                ),
            },

        ],
        loader: async () => {

            return false;
        },
    },

];
