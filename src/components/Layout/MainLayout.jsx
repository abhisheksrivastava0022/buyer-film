import React, { useEffect, useState } from 'react'

import MainTemplate from './Template/MainTemplate'
import HomeTemplate from './Template/HomeTemplate'
import ApiClient from '../API/ApiClient';
import { useDispatch } from 'react-redux';
import { HomePageData, headerMenu, footerMenu } from '../../action/index'; // import the action
import { useParams } from 'react-router-dom';

const MainLayout = () => {
  const { slug, language = 'en', param } = useParams();

  const { getRequestApi } = ApiClient();
  const dispatch = useDispatch();
  let tempate = 'HomeTemplate'
  if (slug) {
    tempate = 'MainTemplate'
  }
  const [loadtemplate, setLoadtemplate] = useState(tempate);
  const loadPreLoadData = async () => {
    const response = await getRequestApi(`post/${language}`);
    if (response?.status) {
      console.log({ data: response.data })
      dispatch(HomePageData(response.data));
    }
    const data = await getRequestApi(`menu/top-header-front/${language}`);
    if (data.status && data?.data?.payload_data) {
      dispatch(headerMenu(data.data.payload_data));
    }
    const footermenu = await getRequestApi(`menu/footer/${language}`);
    if (footermenu.status && footermenu?.data?.payload_data) {
      dispatch(footerMenu(JSON.parse(footermenu.data.payload_data)));
    }
  }
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    let tempate = 'HomeTemplate'
    if (slug) {
      tempate = 'MainTemplate'
    }
    setLoadtemplate(tempate);
    const loadData = async () => {

      loadPreLoadData();
      //  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating delay

      setLoading(false);
    };

    loadData();
  }, [slug, language]);
  // const loadtemplate = 1;
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or placeholder
  }
  const renderTemplate = () => {
    switch (loadtemplate) {
      case 'HomeTemplate':
        return (
          <>
            <HomeTemplate />
          </>
        );
      case 'MainTemplate':
        return (
          <>
            <MainTemplate />
          </>
        );
      default:
        return (
          <>
            <MainTemplate />
          </>
        );
    }
  };

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default MainLayout