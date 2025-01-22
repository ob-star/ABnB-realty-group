import { useState } from 'react';
import SanityClient from '../../src/sanity/lib/client';
import ImageSection from '../../components/ImageSection';
import TitledContent from '../../components/TitledContent';

const client = SanityClient();

export default function CategoryPage({ categoryData, category, totalPages }) {
  const [articles, setArticles] = useState(categoryData.initialPageData);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (currentPage < totalPages) {
      setLoading(true);
      const nextPage = currentPage + 1;
      const startIndex = currentPage * categoryData.limit;
      const nextPageData = categoryData.allItems.slice(startIndex, startIndex + categoryData.limit);
      setArticles((prevArticles) => [...prevArticles, ...nextPageData]);
      setCurrentPage(nextPage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <main>
        <section className="w-screen h-[40vh] flex flex-col justify-center items-center bg-black/50 bg-blend-multiply bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(/images/category.jpg)`,
          }}
        >
          <h1 className="py-4 text-white font-nexa text-[36px] text-center md:text-[48px] px-4 container mx-auto font-bold">
            {category.charAt(0).toUpperCase() + category.slice(1)} Properties
          </h1>
        </section>
        <section className="md:col-span-9 mt-10 mx-3">
          <TitledContent
            title={`Explore ${category} Listings`}
            desc={`Discover our curated collection of ${category.toLowerCase()} properties.`}
          />
          <ImageSection articles={articles} />
          {currentPage < totalPages && (
            <div className="text-center mt-6">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const limit = 5;

  const query = `
    *[_type == "property" && category == $category] | order(_createdAt desc) {
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
      price,
      category,
      _createdAt
    }
  `;
  const allItems = await client.fetch(query, { category });

  if (!allItems.length) {
    return {
      notFound: true,
    };
  }

  const initialPageData = allItems.slice(0, limit);
  const totalPages = Math.ceil(allItems.length / limit);

  return {
    props: {
      category,
      categoryData: {
        allItems,
        initialPageData,
        limit,
      },
      totalPages,
    },
    revalidate: 60, 
  };
}

export async function getStaticPaths() {
  const query = `*[_type == "property"].category`;
  const categories = await client.fetch(query);
  const uniqueCategories = [...new Set(categories)];

  const paths = uniqueCategories.map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: 'blocking', 
  };
}
