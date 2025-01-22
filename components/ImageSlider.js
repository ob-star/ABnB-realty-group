import Image from "next/image";
import React from "react";
import  { useRef } from "react";

import Slider from "react-slick";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import sanityImgUrlBuilder from '/src/sanity/lib/image'
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";

  
export default function ImageSlider({item}) {
 
  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }
  return (
    <div className="   text-black bg-white rounded-3xl  p-2 lg:m-2  ">
          
       <Slide> 
            
      {item?.images?.map((image,index)=>(
        <div key={index} className=" text-black rounded-3xl  flex justify-center items-center ">
         

<div className="max-w-4xl mx-auto grid grid-cols-1 lg:w-full  ">
    <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/25 via-black/0 sm:row-start-2 sm:p-0 lg:row-start-1">
    <div className="flex justify-between px-5 py-10 mt-1">

      <h1 className=" text-lg font-semibold text-white  md:text-xl  px-2 dark:sm:text-white">
        {item?.price?.min} - {item?.price?.max} {item?.price?.currency}</h1>
        <Link className="hover:cursor-pointer z-50" href={`${item.category}/${item.slug.current}`}>
        <BsEyeFill color="white" size={30} />
        </Link>
        </div>

    </div>
    <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 lg:gap-6   lg:mb-0" style={{ ...divStyle,}}>
      <Image height={500} width={500} 
              src={sanityImgUrlBuilder(image?.asset?._ref).width(800).url() }
              alt="" className="w-full h-[300px] sm:h-[400px] object-cover rounded-3xl" 
              
        />
    </div>
  <div className="relative p-3 col-start-1 row-start-1 flex  py-3 justify-between rounded-lg bg-gradient-to-t from-black/25 via-black/5 sm:bg-none sm:p-0 lg:row-start-1">
     {item.featured && <h1 className="mt-1 h-fit text-lg font-semibold text-white bg-orange-600  md:text-xlpx-2  px-2">
         featured</h1>}
     <div className="flex gap-5">
     <h1 className="mt-1 capitalize text-lg font-semibold h-fit text-white bg-black/20  md:text-xlpx-2 px-2 ">
      {item.propertyStatus}</h1>

      <h1 className="mt-1 text-lg font-semibold h-fit text-white    bg-black/25 md:text-xlpx-2  px-2">
       Hot Offer</h1>
</div>
    </div>
  

  </div>

        </div>
      ))}
    </Slide>
    
    
    
    </div>
  );
}