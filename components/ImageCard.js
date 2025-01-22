import React from 'react'
import Slider from "react-slick";
import sanityImgUrlBuilder from '/src/sanity/lib/image'
import Image from "next/image";
import { Autoplay } from 'swiper/modules';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

function ImageCard({ item }) {
  var settings = {
    dots: item.images.length > 1,
    infinite: item.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    Autoplay: true
  };
  return (
    <>
    <Link prefetch href={`${item.category}/${item.slug.current}`} >
      <Slider {...settings}>
        {item?.images?.map((image, index) => (
          <div key={index} className=" text-black rounded-3xl  flex justify-center items-center ">

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:w-full  ">
              <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse
             rounded-lg bg-gradient-to-t from-black/25 via-black/0 sm:row-start-2 sm:p-0 lg:row-start-1">
                <h1 className="mt-1 text-lg font-semibold text-white  md:text-xl py-10 px-2 dark:sm:text-white">

                  {item.price.min} - {item.price.max} {item.price.currency}</h1>
              </div>
              <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 lg:gap-6   lg:mb-0" >
                <Image height={600} width={500}
                  src={sanityImgUrlBuilder(image?.asset?._ref).width(800).url()}
                  alt="" className="w-full h-[300px] sm:h-[300px]  rounded-3xl" loading="lazy"

                />
              </div>

              <div className="relative p-3 capitalize col-start-1 row-start-1 flex  py-3 justify-between rounded-lg bg-gradient-to-t from-black/25 via-black/5 sm:bg-none sm:p-0 lg:row-start-1">
                <h1 className="mt-1 h-fit text-lg font-semibold text-white bg-orange-600  md:text-xlpx-2  px-2">
                  featured</h1>
                <div className="flex gap-5">
                  <h1 className="mt-1 text-lg font-semibold h-fit text-white bg-black/20  md:text-xlpx-2 px-2 ">
                    {item?.propertyType}</h1>

                  <h1 className="mt-1 text-lg capitalize font-semibold h-fit text-white    bg-black/25 md:text-xlpx-2  px-2">
                    {item?.propertyStatus}</h1>
                </div>
              </div>


            </div>
          </div>
        ))}
      </Slider>
      </Link>
    </>
  );
}

export default ImageCard
