import Link from "next/link";
import LivingSlider from "@/components/LivingSlider";
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
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center gap-16 relative z-10">
          {/* Left text */}
          <div className="w-full md:w-1/2 space-y-8 text-left md:pr-12">
            <span className="block font-label text-sm uppercase tracking-[0.3em] text-primary font-semibold">
              The Curated Monolith
            </span>
            <h1 className="font-headline text-5xl md:text-7xl leading-[1.1] text-on-surface tracking-tight">
              Where <span className="italic font-normal">Earth</span>
              <br />
              Meets <span className="text-primary">Artistry</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-md font-light leading-relaxed">
              LN Exports bridges the gap between raw geological wonder and
              architectural refinement, sourcing the finest natural stones from
              the heart of India.
            </p>
            <div className="pt-4 flex items-center gap-8">
              <Link
                href="/products"
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-4 rounded-[0.125rem] font-medium tracking-wide hover:scale-[1.02] transition-transform flex items-center gap-3"
              >
                Explore Collections
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/#heritage"
                className="text-primary font-medium flex items-center gap-2 hover:translate-x-1 transition-transform group"
              >
                Heritage Story
                <span className="material-symbols-outlined text-sm group-hover:ml-1 transition-all">
                  north_east
                </span>
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] bg-surface-container-low rounded-[0.125rem] overflow-hidden tonal-shadow relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp"
                alt="Premium stone slab — Makrana Pristine White"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                <p className="font-label text-xs uppercase tracking-widest opacity-80 mb-1">
                  Featured Artifact
                </p>
                <h3 className="font-headline text-2xl">Makrana Pristine White</h3>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-10 -left-10 hidden lg:flex flex-col justify-center w-48 h-64 bg-surface-container-highest p-6 tonal-shadow rounded-[0.125rem] border-l-4 border-primary">
              <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-4 font-bold">
                Hardness Scale
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Density</span>
                    <span className="font-bold text-on-surface">2.7 g/cm³</span>
                  </div>
                  <div className="h-0.5 bg-outline-variant/30 w-full">
                    <div className="h-full bg-primary w-[85%]" />
                  </div>
                </div>
                <p className="text-[10px] text-on-surface-variant leading-tight">
                  Authentic geological data sourced from Rajasthan quarries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Material Gallery ──────────────────────────────────── */}
      <section className="py-32 bg-transparent relative">
        <div className="container mx-auto px-8 md:px-24">
          {/* Header */}
          <div className="mb-20 space-y-4">
            <h2 className="font-headline text-4xl text-on-surface">Material Gallery</h2>
            <div className="flex justify-between items-end">
              <p className="text-on-surface-variant max-w-lg">
                A curated selection of the Earth&apos;s finest minerals, graded for
                architectural permanence and aesthetic impact.
              </p>
              <div className="hidden md:flex gap-4">
                <Link href="/products" className="font-label text-xs uppercase text-primary border-b-2 border-primary pb-1 font-bold">
                  All Stones
                </Link>
                <Link href="/products?category=granite" className="font-label text-xs uppercase text-on-surface-variant hover:text-primary transition-colors">
                  Granite
                </Link>
                <Link href="/products?category=marble" className="font-label text-xs uppercase text-on-surface-variant hover:text-primary transition-colors">
                  Marble
                </Link>
                <Link href="/products" className="font-label text-xs uppercase text-on-surface-variant hover:text-primary transition-colors">
                  Gemstones
                </Link>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Large Feature — col 8 */}
            <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-low rounded-[0.125rem] h-[500px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb"
                alt="Portoro Gold Marble"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-headline text-4xl text-white">Portoro Gold Marble</h3>
                  <div className="flex gap-12 text-white/80 font-label text-xs uppercase tracking-widest border-t border-white/20 pt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-white/50">Vein Intensity</span>
                      <span className="text-sm font-bold">High / Dramatic</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-white/50">Hardness</span>
                      <span className="text-sm font-bold">3.5 – 4.0 Mohs</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-white/50">Origin</span>
                      <span className="text-sm font-bold">Aravalli Hills</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Feature — col 4 */}
            <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-low rounded-[0.125rem] h-[500px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgJRhbxAKqMijDIu5rkuzslBm4VyjNRvjRymvBLU3pz0WrLlYCYgBtMMEy5lPXptqIgFZtP4ZZzHOxnThTKH29IlRrQeG0kzMf8Cb0M8j_Gq3rNwabXqGYNIYoIfhqeNy6el_gXFz15N429zLWgwdFzInz5Qh1eGeXqncR4Mzmp5or7zuSJECkv18zILPw2iTyxIVDcXWCMizPO6kt771QwpuPwTiOdflztv1MAKN01OpGpot0pCI8rP1GmFliKhzTBcIAtGAlfj"
                alt="Absolute Black Granite"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    New Sourcing
                  </span>
                  <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    add_circle
                  </span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl text-white text-shadow-sm">
                    Absolute Black Granite
                  </h3>
                  <p className="text-white/70 text-xs mt-2 uppercase tracking-widest">
                    Vein Intensity: Zero
                  </p>
                </div>
              </div>
            </div>

            {/* Medium Feature — col 5 */}
            <div className="md:col-span-5 group relative overflow-hidden bg-surface-container-low rounded-[0.125rem] h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5hkcytrl-wZhEDxlc1xevakHj2iaZaZ9ONiJrB8mYB2wvh7lZa0vcS1eE_W_YChMLxgapspcuxmnuYPasdO6w8z3McVUQ_5DiLOvWdsY1SLUlyu-vfzrCOcA74veEs76N5_9_zQBPWjKbMEU4ZVnqvFz_GO6mfeYnlbg-K70i8ac0v9c7ss9-nUfUJSJzvVAlR0GdKbZa32HVcfe5zFHwd3XAw-4wHdr5MhYyjP1i_th1290ZNF7LhjP1j4eyQcZ8DHu0OMVC-8vz"
                alt="Jaisalmer Teakwood Sandstone"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-on-surface/20 group-hover:bg-transparent transition-colors duration-500 p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl text-white">Jaisalmer Teakwood</h3>
                <div className="mt-4 h-[1px] bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </div>
            </div>

            {/* Wide Feature — col 7 */}
            <div className="md:col-span-7 group relative overflow-hidden bg-surface-container-low rounded-[0.125rem] h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWADQJ93A_02JzVzfXairNl2k3sBWCR-OF25CkoQi8YaZyERa3jl5IcHuYJQfFS-TiRWBl_spJlBoVtZswWEWewiyzKNAQiZKEvtpbnHBp1GeJZBojFNnf_Y8oU1Hbn0jeK1DqCKTGozxUw475YWG0-y8rVIH9Ed17UAQhhZh5i4qxL8O4uXI7t4y6Xu0YdOj2ouWZEQ5yj9jKB-oU2rF9cWPE5jy2earABliIETnc6T_QAGcEkLzIQ-cnDWvxYn9R4msTReviQnZo"
                alt="Semi-Precious Gemstone Slabs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-on-surface/60 to-transparent p-10 flex flex-col justify-center">
                <span className="text-primary-fixed font-label text-xs uppercase tracking-widest mb-2 font-bold">
                  Exclusive Artifacts
                </span>
                <h3 className="font-headline text-4xl text-white max-w-xs">
                  Semi-Precious Gemstone Slabs
                </h3>
                <p className="text-white/80 mt-4 max-w-xs text-sm leading-relaxed">
                  Translucent masterpieces for high-end hospitality and custom interiors.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 self-start border border-white/30 text-white px-8 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-on-surface transition-colors"
                >
                  Request Spec Sheet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Artistry in Living (Slider) ──────────────────────── */}
      <section className="py-32 bg-surface-container-lowest/50 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto px-8 md:px-24">
          <div className="mb-16 text-center">
            <span className="text-primary font-label text-xs uppercase tracking-widest font-bold">
              In-Home Gallery
            </span>
            <h2 className="font-headline text-4xl text-on-surface mt-2">Artistry in Living</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 font-light italic">
              Curated environments where geological history meets contemporary life.
            </p>
          </div>
          <LivingSlider />
        </div>
      </section>

      {/* ─── Heritage Section ─────────────────────────────────── */}
      <section id="heritage" className="py-32 bg-surface-container-low/30 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-24">
          <div className="flex flex-col md:flex-row items-center gap-24">
            {/* Image */}
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
                {/* Floating accent */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary p-8 rounded-[0.125rem] text-on-primary hidden lg:flex flex-col justify-center">
                  <span className="text-4xl font-headline italic">40+</span>
                  <p className="text-xs uppercase tracking-widest mt-2 font-bold">
                    Generations of Artisanal Knowledge
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
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
          {/* Header */}
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

          {/* Three cards */}
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
                border: true,
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

          {/* Logistics visual */}
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
                  <span className="text-primary italic">Delhi HQ</span>
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
