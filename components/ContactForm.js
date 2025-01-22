import React, { useEffect, useState } from 'react'
import {useClient, useCurrentUser} from 'sanity'
import {useUserListWithPermissions} from 'sanity'
// import AuthorInput from '../utils/helper/AutherInput'
import usersHandler from '/src/sanity/lib/users'
import SanityClient from '/src/sanity/lib/client'
import Image from 'next/image'

const client = SanityClient();

const fetchMembers = async () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;

  if (!projectId || !token) {
    console.error('Error: Sanity projectId or token not found');
    return [];
  }

  try {
    const headers = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const url = `https://api.sanity.io/v2021-06-07/projects/${projectId}`;

    // Fetch the data
    const response = await fetch(url, headers);

    if (!response.ok) {
      throw new Error(`Failed to fetch members: ${response.statusText}`);
    }

    const data = await response.json();
    const members = data.members || []; 
    const memberIds = members.map(member => member.id);
    return memberIds; // Return the list of member ids
  } catch (error) {
    return []; 
  }
};



const fetchUserDetails = async (userId) => {
  const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;
  
  if (!token) {
    return null;
  }

  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const url = `https://api.sanity.io/v2021-06-07/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/users/${userId}`;

    // Fetch the data
    const response = await fetch(url, { method: 'GET', headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch user details: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.loginProvider === 'sanity-token') {
      return null
        }
    return data;
  } catch (error) {
    return null; 
};
}

const fetchMembersDetails = async () => {
  const memberIds = await fetchMembers(); // Assuming this function is defined
  const userDetails = [];

  for (let id of memberIds) {
    const details = await fetchUserDetails(id); // Assuming fetchUserDetails is defined
    if (details) {
      userDetails.push(details);
    }
  }
  return userDetails;
};

// ContactForm component
export default function ContactForm() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      const userDetails = await fetchMembersDetails();
      setMembers(userDetails); // Set the member data to state
    };

    loadMembers();
  }, []); // Empty dependency array means this will run only once after the initial render
const profile = members[0]
  return (
    <>
  
      <form className="w-full lg:max-w-lg bg-white">
       
      <div className='mb-10 flex gap-10 j'>
     {members.length > 0 && (
          <Image
            src={profile?.imageUrl}  // Assuming imageUrl exists in member details
            alt="Profile Picture"
            width={500}
            height={500}
            className="rounded-full w-24 h-24  mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
          />
        )}
        <div>
        <p className='capitalize pt-5'>{profile?.displayName.toLowerCase()}</p>
        <p>View Listings</p>
      </div></div>
        {/* Contact form fields */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
               Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
             id="name" type="text" placeholder="Jane" />
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          </div>
          
        
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
               Phone Number
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="phone" type="text" placeholder="+233********" />
          </div>
          
        
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
               I am
            </label>
            <select className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' name="status" id="status">
          
          <option value="buyer">I'm a buyer</option>
          <option value="tennant">I'm a Tennant</option>
          <option value="seeker">I'm a Seeker</option>
          <option value="other">Other</option>
          </select>
          </div>
                    
        
          </div>
        {/* Additional form fields */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="..@gmail.com" />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        {/* More form fields go here */}
      </form>
    </>
  );
}
