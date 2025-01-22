import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import type {ConfigContext} from 'sanity'

export const propertyType = defineType({
    
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'price',
      type: 'object',
      title: 'Price',
      fields: [
        defineField({
          name: 'min',
          type: 'string',
          title: 'Minimum Price',
        }),
        defineField({
          name: 'max',
          type: 'string',
          title: 'Maximum Price',
        }),
        defineField({
          name: 'currency',
          type: 'string',
          title: 'Currency',
          options: {
            list: [
              {title: 'GHS', value: 'GHS'},
              {title: 'USD', value: 'USD'},
              {title: 'EUR', value: 'EUR'},
              {title: 'GBP', value: 'GBP'},
            ],
            layout: 'radio',
          },
        }),
      ],
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Industrial', value: 'industrial'},
          {title: 'Land', value: 'land'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
        name: 'featured',
        type: 'boolean',
        title: 'Feature this in the slideshow',
      }),
    defineField({
      name: 'propertyType',
      type: 'string',
      title: 'Property Type',
      options: {
        list: [
          {title: 'Apartment', value: 'apartment'},
          {title: 'House', value: 'house'},
          {title: 'Villa', value: 'villa'},
          {title: 'Studio', value: 'studio'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'propertyStatus',
      type: 'string',
      title: 'Property Status',
      options: {
        list: [
          {title: 'For Sale', value: 'For Sale'},
          {title: 'For Rent', value: 'For Rent'},
          {title: 'Sold', value: 'sold'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
        name: 'desc',
        type: 'blockContent',
        title: 'description',
      }),
    defineField({
        name: 'createdBy',
        title: 'Created By',
        type: 'string',
        initialValue: (param, ConfigContext) => ConfigContext.currentUser?.name || '',
        readOnly: true,
      }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [defineArrayMember({type: 'image'})],
    }),
    defineField({
      name: 'yearBuilt',
      type: 'string',
      title: 'Year Built',
    }),
    defineField({
      name: 'address',
      type: 'object',
      title: 'Address',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Address Name',
        }),
        defineField({
          name: 'city',
          type: 'string',
          title: 'City',
        }),
        defineField({
          name: 'state',
          type: 'string',
          title: 'State',
        }),
        defineField({
          name: 'country',
          type: 'string',
          title: 'Country',
        }),
      ],
    }),
   
    defineField({
      name: 'size',
      type: 'object',
      title: 'Size',
      fields: [
        defineField({
          name: 'width',
          type: 'string',
          title: 'Width',
        }),
        defineField({
          name: 'depth',
          type: 'string',
          title: 'Depth',
        }),
        defineField({
          name: 'bedrooms',
          type: 'number',
          title: 'Number of Bedrooms',
        }),
        defineField({
          name: 'bathrooms',
          type: 'number',
          title: 'Number of Bathrooms',
        }),
        defineField({
          name: 'rooms',
          type: 'number',
          title: 'Total Rooms',
        }),
        defineField({
          name: 'garage',
          type: 'boolean',
          title: 'Has Garage',
        }),
        defineField({
          name: 'garageSize',
          type: 'string',
          title: 'Garage Size',
        }),
      ],
    }),
    defineField({
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      media: 'images.0',  // First image as media preview
    },
    prepare(selection) {
      const {location} = selection
      return {...selection, subtitle: location && `Location: ${location}`}
    },
  },
})
