import React from "react";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";

export default function Carousel({slideData}) {
  var settings = {
    dots: true,
   arrows:true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    easing:true,
    autoplay:true,
    autoplaySpeed :9000,
    pauseOnHover:true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
            autoplay:true,
            autoplaySpeed :9000,
           pauseOnHover:true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            autoplay:true,
            speed: 500,
            autoplaySpeed :9000,
            pauseOnHover:true,

          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            speed: 500,
            autoplaySpeed :9000,
            pauseOnHover:true,

          }
        }
      ]
  };
  return (
    <>
    <Slider {...settings} className=" lg:p-5">
    {slideData.map((slide,index)=>(
        <div className="gap-5 flex text-black">
      <CarouselItem item={slide} key={slide._id} />
      </div>
    ))}
    </Slider>
    </>
  );
}