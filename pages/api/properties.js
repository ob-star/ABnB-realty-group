import SanityClient from '../../src/sanity/lib/client';

const client = SanityClient();

export default async function handler(req, res) {
  const { page = 1 } = req.query;
  const limit = 5;
  const start = (page - 1) * limit;

  const query = `
    *[_type == "property" && category == 'residential'] | order(_createdAt desc) [${start}...${start + limit}] {
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
    }
  `;

  try {
    const data = await client.fetch(query);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
}
