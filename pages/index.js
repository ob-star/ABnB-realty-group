import Banner from '../components/Banner';
import React, {  useEffect } from 'react'
import AOS from 'aos'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import EventsSection from '../components/EventsSection';
import { educationalPrograms } from '../data/educationalPrograms';
import {homePurpose}  from '../data/section_data';
import { campusLife } from '../data/campus-life';
import Head from 'next/head';
import Landing from '../components/_shared/Landing';
import HomePurpose from '../components/_shared/HomePurpose';
import EducationalProgram from '../components/_shared/EducationalProgram';
import CampusLifeSection from '../components/_shared/CampusLifeSection';
// import GoogleMaps from '../components/GoogleMaps';

function Index() {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-in-sine',
      once:false,
      anchorPlacement:"top-bottom",
    
      mirror:true
    });
    AOS.refresh();
  
  }, []);
 
  return ( 
    <>
      
      <Head>
      <link rel="icon" href="/images/logo.jpg" />

        <title>Santa Mariel ICAL Class - Mariel ICAL School | Campus Life & Education</title>

        <meta
          name="description"
          content="Explore the Santa Mariel ICAL class at Mariel ICAL School. Learn about our diverse campus life, educational programs, and more!"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Santa Mariel ICAL Class - Mariel ICAL School" />
        <meta property="og:description" content="Discover the Santa Mariel ICAL class, campus life, and educational opportunities at Mariel ICAL School." />
        <meta property="og:url" content="https://www.santamarielicalclassschool.org/" />
        <meta property="og:image" content="/images/carousel-1.jpg" />

      </Head>
    <main>
    <Landing />
      <HomePurpose homePurpose={homePurpose} />

      <Banner data-aos="fade-up" data-aos-anchor-placement='top-bottom'/>
      <EducationalProgram educationalPrograms={educationalPrograms} />
      <CampusLifeSection campusLife={campusLife}/>
         <EventsSection  />
     
    </main>
      
    
       
   </>
   )
};
export default Index;