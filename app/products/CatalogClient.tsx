"use client";

import { useState, useMemo } from "react";
import { ProductSummary, Category } from "@/types";
import ProductCard from "@/components/ProductCard";

const COLOR_OPTIONS = ["White", "Beige", "Grey", "Black", "Brown", "Green", "Blue", "Red", "Yellow", "Multicolor"];
const FINISH_OPTIONS = ["Polished", "Honed", "Brushed", "Sandblasted", "Leathered", "Flamed", "Natural Split"];

interface CatalogClientProps {
  products: ProductSummary[];
  categories: Category[];
}

export default function CatalogClient({ products, categories }: CatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedFinish, setSelectedFinish] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category?.slug?.current === selectedCategory;
      const matchesColor =
        selectedColor === "all" || p.color === selectedColor;
      const matchesFinish =
        selectedFinish === "all" || (p.finish && p.finish.includes(selectedFinish));
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.origin && p.origin.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesColor && matchesFinish && matchesSearch;
    });
  }, [products, selectedCategory, selectedColor, selectedFinish, searchQuery]);

  const hasFilters = selectedCategory !== "all" || selectedColor !== "all" || selectedFinish !== "all" || searchQuery;

  function clearFilters() {
    setSelectedCategory("all");
    setSelectedColor("all");
    setSelectedFinish("all");
    setSearchQuery("");
  }

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-10">
          <div className="text-4xl mb-4">🪨</div>
          <h2 className="text-lg font-semibold text-stone-800 mb-2">No products found</h2>
          <p className="text-stone-500 text-sm">
            Add your Sanity project ID to <code className="bg-stone-100 px-1 py-0.5 rounded text-xs">.env.local</code> and start adding products in the Studio.
          </p>
          <a href="/studio" className="inline-block mt-5 bg-[#8B1515] text-white text-sm px-5 py-2.5 rounded hover:bg-[#6F1010] transition-colors">
            Open Sanity Studio →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search + filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search stones, origins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1515] focus:border-transparent text-stone-800"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${showFilters ? "bg-[#1B2A5E] text-white border-[#1B2A5E]" : "border-stone-200 text-stone-700 bg-white hover:border-stone-300"}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {hasFilters && <span className="w-2 h-2 rounded-full bg-[#8B1515] flex-shrink-0" />}
        </button>
        {hasFilters && (
          <button onClick={clearFilters} className="text-sm text-stone-500 hover:text-stone-700 px-2 transition-colors">
            Clear all
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === "all" ? "bg-[#1B2A5E] text-white" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.slug.current)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.slug.current ? "bg-[#8B1515] text-white" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"}`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Extra filters panel */}
      {showFilters && (
        <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">Colour Family</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedColor("all")}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedColor === "all" ? "bg-[#1B2A5E] text-white border-[#1B2A5E]" : "border-stone-200 text-stone-600 hover:border-stone-300"}`}
              >
                All
              </button>
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedColor === c ? "bg-[#8B1515] text-white border-[#8B1515]" : "border-stone-200 text-stone-600 hover:border-stone-300"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">Finish</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedFinish("all")}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedFinish === "all" ? "bg-[#1B2A5E] text-white border-[#1B2A5E]" : "border-stone-200 text-stone-600 hover:border-stone-300"}`}
              >
                All
              </button>
              {FINISH_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedFinish === f ? "bg-[#8B1515] text-white border-[#8B1515]" : "border-stone-200 text-stone-600 hover:border-stone-300"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-stone-500 mb-5">
        Showing <span className="font-semibold text-stone-700">{filtered.length}</span> of {products.length} products
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-stone-400 text-5xl mb-4">🔍</div>
          <h3 className="text-stone-600 font-medium mb-1">No products match your filters</h3>
          <p className="text-stone-400 text-sm mb-4">Try adjusting or clearing your search criteria.</p>
          <button onClick={clearFilters} className="text-[#8B1515] text-sm font-medium hover:text-[#6F1010] transition-colors">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
