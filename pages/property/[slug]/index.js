import { useState } from 'react';
import SanityClient from '../../src/sanity/lib/client';
import ImageSection from '../../components/ImageSection';
import TitledContent from '../../components/TitledContent';

const client = SanityClient();

export default function PropertyPage({ propertyData, relatedData, initialPageData, totalPages }) {
  const [relatedProperties, setRelatedProperties] = useState(initialPageData);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setLoading(true);
      const nextPage = currentPage + 1;
      const startIndex = nextPage * 10;
      const nextPageData = relatedData.slice(startIndex, startIndex + 10); // Paginate locally
      setRelatedProperties((prev) => [...prev, ...nextPageData]);
      setCurrentPage(nextPage);
      setLoading(false);
    }
  };

  const loadless = async () => {
    if (currentPage < totalPages) {
      setLoading(true);
      const nextPage = currentPage + 1;
      const startIndex = nextPage * 10;
      const nextPageData = relatedData.slice(startIndex, startIndex - 10); 
      setRelatedProperties((prev) => [...prev, ...nextPageData]);
      setCurrentPage(nextPage);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <main>
        <section className="bg-gray-200 p-5">
          <h1 className="text-4xl font-bold">{propertyData.title}</h1>
          <p>{propertyData.description}</p>
          <div className="mt-5">
            <img
              src={propertyData.images?.[0]?.url || '/placeholder.jpg'}
              alt={propertyData.title}
              className="w-full max-h-96 object-cover"
            />
          </div>
          <div className="mt-5">
            <h2>Details:</h2>
            <p>Price: {propertyData.price}</p>
            <p>Address: {propertyData.address}</p>
            <p>Size: {propertyData.size} sq ft</p>
            <p>Year Built: {propertyData.yearBuilt}</p>
          </div>
        </section>

        <TitledContent
          title="Related Properties"
          desc="Explore more properties you might like."
        />

        <ImageSection articles={relatedProperties} />

        {currentPage < totalPages && (
          <div className="text-center mt-6">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const query = `
    *[_type == "property"] | order(_createdAt desc) {
      propertyStatus,
      size,
      featured,
      slug,
      yearBuilt,
      createdBy,
      images,
      address,
      propertyType,
      title,
      description,
      price,
      category,
      _createdAt
    }
  `;
  const allProperties = await client.fetch(query);

  const propertyData = allProperties.find((item) => item.slug.current === slug);

  if (!propertyData) {
    return {
      notFound: true,
    };
  }

  const relatedData = allProperties.filter(
    (item) => item.category === propertyData.category && item.slug.current !== slug
  );

  const limit = 10;
  const initialPageData = relatedData.slice(0, limit); 
  const totalPages = Math.ceil(relatedData.length / limit);

  return {
    props: {
      propertyData,
      relatedData, 
      initialPageData, 
      totalPages, 
    },
    revalidate: 60, 
  };
}

export async function getStaticPaths() {
  const query = `*[_type == "property"].slug.current`;
  const slugs = await client.fetch(query);

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking', 
  };
}
