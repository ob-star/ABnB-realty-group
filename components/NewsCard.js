import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import sanityImgUrlBuilder from '/src/sanity/lib/image'

function NewsCard({data,tag}) {
  return (
    <div className="my10 grid md:grid-cols-3 gap-3">
   {data.images.map((image,index)=>(
        <div className=" text-black rounded-3xl  flex justify-center items-center ">
         
    {/* <div className="-0">

        <Image src={image} height={600}  width={700} key={index} className=" text-black w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full  "/>
</div> */}
<div className="max-w-4xl mx-auto grid grid-cols-1 lg:w-full  ">
    <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/25 via-black/0 sm:row-start-2 sm:p-0 lg:row-start-1">
      <h1 className="mt-1 text-lg font-semibold text-white  md:text-xl py-10 px-2 dark:sm:text-white">{item.price.min} - {item.price.max} {item.price.currency}</h1>
    </div>
    <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 lg:gap-6   lg:mb-0" style={{ ...divStyle,}}>
      <Image height={500} width={500} src={image} alt="" className="w-full h-[300px] sm:h-[400px] object-cover rounded-3xl" loading="lazy"/>
    </div>
  <div className="relative p-3 col-start-1 row-start-1 flex  py-3 justify-between rounded-lg bg-gradient-to-t from-black/25 via-black/5 sm:bg-none sm:p-0 lg:row-start-1">
      <h1 className="mt-1 h-fit text-lg font-semibold text-white bg-orange-600  md:text-xlpx-2  px-2"> featured</h1>
     <div className="flex gap-5">
     <h1 className="mt-1 text-lg font-semibold h-fit text-white bg-black/20  md:text-xlpx-2 px-2 "> For Sale</h1>

      <h1 className="mt-1 text-lg font-semibold h-fit text-white    bg-black/25 md:text-xlpx-2  px-2"> Hot Offer</h1>
</div>
    </div>
  

  </div>
        </div>
      ))}
    </div>
  )
}

export default NewsCard
