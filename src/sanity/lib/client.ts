import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
const SanityClient = () => {
  return createClient({
  // projectId: "c2998mc1",
  projectId,
  dataset,
  apiVersion: "2022-10-21",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
};
export default SanityClient;
// projectId: "c2998mc1",
