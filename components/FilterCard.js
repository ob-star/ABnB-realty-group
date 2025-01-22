import React from 'react'
import { useRouter } from "next/router";
import { useState } from 'react';
import Link from 'next/link';

function FilterCard() {
    const router =useRouter()
    const [filters, setFilters] = useState({
      propertyType: "",
      country: "",
      location: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      status: "",
      category:"",
    });
    const handleFilterChange = (key, value) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
  
    };
  
    const applyFilters = () => {
      router.push({
        pathname: "/properties",
        query: { ...filters },
      });
    };
   
  return (
    <div>
       <div className="w-full lg:max-w-5xl container mx-auto  bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className=' flex flex-wrap gap-10'>
          <div className="mb-4">
            <label className="block mb-2">Property Type</label>
            <select
              className="w-full border p-2 rounded"
              value={filters.propertyType}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            >
              <option value="">Any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Property Category</label>
            <select
              className="w-full border p-2 rounded"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">Any</option>
              <option value="commercial">commercial</option>
              <option value="residential">residential</option>
              <option value="land">lands</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Bedrooms</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Number of bedrooms"
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
            />
          </div>

         

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              className="w-full border p-5 rounded"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

        
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                className=" w-1/2 border p-5 rounded"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <input
                type="number"
                className="w-1/2 border p-5 rounded"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
            <Link prefetch
            className="max-w-5xl px-4 bg-yellow-500 text-white mt-5 p-2 rounded hover:bg-yellow-600"
            href={{
                pathname: "/properties",
                query: { ...filters },
              }}
          >
            Search
          </Link>
          </div>
        </div>
    </div>
  )
}

export default FilterCard
