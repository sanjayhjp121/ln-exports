import { groq } from "next-sanity";

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    description,
    image,
    order
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(featured desc, title asc) {
    _id,
    title,
    slug,
    featured,
    inStock,
    origin,
    color,
    finish,
    applications,
    availableSizes,
    "images": images[0..1],
    "category": category->{_id, title, slug}
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(featured desc, title asc) {
    _id,
    title,
    slug,
    featured,
    inStock,
    origin,
    color,
    finish,
    applications,
    availableSizes,
    "images": images[0..1],
    "category": category->{_id, title, slug}
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(title asc) [0..7] {
    _id,
    title,
    slug,
    origin,
    color,
    finish,
    "images": images[0..0],
    "category": category->{_id, title, slug}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    featured,
    inStock,
    origin,
    color,
    finish,
    availableSizes,
    thickness,
    applications,
    seoDescription,
    images[] {
      ...,
      alt,
      caption
    },
    inspirationGallery[] {
      ...,
      alt,
      caption
    },
    "category": category->{_id, title, slug}
  }
`;

export const allProductSlugsQuery = groq`
  *[_type == "product"] { "slug": slug.current }
`;

export const relatedProductsQuery = groq`
  *[_type == "product" && category._ref == $categoryId && slug.current != $currentSlug] | order(featured desc) [0..3] {
    _id,
    title,
    slug,
    origin,
    "images": images[0..0],
    "category": category->{_id, title, slug}
  }
`;
