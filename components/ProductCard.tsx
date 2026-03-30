import Link from "next/link";
import Image from "next/image";
import { ProductSummary } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: ProductSummary;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.images?.[0]
      ? urlFor(product.images[0]).width(600).height(450).fit("crop").url()
      : null;

  return (
    <Link href={`/products/${product.slug.current}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.images[0]?.alt || product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-2 py-0.5 rounded tracking-wider">
              Featured
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-stone-700/80 text-white text-xs px-2 py-0.5 rounded">
              Out of Stock
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="text-xs text-amber-600 font-medium tracking-widest uppercase mb-1">
            {product.category?.title}
          </div>
          <h3 className="text-stone-800 font-semibold text-base leading-snug group-hover:text-amber-700 transition-colors">
            {product.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            {product.origin && (
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {product.origin}
              </span>
            )}
            {product.color && (
              <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                {product.color}
              </span>
            )}
          </div>
          {product.finish && product.finish.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.finish.slice(0, 3).map((f) => (
                <span key={f} className="text-xs border border-stone-200 text-stone-500 px-2 py-0.5 rounded-full">
                  {f}
                </span>
              ))}
              {product.finish.length > 3 && (
                <span className="text-xs border border-stone-200 text-stone-400 px-2 py-0.5 rounded-full">
                  +{product.finish.length - 3}
                </span>
              )}
            </div>
          )}
          <div className="mt-3 text-amber-700 text-xs font-medium tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
