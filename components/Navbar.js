import React, { useState } from "react";
import { MapPin, MessageCircle, X } from "lucide-react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {  MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { StoreIcon, UserCircle, UserIcon } from 'lucide-react'
import {Menu } from '@headlessui/react'
// import { Signin } from '../utils/helpers/Email/signIn'

import SignOut from '../utils/helper/EmailSignOut'

function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    {  name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Book Us", path: "/book-us" },
    // {name:'Contact',path:'/contact'},
    { name: "Donation", path: "/donation" },
    { name: "Price Calculator", path: "/calculator" },
  ];

  return (
    <nav
      onScroll={() => setIsScrolled(true)}
      className={`sticky z-50 top-0 cursor-pointer ${
        isOpen ? "w-50 " : "w-full"
      } md:w-full bg-[#042144] lg:bg-none z-50 transition-all m-0 p-0 text-[18px]  bgyellow-600  duration-300 ${
        isScrolled ? " shadow-md text-yellow-900" : " text-white  "
      }`}
    >
      <div className=" px-4 sm:px-0">
        <div className="flex lg:flex-col text-center justify-between  items-center">
          <div  className="flex lg:flex-wrap bg lg:bg-[#042144] text-[14px]  h-[100px]  items-center text-center border-none justify-around gap-5  lg:px-52  lg:w-full">
            <Link
              href="/"
              className="flex gap-3 items-center justify-center h-16 decoration-none :"
            >
              <Image
                alt="logo"
                src="/images/logo.jpg"
                height={200}
                width={200}
                className="w-[40px] h-[40px] rounded-full "
              />
              <span
                className={`font-bold text-[25px]  ${
                  isScrolled ? "" : "text-white"
                }`}
              >
                ABnB Realty Group
              </span>
            </Link>
            <div className="hidden lg:flex items-center justify- h-16 decoration-none first-letter:">
              <div className="flex gap-5">
                <MapPin color="yellow" size={40} />
                <div className="flex flex-col text-left">
                  <h2>24 Wood End Way,</h2>
                  <span className={`  ${isScrolled ? "" : "text-white"}`}>
                    Accra Ghana
                  </span>
                </div>
              </div>
            </div>

            <div
              href="/"
              className="hidden lg:flex items-center justify-center h-16 decoration-none first-letter:"
            >
              <div className="flex gap-5">
                <MessageCircle color="yellow" size={40} />

                <div className="flex flex-col text-left">
                  <h2>NEED US</h2>
                  <span className={`  ${isScrolled ? "" : "text-white"}`}>
                    ABnBgroup@gmail.com
                  </span>
                </div>
              </div>
            </div>

            <div
              href="/"
              className="hidden lg:flex items-center justify-center h-16 decoration-none first-letter:"
            >
              <div className="flex gap-5">
                <div className="flex flex-col text-left">
                  <h2>CALL US ON</h2>
                  <span
                    className={`  ${
                      isScrolled ? "" : "text-yellow-500"
                    } text-[20px]`}
                  > 
                    +233274783771
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden border  w-full items-center justify-center mx-auto px-4 sm:px-6 h-16 bg-white gap-10  md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                prefetch
                href={link.path}
                className={` ${
                  pathname === link.path
                    ? "text-yellow-900 font-semibold"
                    : " hover:text-yellow-500 hover:font-bold"
                } transition-colors text-black text-[14px] duration-200`}
              >
                {link.name}
              </Link>
            ))}


          </div>
          <div className=" md:hidden ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-700"
            >
              {isOpen ? <X size={24} /> :<MenuIcon size={30} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="flex md:hidden w-50   ">
            <div className="px-2 pt-2 pb-3 space-y-1  rounded-lg  right-0 w-50">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  prefetch
                  className={`w-50 ${
                    pathname === link.path
                      ? " bg-blue-50 text-yellow-600"
                      : "text-white "
                  } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

            </div>
          </div>
        )}
      </div>
      <Menu >
      <MenuButton><UserCircle size={40} /> </MenuButton>
      <MenuItems anchor="bottom" className='mt-3 bg-blue-700 text-black gap-10 p-4'>
        {<MenuItem>
        <Link href={'/profile'} className='py-2' >
          Profile
                    </Link>
        </MenuItem> }

        {<MenuItem>  
        <button onClick={SignOut} className="block data-[focus]:bg-blue-100 mt-2" >
            LogOut
          </button>
          
        </MenuItem>
        }
       
      </MenuItems>
    </Menu>
    </nav>
  );
}

export default Navbar;
