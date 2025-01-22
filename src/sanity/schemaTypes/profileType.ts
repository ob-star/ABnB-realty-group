import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const profileType = defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    icon: UserIcon,
    fields: [
      defineField({
        name: 'name',
        type: 'string',
        readOnly:true
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        options: {
          source: 'name',
        },
      }),
      defineField({
        name: 'email',
        type: 'string',
        readOnly:true
      }),
      defineField({
        name: 'profilePicture',
        title:'Profile Picture',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'bio',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'block',
            styles: [{title: 'Normal', value: 'normal'}],
            lists: [],
          }),
        ],
      }),
    ],
   
  
    preview: {
      select: {
        title: 'name',
        media: 'image',
      },
    },
  })
  