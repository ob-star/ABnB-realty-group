// pages/properties.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SanityClient from '../../src/sanity/lib/client';
import sanityImgUrlBuilder from "../../src/sanity/lib/image";
import ImageCard from "../../components/ImageCard";
import PropertyDescription from "../../components/PropertyDescription";

const client = SanityClient();

const Properties = ({ initialData }) => {
  const router = useRouter();
  const { query } = router;

  const [filters, setFilters] = useState({
    propertyType: query.propertyType || "",
    country: query.country || "",
    location: query.location || "",
    bedrooms: query.bedrooms || "",
    minPrice: query.minPrice || "",
    maxPrice: query.maxPrice || "",
    status: query.status || "",
    category:query.category ||"",

  });
  const [filteredProperties, setFilteredProperties] = useState(initialData);

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
  useEffect(() => {
    const fetchFilteredData = async () => {
      const query = `
        *[_type == "property" 
          && (propertyType match $propertyType || $propertyType == "") 
           && (category match $category || $category == "") 
          && (size.bedrooms match $bedrooms || $bedrooms =="") 
          && (propertyStatus match $status || $status == "")



       
          ] {
            title, price, size, images, propertyStatus, yearBuilt, address, featured, slug, category,propertyType
        }
      `;
      const params = {
        ...filters,
        minPrice: filters.minPrice || 0,
        maxPrice: filters.maxPrice || 1000000,
        bedrooms: filters.bedrooms,
      };
      const results = await client.fetch(query, params);
      setFilteredProperties(results);
    };

    fetchFilteredData();
  }, [router.query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

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
            <label className="block mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-1/2 border p-2 rounded"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <input
                type="number"
                className="w-1/2 border p-2 rounded"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              className="w-full border p-2 rounded"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <button
            className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            onClick={applyFilters}
          >
            Search
          </button>
        </div>

        {/* Properties List */}
        <div className="w-full ">
          <div className="mb-4 text-gray-600">
            {filteredProperties.length} Results Found
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.slug.current} className="border rounded-lg overflow-hidden">
                {property.featured && (
                  <span className="text-white bg-red-500 px-2 py-1 text-sm rounded-full absolute top-4 right-4">
                    Featured
                  </span>
                )}
                <div                   className="w-full object-cover mb-5"
                >
                <ImageCard item={property} />
                </div>
               <PropertyDescription item={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const query = `
    *[_type == "property"]{
            title, price, size, images, propertyStatus, yearBuilt, address, featured, slug, category,propertyType
        }
  `;
  const initialData = await client.fetch(query);

  return {
    props: {
      initialData,
    },
  };
}

export default Properties;
