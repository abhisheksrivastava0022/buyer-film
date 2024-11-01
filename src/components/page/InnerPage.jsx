import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DefaultPage from './Template/DefaultPage';
import TenderPage from './Template/TenderPage';
import BoardPage from './Template/BoardPage';
import CorporatePage from './Template/CorporatePage';
import ExternalWeb from './Template/ExternalWeb';
import NewsPage from './Template/NewsPage';
import CareerPage from './Template/CareerPage';
import MediaPage from './Template/MediaPage';
import VideoPage from './Template/VideoPage';
import ContactPage from './Template/ContactPage';
import SiteMap from './Template/SiteMap';
import SocialLink from './Template/SocialLink';

const InnerPage = () => {
   const innerpagedata = useSelector((state) => state.innerPage);
   const homePage = useSelector((state) => state.homePage);
   const post_meta = (innerpagedata?.post_meta) ? innerpagedata.post_meta : {};

   const [loadtemplate, setLoadtemplate] = useState((post_meta?.template));

   const renderTemplate = (loadtemplatedata) => {

      switch (loadtemplatedata) {
         case 'HomeTemplate':
            return (
               <>
                  <DefaultPage />
               </>
            );
         case 'tender':
            return (
               <>
                  <TenderPage />
               </>
            );
         case 'board':
            return (
               <>
                  <BoardPage />
               </>
            );
         case 'corporate':
            return (
               <>
                  <CorporatePage />
               </>
            );
         case 'external-web':
            return (
               <>
                  <ExternalWeb />
               </>
            );
         case 'news':
            return (
               <>
                  <NewsPage />
               </>
            );
         case 'career':
            return (
               <>
                  <CareerPage />
               </>
            );
         case 'media':
            return (
               <>
                  <MediaPage />
               </>
            );
         case 'video':
            return (
               <>
                  <VideoPage />
               </>
            );
         case 'contact':
            return (
               <>
                  <ContactPage />
               </>
            );
         case 'sitemap':
            return (
               <>
                  <SiteMap />
               </>
            );
         case 'social_link':
            return (
               <>
                  <SocialLink />
               </>
            );
         default:
            return (
               <>
                  <DefaultPage />
               </>
            );
      }
   };



   return (
      <>
         {renderTemplate(post_meta?.template)}
      </>
   )
}

export default InnerPage