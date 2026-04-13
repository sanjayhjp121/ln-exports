import { notFound } from "next/navigation";
import Link from "next/link";
import { client, isConfigured } from "@/sanity/lib/client";
import {
  productBySlugQuery,
  allProductSlugsQuery,
  relatedProductsQuery,
} from "@/sanity/lib/queries";
import { Product, ProductSummary } from "@/types";
import {
  getPlaceholderProductBySlug,
  getRelatedPlaceholderProducts,
  PLACEHOLDER_PRODUCTS,
  type PlaceholderProduct,
} from "@/lib/placeholder-data";
import ImageGallery from "@/components/ImageGallery";
import InspirationGallery from "@/components/InspirationGallery";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const placeholderParams = PLACEHOLDER_PRODUCTS.map((p) => ({
    slug: p.slug.current,
  }));

  if (!isConfigured) return placeholderParams;
  try {
    const slugs: { slug: string }[] = await client.fetch(allProductSlugsQuery);
    return slugs.length > 0
      ? slugs.map((s) => ({ slug: s.slug }))
      : placeholderParams;
  } catch {
    return placeholderParams;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isConfigured) {
    try {
      const product: Product = await client.fetch(productBySlugQuery, { slug });
      if (product) {
        return {
          title: product.title,
          description: product.seoDescription || `${product.title} — Premium natural stone from LN Exports.`,
        };
      }
    } catch {
      // fall through to placeholder
    }
  }

  const placeholder = getPlaceholderProductBySlug(slug);
  if (placeholder) {
    return {
      title: placeholder.title,
      description: placeholder.seoDescription || `${placeholder.title} — Premium natural stone from LN Exports.`,
    };
  }
  return {};
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let product: Product | null = null;
  let related: ProductSummary[] = [];
  let placeholderProduct: PlaceholderProduct | undefined;
  let placeholderRelated: PlaceholderProduct[] = [];

  if (isConfigured) {
    try {
      product = await client.fetch(productBySlugQuery, { slug });
      if (product) {
        related = await client.fetch(relatedProductsQuery, {
          categoryId: product.category?._id,
          currentSlug: slug,
        });
      }
    } catch {
      // CMS error — fall through to placeholder
    }
  }

  if (!product) {
    placeholderProduct = getPlaceholderProductBySlug(slug);
    if (placeholderProduct) {
      placeholderRelated = getRelatedPlaceholderProducts(
        placeholderProduct.category._id,
        slug,
      );
    }
  }

  if (!product && !placeholderProduct) {
    notFound();
  }

  const p = product || placeholderProduct!;
  const isPlaceholder = !product;
  const imageUrls = isPlaceholder ? (placeholderProduct as PlaceholderProduct).imageUrls : undefined;
  const inspirationItems = isPlaceholder ? (placeholderProduct as PlaceholderProduct).inspirationGallery : undefined;
  const sanityInspirationImages = product?.inspirationGallery;
  const relatedItems = product ? related : (placeholderRelated as unknown as ProductSummary[]);

  const specs = [
    { label: "Category", value: p.category?.title },
    { label: "Origin", value: p.origin },
    { label: "Colour Family", value: p.color },
    { label: "Availability", value: p.inStock ? "In Stock" : "Contact Us" },
  ].filter((s) => s.value);

  return (
    <div className="bg-surface min-h-screen marble-veining">
      {/* Breadcrumb */}
      <div className="bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs flex items-center gap-2 font-label">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">Home</Link>
          <span className="text-white/30">/</span>
          <Link href="/products" className="text-white/50 hover:text-white transition-colors">Catalog</Link>
          {p.category && (
            <>
              <span className="text-white/30">/</span>
              <Link
                href={`/products?category=${p.category.slug.current}`}
                className="text-white/50 hover:text-white transition-colors"
              >
                {p.category.title}
              </Link>
            </>
          )}
          <span className="text-white/30">/</span>
          <span className="text-white font-medium truncate max-w-[200px]">{p.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image gallery */}
          <div>
            <ImageGallery
              images={product?.images || []}
              imageUrls={imageUrls}
              title={p.title}
            />
          </div>

          {/* Right: Product info */}
          <div className="space-y-6">
            <div>
              <span className="text-primary text-[10px] font-label font-bold tracking-[0.3em] uppercase">
                {p.category?.title}
              </span>
              <h1 className="font-headline text-3xl md:text-4xl text-on-surface mt-2 leading-tight">{p.title}</h1>
            </div>

            {/* Status badges */}
            <div className="flex gap-2">
              <span className={`text-[10px] px-3 py-1.5 rounded-[0.125rem] font-label font-bold uppercase tracking-widest ${p.inStock ? "bg-green-50 text-green-700 border border-green-200" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>
                {p.inStock ? "In Stock" : "Contact for Availability"}
              </span>
              {p.featured && (
                <span className="text-[10px] px-3 py-1.5 rounded-[0.125rem] font-label font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                  Featured
                </span>
              )}
            </div>

            {/* Description */}
            {p.description && (
              <div className="prose prose-stone max-w-none text-on-surface-variant font-light leading-relaxed">
                <PortableText value={p.description} />
              </div>
            )}

            {/* Specs table */}
            <div className="bg-white rounded-[0.125rem] border border-outline-variant/20 divide-y divide-outline-variant/10">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center px-5 py-3.5">
                  <span className="text-[10px] text-on-surface-variant w-32 flex-shrink-0 font-label font-bold uppercase tracking-widest">{spec.label}</span>
                  <span className="text-sm text-on-surface font-medium">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Finishes */}
            {p.finish && p.finish.length > 0 && (
              <div>
                <div className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">texture</span>
                  Available Finishes
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.finish.map((f) => (
                    <span key={f} className="text-xs border border-outline-variant/30 bg-white text-on-surface px-4 py-1.5 rounded-[0.125rem] hover:border-primary/50 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {p.availableSizes && p.availableSizes.length > 0 && (
              <div>
                <div className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">straighten</span>
                  Available Sizes
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.availableSizes.map((s) => (
                    <span key={s} className="text-xs border border-outline-variant/30 bg-white text-on-surface px-4 py-1.5 rounded-[0.125rem]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Thickness */}
            {p.thickness && p.thickness.length > 0 && (
              <div>
                <div className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">height</span>
                  Thickness
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.thickness.map((t) => (
                    <span key={t} className="text-xs border border-outline-variant/30 bg-white text-on-surface px-4 py-1.5 rounded-[0.125rem]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {p.applications && p.applications.length > 0 && (
              <div>
                <div className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">category</span>
                  Applications
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.applications.map((a) => (
                    <span key={a} className="text-xs bg-surface-container text-on-surface-variant px-4 py-1.5 rounded-[0.125rem]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919820105837"}?text=${encodeURIComponent(`Hi, I'm interested in ${p.title}. Can you provide more details?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3.5 rounded-[0.125rem] text-xs font-label font-bold uppercase tracking-widest transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Enquiry
              </a>
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary py-3.5 rounded-[0.125rem] text-xs font-label font-bold uppercase tracking-widest transition-colors"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                Request Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Inspiration Gallery */}
        <InspirationGallery
          sanityImages={sanityInspirationImages}
          placeholderItems={inspirationItems}
          productName={p.title}
        />

        {/* Enquiry form */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="bg-white rounded-[0.125rem] border border-outline-variant/20 shadow-sm p-8 md:p-10 border-t-4 border-t-primary">
            <h2 className="font-headline text-2xl text-on-surface mb-1">Send an Enquiry</h2>
            <p className="text-on-surface-variant text-sm mb-8 font-light">Interested in <strong className="font-medium">{p.title}</strong>? Fill in your details and we&apos;ll get back to you within 24 hours.</p>
            <EnquiryForm productTitle={p.title} />
          </div>
        </div>

        {/* Related products */}
        {relatedItems.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-[2px] bg-primary" />
              <h2 className="font-headline text-2xl text-on-surface">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((rp) => (
                <ProductCard key={rp._id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
