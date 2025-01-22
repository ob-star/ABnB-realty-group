import SanityClient from '../../../src/sanity/lib/client';
import { useRouter } from 'next/router';
import sanityImgUrlBuilder from '../../../src/sanity/lib/image'
import Image from 'next/image';
import ContactForm from '../../../components/ContactForm'
import { useState } from 'react';
import { MapPin, MessageCircle, X } from "lucide-react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { PiWhatsappLogo } from 'react-icons/pi';
import { MdEmail } from 'react-icons/md';
import ReviewForm from '../../../components/ReviewForm'

const client = SanityClient();

export default function PropertyDetails({ property, category }) {
  const [isOpen, setIsOpen] =useState(false)
  const router = useRouter();
  // if (!property) {
  //   return <div className="text-center py-20 text-xl">Property not found</div>;
  // }
  // const grid =`grid-cols-${len}`
  // console.log(grid,len)
  const len =(property?.images?.length)-1


  const getGridClass =()=>{
    switch(len){
      case 1:
        return 'lg:grid'
      case 2:
        return "lg:grid-cols-2"
      case 3:
      return  "lg:grid-cols-3"
    }
  }


  return (
    <div className="  bg-orange-300  ">
      
      <main className=" lg:mx-auto bg-white shadow-md rounded-lg z-0 h-screen overflow-y-scroll">
         <div className='lg:h-[600px]'>
          <Image height={600}
          width={800}
          
            src={sanityImgUrlBuilder(property.images[0]?.asset?._ref).width(800).url() }
            alt="" className="w-full px-4  lg:px-10 h-[500px] object-cover " loading="lazy"
            
            />

            </div>
    <div className='  lg:gap-16 grid lg:grid-cols-12'>
      <div className='lg:col-span-9 p-4 lg:container bg-white'>
       <div className={` grid  gap-5 ${len ? getGridClass() : grid}`}>
        {property?.images.slice(1)?.map((image,index)=>(
            <Image height={500} width={500} key={index}
            src={sanityImgUrlBuilder(image?.asset?._ref).width(700).url() }
            alt="" className=" h-[300px] sm:h-[300px]  rounded-3xl" loading="lazy"
            
            />

        ))}
        </div>
        <div className="p-6 ">
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <p className="text-gray-700 text-lg mb-6">{property.description }</p>
          <div className="overflow-x-auto">
      <table className=" table-auto border-collapse lg:container">
       
        <tbody>
          
            <tr>
              <td className="text-left px-4 py-2 border-b">Address</td>
              <td className="text-left px-4 py-2 border-b">{property.address.name}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 border-b">City</td>
              <td className="text-left px-4 py-2 border-b">{property.address.city}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 border-b">Country</td>
              <td className="text-left px-4 py-2 border-b">{property.address.country}</td>
            </tr>
        </tbody>
      </table>
        <p className='mt-10 mb-5 font-bold text-[20px]'> Property Details </p>
      <table className=" table-auto border-collapse container">
       
       <tbody>
         
           <tr>
             <td className="text-left px-4 py-2 border-b">Property Name</td>
             <td className="text-left px-4 py-2 border-b">{property.title}</td>
           </tr>
           <tr>
             <td className="text-left px-4 py-2 border-b">Property Type</td>
             <td className="text-left px-4 py-2 border-b">{property.propertyType}</td>
           </tr>
           <tr>
             <td className="text-left px-4 py-2 border-b">size</td>
             <td className="text-left px-4 py-2 border-b">  {property.size.width } {property.size.depth } sqft

             </td>

             </tr>
             <tr>
             <td className="text-left px-4 py-2 border-b">Rooms</td>
             <td className="text-left px-4 py-2 border-b">{property.size.rooms }</td>

             </tr>
             <tr>
             <td className="text-left px-4 py-2 border-b">BathRooms</td>
             <td className="text-left px-4 py-2 border-b">{property.size.bathrooms }</td>

             </tr>
             <tr>
             <td className="text-left px-4 py-2 border-b">Year Build</td>
             <td className="text-left px-4 py-2 border-b">{property.yearBuilt }</td>

             </tr>
          </tbody>
          
  
     </table>
    </div>

        </div>
        <ReviewForm />

       </div>
       <aside  className='hidden lg:flex   center-0 bottom-0   lg:col-span-3 boarder bg-white'>
        <ContactForm />
        </aside>
        </div>
        <div className="flex right-0 gap-10 my-10 px-4 justify-end bg-white sticky z-50 bottom-0 ">
    <MdEmail size={50} color='orange' onClick={()=> setIsOpen(!isOpen)} className='lg:hidden' />
      <PiWhatsappLogo   size={50} color='green'/>
    </div>
    {/* {    isOpen &&    <ContactForm  />
    } */}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Send Emails</DialogTitle>
            <ContactForm  />         
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(true)}>Send Email</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      </main>
    </div>
  );
}
export async function getStaticProps({ params }) {
    const { category, id } = params;
    console.log(id,'id')
    const query = `
      *[_type == "property" && category == "${params.category}" &&  slug.current == "${params.id}"] {
        title,
        description,
        price,
        propertyType,
        size,
        yearBuilt,
        propertyStatus,
        images,
        address,
      }
    `;
    
    const property = await client.fetch(query);
  

    return {
      props: {
        property:property[0],
        category:category,
      },
      revalidate: 60,
    };
  }
  
  export async function getStaticPaths() {
    const property = await client.fetch(`*[_type == "property"]`);
    const paths = property.map((data) => ({
      params: { category: data.category, id: data.slug.current.toString() }, // Ensure IDs are strings
    }));
    return { paths, fallback: 'blocking' };
  }

  