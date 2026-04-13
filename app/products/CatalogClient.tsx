"use client";

import { useState, useMemo } from "react";
import { ProductSummary, Category } from "@/types";
import ProductCard from "@/components/ProductCard";

const COLOR_OPTIONS = ["White", "Beige", "Grey", "Black", "Brown", "Green", "Blue", "Red", "Yellow", "Multicolor"];
const FINISH_OPTIONS = ["Polished", "Honed", "Brushed", "Sandblasted", "Leathered", "Flamed", "Natural Split"];

type ProductWithImage = ProductSummary & { imageUrl?: string };

interface CatalogClientProps {
  products: ProductWithImage[];
  categories: Category[];
}

export default function CatalogClient({ products: rawProducts, categories }: CatalogClientProps) {
  const products = rawProducts as ProductWithImage[];
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

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const slug = p.category?.slug?.current;
      if (slug) counts[slug] = (counts[slug] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Search + filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xl">search</span>
          <input
            type="search"
            placeholder="Search by name, origin, material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-stone-200 rounded-[0.125rem] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-stone-800"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3 border rounded-[0.125rem] text-sm font-label font-bold uppercase tracking-widest transition-colors ${showFilters ? "bg-brand-navy text-white border-brand-navy" : "border-stone-200 text-stone-700 bg-white hover:border-primary hover:text-primary"}`}
        >
          <span className="material-symbols-outlined text-lg">tune</span>
          Filters
          {hasFilters && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
        </button>
        {hasFilters && (
          <button onClick={clearFilters} className="text-sm text-stone-500 hover:text-primary px-2 transition-colors font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-5 py-2 rounded-[0.125rem] text-xs font-label font-bold uppercase tracking-widest transition-colors ${selectedCategory === "all" ? "bg-brand-navy text-white" : "bg-white text-stone-600 border border-stone-200 hover:border-primary hover:text-primary"}`}
        >
          All ({products.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.slug.current)}
            className={`px-5 py-2 rounded-[0.125rem] text-xs font-label font-bold uppercase tracking-widest transition-colors ${selectedCategory === cat.slug.current ? "bg-primary text-white" : "bg-white text-stone-600 border border-stone-200 hover:border-primary hover:text-primary"}`}
          >
            {cat.title} ({categoryCount[cat.slug.current] || 0})
          </button>
        ))}
      </div>

      {/* Extra filters panel */}
      {showFilters && (
        <div className="bg-white border border-stone-200 rounded-[0.125rem] p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-label font-bold text-stone-500 tracking-widest uppercase mb-3">Colour Family</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColor("all")}
                className={`px-3 py-1.5 rounded-[0.125rem] text-xs border font-medium transition-colors ${selectedColor === "all" ? "bg-brand-navy text-white border-brand-navy" : "border-stone-200 text-stone-600 hover:border-primary"}`}
              >
                All
              </button>
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 rounded-[0.125rem] text-xs border font-medium transition-colors ${selectedColor === c ? "bg-primary text-white border-primary" : "border-stone-200 text-stone-600 hover:border-primary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-label font-bold text-stone-500 tracking-widest uppercase mb-3">Finish</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFinish("all")}
                className={`px-3 py-1.5 rounded-[0.125rem] text-xs border font-medium transition-colors ${selectedFinish === "all" ? "bg-brand-navy text-white border-brand-navy" : "border-stone-200 text-stone-600 hover:border-primary"}`}
              >
                All
              </button>
              {FINISH_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`px-3 py-1.5 rounded-[0.125rem] text-xs border font-medium transition-colors ${selectedFinish === f ? "bg-primary text-white border-primary" : "border-stone-200 text-stone-600 hover:border-primary"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-stone-500 mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-stone-400">inventory_2</span>
        Showing <span className="font-semibold text-stone-700">{filtered.length}</span> of {products.length} products
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-6xl text-stone-300 mb-4 block">search_off</span>
          <h3 className="text-stone-600 font-headline text-xl mb-2">No products match your filters</h3>
          <p className="text-stone-400 text-sm mb-6">Try adjusting or clearing your search criteria.</p>
          <button onClick={clearFilters} className="text-primary text-xs font-label font-bold uppercase tracking-widest hover:text-primary-container transition-colors">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
