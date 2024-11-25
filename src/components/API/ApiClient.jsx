// src/utils/apiClient.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const BASE_URL_API = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/`;
const ApiClient = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getRequestApi = async (endpoint, options = {}) => {
        try {
            const params = new URLSearchParams(options);
            let apiUrl = `${BASE_URL_API}${endpoint}`;
            if (params) {
                console.log({ params })
                apiUrl += `?${params}`
            }
            const response = await fetch(apiUrl, {
                method: "get",
                headers: {
                    // "Content-Type": "application/json",
                    //  Authorization: 'Bearer ' + token
                },
                credentials: 'include'
            });

            if (response.status == 401) {
                //localStorage.removeItem('token');
                //  navigate('/login'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {

            localStorage.removeItem('token');
            console.error('API request error:', error);
            //  navigate('/login');
            //throw error;
        }

    };

    const postRequestApi = async (endpoint, options = {}) => {

        const jsondata = JSON.stringify(options);

        try {
            const response = await fetch(`${BASE_URL_API}${endpoint}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    //   A  uthorization: 'Bearer ' + token
                },
                body: jsondata,
                credentials: 'include'
            });
            // console.log(BASE_URL_API, "url")

            if (response.status == 401) {
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();

            return data;
        } catch (error) {

            console.error('API request error:', error);
            throw error;
        }
    };
    const userInfo = async (endpoint, options = {}) => {
        try {
            const params = new URLSearchParams(options);
            let apiUrl = `${BASE_URL_API}${endpoint}`;
            if (params) {
                console.log({ params })
                apiUrl += `?${params}`
            }
            const response = await fetch(apiUrl, {
                method: "get",
                headers: {
                    // "Content-Type": "application/json",
                    //  Authorization: 'Bearer ' + token
                },
                credentials: 'include'
            });

            if (response.status == 401) {
                navigate('/login');
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {

            localStorage.removeItem('token');
            console.error('API request error:', error);
            //  navigate('/login');
            //throw error;
        }
    };
    const userLoginCheck = async (endpoint, options = {}) => {
        try {
            const params = new URLSearchParams(options);
            let apiUrl = `${BASE_URL_API}${endpoint}`;
            if (params) {
                console.log({ params })
                apiUrl += `?${params}`
            }
            const response = await fetch(apiUrl, {
                method: "get",
                headers: {
                    // "Content-Type": "application/json",
                    //  Authorization: 'Bearer ' + token
                },
                credentials: 'include'
            });

            if (response.status == 200) {
                navigate('/');
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {

            localStorage.removeItem('token');
            console.error('API request error:', error);
            //  navigate('/login');
            //throw error;
        }
    };


    const patchRequestApi = async (endpoint, options = {}) => {

        const jsondata = JSON.stringify(options);

        try {
            const response = await fetch(`${BASE_URL_API}${endpoint}`, {
                method: "patch",
                headers: {
                    "Content-Type": "application/json",
                    //   A  uthorization: 'Bearer ' + token
                },
                body: jsondata,
                credentials: 'include'
            });
            // console.log(BASE_URL_API, "url")

            if (response.status == 401) {
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();

            return data;
        } catch (error) {

            console.error('API request error:', error);
            throw error;
        }
    };


    const postRequestApiWithoutLogin = async (endpoint, options = {}) => {

        const jsondata = JSON.stringify(options);

        try {
            const response = await fetch(`${BASE_URL_API}${endpoint}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    //   A  uthorization: 'Bearer ' + token
                },
                body: jsondata,
                credentials: 'include'
            });
            const data = await response.json();

            return data;
        } catch (error) {

            console.error('API request error:', error);
            throw error;
        }
    };





    return { postRequestApi, getRequestApi, userInfo, userLoginCheck, patchRequestApi, postRequestApiWithoutLogin };
};

export default ApiClient;
