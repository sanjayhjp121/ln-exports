import Link from "next/link";
import Image from "next/image";
import { ProductSummary } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: ProductSummary & { imageUrl?: string };
}

export default function ProductCard({ product }: ProductCardProps) {
  let imageUrl: string | null = null;
  if (product.imageUrl) {
    imageUrl = product.imageUrl;
  } else if (product.images?.[0]?.asset?._ref) {
    try {
      imageUrl = urlFor(product.images[0]).width(600).height(450).fit("crop").url();
    } catch {
      imageUrl = null;
    }
  }

  return (
    <Link href={`/products/${product.slug.current}`} className="group block">
      <div className="bg-white rounded-[0.125rem] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-stone-100 hover:border-primary/20">
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          {imageUrl && product.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.images[0]?.alt || product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-stone-300">image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.featured && (
            <div className="absolute top-3 left-3 bg-primary text-white text-[10px] px-2.5 py-1 rounded-[0.125rem] font-label font-bold uppercase tracking-widest">
              Featured
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-stone-800/80 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-[0.125rem] font-label uppercase tracking-wider">
              Contact for Availability
            </div>
          )}
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
          </div>
        </div>

        <div className="p-5">
          <div className="text-[10px] text-primary font-label font-bold tracking-[0.2em] uppercase mb-1.5">
            {product.category?.title}
          </div>
          <h3 className="text-stone-800 font-headline text-lg leading-snug group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {product.origin && (
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span>
                {product.origin}
              </span>
            )}
            {product.color && (
              <span className="text-[10px] bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-[0.125rem] font-label uppercase tracking-wider">
                {product.color}
              </span>
            )}
          </div>
          {product.finish && product.finish.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.finish.slice(0, 3).map((f) => (
                <span key={f} className="text-[10px] border border-stone-200 text-stone-500 px-2 py-0.5 rounded-[0.125rem]">
                  {f}
                </span>
              ))}
              {product.finish.length > 3 && (
                <span className="text-[10px] border border-stone-200 text-stone-400 px-2 py-0.5 rounded-[0.125rem]">
                  +{product.finish.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
