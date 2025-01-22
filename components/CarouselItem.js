// /components/CarouselItem.js

import { BedIcon, LandPlotIcon, ShowerHead } from "lucide-react";
import ImageSlider from "./ImageSlider";
import PropertyDescription from "./PropertyDescription";

const CarouselItem = ({ item }) => {
  return (
    <div className="lg:m-2  py-5 lg:px-2 text-black ">
        
      <ImageSlider item={item ||[]} />
     
      
      <PropertyDescription item={item} />
    </div>
  );
};

export default CarouselItem;
