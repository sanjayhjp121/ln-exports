import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import UseCases from "@/components/UseCases";
import ProductSlider from "@/components/ProductSlider";
import MaterialGallery from "@/components/MaterialGallery";
import FactoryVideos from "@/components/FactoryVideos";
import { client, isConfigured } from "@/sanity/lib/client";
import { featuredProductsQuery, allCategoriesQuery } from "@/sanity/lib/queries";
import type { ProductSummary, Category } from "@/types";

export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts: ProductSummary[] = [];
  let categories: Category[] = [];

  if (isConfigured) {
    try {
      [featuredProducts, categories] = await Promise.all([
        client.fetch(featuredProductsQuery),
        client.fetch(allCategoriesQuery),
      ]);
    } catch {
      // CMS fetch error — show static content
    }
  }

  void featuredProducts;
  void categories;

  return (
    <>
      {/* ─── Hero with Video ────────────────────────────────── */}
      <HeroSection />

      {/* ─── Full-Width Product Slider ──────────────────────── */}
      <section className="bg-transparent">
        <div className="mb-0">
          <div className="container mx-auto px-8 md:px-24 pt-24 pb-12">
            <div className="text-center mb-12">
              <span className="text-primary font-label text-xs uppercase tracking-[0.4em] font-bold">
                Featured Products
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-on-surface mt-2">
                Discover Our Collections
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 font-light text-lg">
                Swipe through our finest materials — each image showcases the full beauty
                of a single product.
              </p>
            </div>
          </div>
          <ProductSlider />
        </div>
      </section>

      {/* ─── Product Showcase (Sizes, Finishes, Forms) ──────── */}
      <ProductShowcase />

      {/* ─── Use Cases (Clickable Gallery like Cosentino) ──── */}
      <UseCases />

      {/* ─── Material Gallery (All 11 Materials) ──────────────── */}
      <MaterialGallery />

      {/* ─── Factory Videos ─────────────────────────────────── */}
      <FactoryVideos />

      {/* ─── Diversified Portfolio (TMT Bars + Food) ────────── */}
      <section id="diversified" className="py-32 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }} />
        </div>

        <div className="container mx-auto px-8 md:px-24 relative z-10">
          <div className="text-center mb-16">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary-fixed-dim font-bold">
              Beyond Natural Stone
            </span>
            <h2 className="font-headline text-4xl md:text-5xl mt-2">
              Diversified Export Portfolio
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mt-4 font-light text-lg">
              In addition to our core stone and tile business, LN Exports also deals in
              TMT steel bars and food exports — bringing Indian quality to global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* TMT Bars / Steel */}
            <div className="group border border-white/10 rounded-[0.125rem] p-10 hover:border-primary/50 transition-colors backdrop-blur-sm bg-white/5">
              <span className="material-symbols-outlined text-5xl text-primary-fixed-dim mb-6 block group-hover:scale-110 transition-transform">
                engineering
              </span>
              <h3 className="font-headline text-2xl mb-4">TMT Bars & Steel</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                High-grade TMT (Thermo Mechanically Treated) reinforcement bars for
                construction. Sourced from certified Indian mills, meeting international
                standards for seismic resistance and structural integrity.
              </p>
              <ul className="space-y-2 mb-8">
                {["Fe-500 & Fe-550 Grade", "BIS Certified", "Corrosion Resistant", "8mm to 32mm Diameter"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-sm">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary-fixed font-label text-xs uppercase tracking-widest font-bold hover:text-primary-fixed-dim transition-colors"
              >
                Enquire Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Food Exports */}
            <div className="group border border-white/10 rounded-[0.125rem] p-10 hover:border-primary/50 transition-colors backdrop-blur-sm bg-white/5">
              <span className="material-symbols-outlined text-5xl text-primary-fixed-dim mb-6 block group-hover:scale-110 transition-transform">
                restaurant
              </span>
              <h3 className="font-headline text-2xl mb-4">Food Exports</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Premium Indian food products for international markets. From spices and
                grains to processed foods, we leverage our global logistics network to
                deliver quality Indian cuisine worldwide.
              </p>
              <ul className="space-y-2 mb-8">
                {["Premium Indian Spices", "Basmati Rice & Grains", "FSSAI & FDA Compliant", "Global Shipping Network"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-sm">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary-fixed font-label text-xs uppercase tracking-widest font-bold hover:text-primary-fixed-dim transition-colors"
              >
                Enquire Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Heritage Section ─────────────────────────────────── */}
      <section id="heritage" className="py-32 bg-surface-container-low/30 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-24">
          <div className="flex flex-col md:flex-row items-center gap-24">
            <div className="w-full md:w-5/12">
              <div className="relative">
                <div className="aspect-[3/4] bg-surface-container-highest rounded-[0.125rem] overflow-hidden tonal-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoXdMRFWWdJnULQ_TXmGh2TVcepmAHvF_eB9_047fjgCnsUI4fVe0y4ISpTrqL3JGBZlEwkal9RYuD-plObgw-CzgiabgrytCVPhMvOf00quAX9V-w15Zr_c-20YA6fTLQWEdyQS0ihczVjwp4Fck7q0xpzI2iZHgcBAuM0YQuKjO2hypZMaFU9G4duZxSLlDWpQejONNO6w9h-b3vdP5k3zroc0Ae5nrcJO3pPfxqb3sSdOg7dLBvEqV8yAaz7DBKAZqpFXEEaNjJ"
                    alt="Architectural Heritage — Aravalli Range"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary p-8 rounded-[0.125rem] text-on-primary hidden lg:flex flex-col justify-center">
                  <span className="text-4xl font-headline italic">40+</span>
                  <p className="text-xs uppercase tracking-widest mt-2 font-bold">
                    Generations of Artisanal Knowledge
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-7/12 space-y-10">
              <div className="space-y-4">
                <span className="text-primary font-label text-xs uppercase tracking-[0.4em] font-bold">
                  Legacy of Extraction
                </span>
                <h2 className="font-headline text-5xl text-on-surface leading-tight">
                  The Heritage of the Aravalli Range
                </h2>
              </div>
              <div className="space-y-6 text-on-surface-variant font-light leading-relaxed text-lg">
                <p>
                  Since our inception, LN Exports has been more than a supplier; we are
                  custodians of a geological legacy. Every slab of stone we export is
                  hand-selected from heritage quarries in Rajasthan and across the Indian
                  peninsula.
                </p>
                <p>
                  Our sourcing process integrates modern geological surveying with
                  ancestral knowledge, ensuring that the stone is extracted with respect
                  for the earth and the communities that have shaped it for centuries.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 pt-8">
                <div className="border-l border-primary/30 pl-6 space-y-2">
                  <h4 className="font-headline text-xl text-on-surface">Direct Quarry Access</h4>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wide">
                    Eliminating intermediaries for purity and price integrity.
                  </p>
                </div>
                <div className="border-l border-primary/30 pl-6 space-y-2">
                  <h4 className="font-headline text-xl text-on-surface">Ethical Craft</h4>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wide">
                    Fair wages and safety for every artisan in our supply chain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Global Logistics ─────────────────────────────────── */}
      <section id="logistics" className="py-32 bg-transparent overflow-hidden">
        <div className="container mx-auto px-8 md:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-primary font-label text-xs uppercase tracking-widest font-bold">
                Global Infrastructure
              </span>
              <h2 className="font-headline text-4xl text-on-surface">Precision in Transit</h2>
            </div>
            <p className="text-on-surface-variant max-w-sm font-light text-sm italic">
              &ldquo;Stone is heavy, but our logistics are weightless. We deliver permanence
              to any corner of the globe.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/20">
            {[
              {
                icon: "inventory_2",
                title: "Slab Protection",
                desc: "Proprietary wooden crate designs reinforced with industrial polymer to prevent micro-fractures during maritime transit.",
              },
              {
                icon: "hub",
                title: "Multi-Modal Port Flow",
                desc: "Direct links to Mundra and Kandla ports with prioritized clearing for oversized stone shipments.",
              },
              {
                icon: "verified",
                title: "Global Compliance",
                desc: "Full ISPM-15 certification and customs documentation handled in-house for seamless entry into 60+ countries.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`p-12 backdrop-blur-sm group hover:bg-primary transition-colors duration-500 ${
                  i === 0
                    ? "bg-white/40 border-r border-outline-variant/20"
                    : i === 1
                    ? "bg-surface-container-low/40 border-r border-outline-variant/20"
                    : "bg-surface-container-highest/40"
                }`}
              >
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary transition-colors mb-8 block">
                  {card.icon}
                </span>
                <h3 className="font-headline text-2xl mb-4 text-on-surface group-hover:text-on-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-on-surface-variant group-hover:text-on-primary/80 transition-colors text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-surface-container h-96 relative rounded-[0.125rem] overflow-hidden tonal-shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZveG7RI4m7vmnEEcJRuHckPIr7q6r2gRuax5NJheW5ZHWsksBGVNhu4cxKhLVB7ovL9vapFUNhpW_DXn8-5-liGdFrM28ju3kQpuhWr-NHObA9qOqQXKCebVhhtbMhHVutb1gWBAQi6TOwAxQJSLEbjJgm1BviLWhVApjuoF9Zx6-m--d2xwse-Lmbb30ynNDQqklc1RyU-yUodKcy-fMLoIiVKG0SF2ViVxgtxiFy3y-U8tLsFh0uLHFgrq23DA17At5_6GdrMQ"
              alt="Global logistics map"
              className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <span className="material-symbols-outlined text-6xl text-on-surface/20">language</span>
                <div className="flex items-center gap-12 text-on-surface font-label text-xs uppercase tracking-[0.4em] font-bold">
                  <span>New York</span>
                  <span className="h-[1px] w-24 bg-primary" />
                  <span className="text-primary italic">Mumbai HQ</span>
                  <span className="h-[1px] w-24 bg-primary" />
                  <span>Dubai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────── */}
      <section className="py-32 bg-transparent border-t border-outline-variant/10">
        <div className="container mx-auto px-8 md:px-24">
          <div className="text-center mb-20">
            <span className="text-primary font-label text-xs uppercase tracking-widest font-bold">
              The Professional Perspective
            </span>
            <h2 className="font-headline text-4xl text-on-surface mt-2">
              Architects&apos; Choice
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                quote:
                  "LN Exports provides a level of material consistency that is rare in the natural stone industry. Their Portoro Gold was the centerpiece of our recent penthouse project in Dubai.",
                name: "Julian Thorne",
                role: "Lead Architect, Thorne & Associates",
              },
              {
                quote:
                  "The logistical precision is what sets them apart. Delivering five-ton slabs of pristine white marble to a restricted site in London was handled with zero margin for error.",
                name: "Elena Rossi",
                role: "Interior Director, Rossi Milano",
              },
              {
                quote:
                  "Sourcing heritage stone from the Aravalli range through LN Exports ensures our projects have a soul. The geological story they provide adds immense value for our clients.",
                name: "Sanjay Mehta",
                role: "Bespoke Homeowner",
              },
            ].map((t) => (
              <div key={t.name} className="space-y-6">
                <span className="material-symbols-outlined text-primary/30 text-5xl">format_quote</span>
                <p className="text-on-surface-variant italic leading-relaxed text-lg">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-4 border-t border-outline-variant/30">
                  <p className="font-headline text-on-surface">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Band ─────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 marble-veining" />
        <div className="container mx-auto px-8 md:px-24 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="font-headline text-4xl">Begin Your Bespoke Journey</h2>
            <p className="text-on-primary/80 font-light text-lg">
              Request a physical sample or a virtual consultation with our stone experts.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="/contact"
              className="bg-surface text-primary px-12 py-5 rounded-[0.125rem] font-bold uppercase tracking-widest text-xs hover:bg-surface-container-highest transition-colors text-center"
            >
              Request Samples
            </Link>
            <Link
              href="/contact"
              className="border border-on-primary text-on-primary px-12 py-5 rounded-[0.125rem] font-bold uppercase tracking-widest text-xs hover:bg-on-primary hover:text-primary transition-colors text-center"
            >
              Talk to Sourcing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
