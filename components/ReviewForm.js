import React, { useEffect, useState } from 'react'
import {useClient, useCurrentUser} from 'sanity'
import {useUserListWithPermissions} from 'sanity'
// import AuthorInput from '../utils/helper/AutherInput'
import usersHandler from '/src/sanity/lib/users'
import SanityClient from '/src/sanity/lib/client'
import Image from 'next/image'

const client = SanityClient();



// ContactForm component
export default function ReviewForm() {
 
  return (
    <>
  
      <form className="  px-4 container  w-full items-center justify-center flx flex-col bg-[#f1eddf] mt-[50px] ">
       
       
      <h2 className='text-[25px] my-5 ' >Leave A Review</h2>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
               Name
            </label>
            <input className="appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
             id="name" type="text" placeholder="Jane" />
          </div>
          
        
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input className="appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
            id="title" type="text" placeholder="Enter title" />
          </div>
          
        
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="..@gmail.com" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
               Review
            </label>
            <textarea className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-64' placeholder="Enter review" />
          
          </div>
                    
        
          </div>
       
      </form>
    </>
  );
}
