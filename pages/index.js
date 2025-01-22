import { useState } from 'react';
import Carousel from '../components/Carousel';
import ImageSection from '../components/ImageSection';
import TitledContent from '../components/TitledContent';
import SanityClient from '../src/sanity/lib/client';
import FilterCard from '../components/FilterCard';

 
const client = SanityClient();

const titledContent = {
  title: 'Discover Our Featured Listings',
  desc: 'Find your dream home – urban or suburban, we have it all. Explore now!',
};
const residentialContent = {
  title: 'Residential',
  desc: 'Indulge in opulence with our Finest Property Collection – a handpicked selection of residences that redefine luxury living',
};
const commercialContent = {
  title: 'Commercial',
  desc: 'From urban sophistication to tranquil retreats, find the perfect property that aligns with your business.',
};

const landContent = {
  title: 'Lands',
  desc: 'From urban sophistication to tranquil retreats, find the perfect property that aligns with your business.',
};
export default function Home({ allData,params }) {
  const residentialData = allData.filter((item) => item.category === 'residential').slice(0,3);
  const commercialData = allData.filter((item) => item.category === 'commercial').slice(0,3);
  const landData = allData.filter((item) => item.category === 'land').slice(0,3);

  const featuredData = allData.filter((item) => item.featured === true);


  return (
    <div className="min-h-screen bg-gray-100 p-3 gap-10 ">
      <main className='space-y-20 gap-10'>

        <div
          className="w-screen h-[80vh] flex flex-col priority justify-center items-center bg-black/50 bg-blend-multiply bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(/images/herohouse.jpg)`,
          }}
        >
          <h1 className="py-4 text-white font-nexa text-[36px] text-center md:text-[48px] px-4 container mx-auto font-bold">
            ABnB Realty Group
          </h1>
          <p className="text-white text-center text-2xl w-[80vw]">
            Discover extraordinary living with our curated featured listings. From urban elegance to countryside charm, find your dream home effortlessly.
          </p>
        </div>
            <FilterCard />
        <TitledContent {...titledContent} />
        <Carousel slideData={featuredData} />
        <TitledContent {...residentialContent} />

        <section className="md:col-span-9 mt-10 mx-3">
          <ImageSection data={residentialData} />
       
        </section>
        <TitledContent {...commercialContent} />
        <ImageSection data={commercialData} />
        <TitledContent {...landContent} />
        <ImageSection data={landData} />


      </main>
    </div>
  );
}

export async function getStaticProps() {
  const query = `
    *[_type == "property"] | order(_createdAt desc) {
      propertyStatus,
      size,
      featured,
      slug,
      yearBuilt,
      createdBy,
      images,
      address,
      propertyType,
      title,
      price,
      category,
      _createdAt
    }
  `;

  const allData = await client.fetch(query);

  return {
    props: {
      allData, 
    },
    revalidate: 60, 
  };
}
