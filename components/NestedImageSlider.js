import React from "react";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";

export default function NestedImageSlider({slideData}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
    <Slider {...settings}>
    {slideData.map((slide , index)=>{
      <CarouselItem item={slide} key={index} />
    })}
    </Slider>
    </>
  );
}