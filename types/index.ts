import { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  _key?: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
  caption?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: SanityImage;
  order?: number;
}

export interface ProductSummary {
  _id: string;
  title: string;
  slug: { current: string };
  featured: boolean;
  inStock: boolean;
  origin?: string;
  color?: string;
  finish?: string[];
  applications?: string[];
  availableSizes?: string[];
  images: SanityImage[];
  category: {
    _id: string;
    title: string;
    slug: { current: string };
  };
}

export interface Product extends ProductSummary {
  description?: PortableTextBlock[];
  thickness?: string[];
  seoDescription?: string;
}
