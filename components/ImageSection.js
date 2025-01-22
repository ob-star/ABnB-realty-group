
import Link from 'next/link';
import Image from 'next/image';
import NewsCard from './NewsCard';
import ImageCard from './ImageCard';
import PropertyDescription from './PropertyDescription';

function ImageSection({ data, noItem, tag, arrows }) {
  // Group and sort articles by tag, date, and time
  return (
    <div className="lg:grid lg:grid-cols-3 mt-10 container mx-auto  gap-5">
      {data.map((category, index) => (
    <div key={index} className="mb-8 gap-5">
      
            
          <ImageCard item={category} noItem={noItem} address={`news`} tag={category.title.toLowerCase()}/>
          <PropertyDescription item={category} />
        </div>
     
      ))}
    </div>
  );
}

export default ImageSection;
