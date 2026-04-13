import { Suspense } from "react";
import { client, isConfigured } from "@/sanity/lib/client";
import { allProductsQuery, allCategoriesQuery } from "@/sanity/lib/queries";
import { ProductSummary, Category } from "@/types";
import { PLACEHOLDER_PRODUCTS, PLACEHOLDER_CATEGORIES } from "@/lib/placeholder-data";
import CatalogClient from "./CatalogClient";

export const revalidate = 60;

export const metadata = {
  title: "Stone Catalog",
  description: "Browse our full catalog of marble, granite, sandstone, quartzite and more natural stones.",
};

export default async function ProductsPage() {
  let products: ProductSummary[] = [];
  let categories: Category[] = [];

  if (isConfigured) {
    try {
      [products, categories] = await Promise.all([
        client.fetch(allProductsQuery),
        client.fetch(allCategoriesQuery),
      ]);
    } catch {
      // CMS fetch error
    }
  }

  if (products.length === 0) {
    products = PLACEHOLDER_PRODUCTS as unknown as ProductSummary[];
    categories = PLACEHOLDER_CATEGORIES;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page header */}
      <div className="bg-brand-navy py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-label text-xs uppercase tracking-[0.4em] text-primary-fixed-dim font-bold">Our Collection</span>
          <h1 className="font-headline text-4xl md:text-5xl text-white mt-3">Stone Catalog</h1>
          <p className="text-white/60 mt-3 font-light text-lg max-w-xl">
            Browse {products.length} premium products across {categories.length} categories — from heritage quarry stones to engineered surfaces.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-stone-400">Loading catalog...</div>}>
        <CatalogClient products={products} categories={categories} />
      </Suspense>
    </div>
  );
}
