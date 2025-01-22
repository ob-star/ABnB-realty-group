import { PortableText } from '@portabletext/react';
import sanityImgUrlBuilder from '/src/sanity/lib/image'
const PortableTextComponents = {
  types: {
    // Handle images
    image: ({ value }) => (
      <div className="my-4">
        <img
          src={sanityImgUrlBuilder(value.asset._ref).width(800).height(500).url()}
          alt={value.alt || 'Image'}
          className="w-[500px] rounded-md"
        />
        {value.alt && <p className="text-sm text-gray-500">{value.alt}</p>}
      </div>
    ),
  },
  block: {
    // Headings
    h1: ({ children }) => <h1 className="text-3xl font-bold my-5 font-sans">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium my-5">{children}</h3>,
    p: ({ children }) => <p className="text-xl font-medium my-5 leading-5 tracking-wider">{children}</p>,

    // Normal paragraphs
    normal: ({ children }) => <p className="my-5 leading-10 text-[18px]  text-gray-800">{children}</p>,
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="pl-4 border-l-4 leading-5 text-pretty border-gray-500 italic text-gray-600 my-2">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Links
    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export default PortableTextComponents