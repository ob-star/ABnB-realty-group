import React from 'react'
import { BedIcon, LandPlotIcon, ShowerHead } from "lucide-react";

function PropertyDescription({item}) {
  return (
    <div>
       <div className=" container mx-auto flex flex-col items-">
      <div className="flex flex-wrap mt-5  items-baseline">
      <h1 class="w-full flex-none mb-3 text-lg leading-none text-slate-900">
      {item?.title}
      </h1>
      <h3 class="w-full flex-none mb-3 text-[14px] leading-none text-slate-400">
      {item?.address?.name}  {item?.address?.city} {item?.address?.country}

      </h3>
    
    </div>
    <div className="flex gap-5">
    <div className="flex gap-2">
      <BedIcon />
      <p className="font-bold">{item?.size?.bedrooms}</p>

    </div>

    <div className="flex gap-2">
      <ShowerHead />
      <p className="font-bold">{item?.size?.bathrooms}</p>

    </div>
    <div className="flex gap-2">
      <LandPlotIcon />
      <p className="font-bold">70 fts</p>

    </div>
    </div>
    <h3 class="w-full capitalize font-bold py-2 flex-none mb-3 text-lg leading-none text-slate-900">
      {item?.propertyType}
      </h3>
    </div>
    </div>
  )
}

export default PropertyDescription
