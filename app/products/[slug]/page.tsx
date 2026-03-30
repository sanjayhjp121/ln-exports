import { notFound } from "next/navigation";
import Link from "next/link";
import { client, isConfigured } from "@/sanity/lib/client";
import {
  productBySlugQuery,
  allProductSlugsQuery,
  relatedProductsQuery,
} from "@/sanity/lib/queries";
import { Product, ProductSummary } from "@/types";
import ImageGallery from "@/components/ImageGallery";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!isConfigured) return [];
  try {
    const slugs: { slug: string }[] = await client.fetch(allProductSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isConfigured) return {};
  const { slug } = await params;
  try {
    const product: Product = await client.fetch(productBySlugQuery, { slug });
    if (!product) return {};
    return {
      title: product.title,
      description: product.seoDescription || `${product.title} — Premium natural stone from LN Exports.`,
    };
  } catch {
    return {};
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let product: Product | null = null;
  let related: ProductSummary[] = [];

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
      // CMS error
    }
  }

  if (!product) {
    notFound();
  }

  const specs = [
    { label: "Category", value: product.category?.title },
    { label: "Origin", value: product.origin },
    { label: "Colour Family", value: product.color },
    { label: "Availability", value: product.inStock ? "In Stock" : "Contact Us" },
  ].filter((s) => s.value);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-stone-500 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600 transition-colors">Catalog</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/products?category=${product.category.slug.current}`}
                className="hover:text-amber-600 transition-colors"
              >
                {product.category.title}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-stone-700 font-medium truncate max-w-[180px]">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image gallery */}
          <div>
            <ImageGallery images={product.images || []} title={product.title} />
          </div>

          {/* Right: Product info */}
          <div>
            <div className="text-amber-600 text-xs tracking-widest uppercase font-medium mb-2">
              {product.category?.title}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">{product.title}</h1>

            {/* Status badge */}
            <div className="flex gap-2 mb-6">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${product.inStock ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-600"}`}>
                {product.inStock ? "In Stock" : "Contact for Availability"}
              </span>
              {product.featured && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-amber-100 text-amber-700">
                  Featured
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-sm prose-stone max-w-none mb-6 text-stone-600 leading-relaxed">
                <PortableText value={product.description} />
              </div>
            )}

            {/* Specs table */}
            <div className="bg-white rounded-xl border border-stone-100 divide-y divide-stone-50 mb-6">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center px-4 py-3">
                  <span className="text-xs text-stone-500 w-32 flex-shrink-0 font-medium uppercase tracking-wide">{spec.label}</span>
                  <span className="text-sm text-stone-700 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Finishes */}
            {product.finish && product.finish.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">Available Finishes</div>
                <div className="flex flex-wrap gap-2">
                  {product.finish.map((f) => (
                    <span key={f} className="text-xs border border-stone-200 bg-white text-stone-600 px-3 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">Available Sizes</div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((s) => (
                    <span key={s} className="text-xs border border-stone-200 bg-white text-stone-600 px-3 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Thickness */}
            {product.thickness && product.thickness.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">Thickness</div>
                <div className="flex flex-wrap gap-2">
                  {product.thickness.map((t) => (
                    <span key={t} className="text-xs border border-stone-200 bg-white text-stone-600 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="mb-6">
                <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">Applications</div>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <span key={a} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}?text=${encodeURIComponent(`Hi, I'm interested in ${product.title}. Can you provide more details?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white py-3 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>

        {/* Enquiry form */}
        <div className="mt-14 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-stone-800 mb-1">Send an Enquiry</h2>
            <p className="text-stone-500 text-sm mb-6">Interested in <strong>{product.title}</strong>? Fill in your details and we&apos;ll get back to you within 24 hours.</p>
            <EnquiryForm productTitle={product.title} />
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-stone-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
