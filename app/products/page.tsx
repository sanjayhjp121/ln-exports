import { Suspense } from "react";
import { client, isConfigured } from "@/sanity/lib/client";
import { allProductsQuery, allCategoriesQuery } from "@/sanity/lib/queries";
import { ProductSummary, Category } from "@/types";
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

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page header — navy from logo */}
      <div className="bg-[#1B2A5E] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-red-300 text-xs tracking-[0.3em] uppercase font-medium mb-3">Our Collection</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Stone Catalog</h1>
          <p className="text-blue-100/70 mt-2 text-sm">
            {products.length > 0 ? `${products.length} products available` : "Connecting to catalog..."}
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-stone-400">Loading catalog...</div>}>
        <CatalogClient products={products} categories={categories} />
      </Suspense>
    </div>
  );
}
