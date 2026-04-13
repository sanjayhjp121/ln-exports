import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "finish",
      title: "Available Finishes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Polished", value: "Polished" },
          { title: "Honed", value: "Honed" },
          { title: "Brushed", value: "Brushed" },
          { title: "Sandblasted", value: "Sandblasted" },
          { title: "Leathered", value: "Leathered" },
          { title: "Flamed", value: "Flamed" },
          { title: "Natural Split", value: "Natural Split" },
          { title: "Bush Hammered", value: "Bush Hammered" },
        ],
      },
    }),
    defineField({
      name: "availableSizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      description: 'E.g. "60x60 cm", "30x60 cm", "Custom"',
    }),
    defineField({
      name: "thickness",
      title: "Thickness",
      type: "array",
      of: [{ type: "string" }],
      description: 'E.g. "18mm", "20mm", "30mm"',
    }),
    defineField({
      name: "origin",
      title: "Origin / Country",
      type: "string",
      description: "Country or region of origin",
    }),
    defineField({
      name: "color",
      title: "Colour Family",
      type: "string",
      options: {
        list: [
          { title: "White", value: "White" },
          { title: "Beige", value: "Beige" },
          { title: "Grey", value: "Grey" },
          { title: "Black", value: "Black" },
          { title: "Brown", value: "Brown" },
          { title: "Green", value: "Green" },
          { title: "Blue", value: "Blue" },
          { title: "Red / Pink", value: "Red" },
          { title: "Yellow / Gold", value: "Yellow" },
          { title: "Multicolor", value: "Multicolor" },
        ],
      },
    }),
    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Flooring", value: "Flooring" },
          { title: "Wall Cladding", value: "Wall Cladding" },
          { title: "Countertops", value: "Countertops" },
          { title: "Stairs", value: "Stairs" },
          { title: "Bathroom", value: "Bathroom" },
          { title: "Exterior", value: "Exterior" },
          { title: "Pool Coping", value: "Pool Coping" },
          { title: "Landscaping", value: "Landscaping" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Show on home page featured section",
      initialValue: false,
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "inspirationGallery",
      title: "Inspiration Gallery",
      type: "array",
      description: "Photos showing this product installed in real spaces — kitchens, bathrooms, lobbies, facades, etc.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: 'E.g. "Modern kitchen island with waterfall edge"',
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "images.0",
    },
  },
  orderings: [
    {
      title: "Name A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [{ field: "featured", direction: "desc" }],
    },
  ],
});
