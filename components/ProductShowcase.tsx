"use client";

import { useState } from "react";
import Link from "next/link";

const IMAGES = {
  granite:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgJRhbxAKqMijDIu5rkuzslBm4VyjNRvjRymvBLU3pz0WrLlYCYgBtMMEy5lPXptqIgFZtP4ZZzHOxnThTKH29IlRrQeG0kzMf8Cb0M8j_Gq3rNwabXqGYNIYoIfhqeNy6el_gXFz15N429zLWgwdFzInz5Qh1eGeXqncR4Mzmp5or7zuSJECkv18zILPw2iTyxIVDcXWCMizPO6kt771QwpuPwTiOdflztv1MAKN01OpGpot0pCI8rP1GmFliKhzTBcIAtGAlfj",
  marble:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb",
  tiles:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB5hkcytrl-wZhEDxlc1xevakHj2iaZaZ9ONiJrB8mYB2wvh7lZa0vcS1eE_W_YChMLxgapspcuxmnuYPasdO6w8z3McVUQ_5DiLOvWdsY1SLUlyu-vfzrCOcA74veEs76N5_9_zQBPWjKbMEU4ZVnqvFz_GO6mfeYnlbg-K70i8ac0v9c7ss9-nUfUJSJzvVAlR0GdKbZa32HVcfe5zFHwd3XAw-4wHdr5MhYyjP1i_th1290ZNF7LhjP1j4eyQcZ8DHu0OMVC-8vz",
  quartz:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWADQJ93A_02JzVzfXairNl2k3sBWCR-OF25CkoQi8YaZyERa3jl5IcHuYJQfFS-TiRWBl_spJlBoVtZswWEWewiyzKNAQiZKEvtpbnHBp1GeJZBojFNnf_Y8oU1Hbn0jeK1DqCKTGozxUw475YWG0-y8rVIH9Ed17UAQhhZh5i4qxL8O4uXI7t4y6Xu0YdOj2ouWZEQ5yj9jKB-oU2rF9cWPE5jy2earABliIETnc6T_QAGcEkLzIQ-cnDWvxYn9R4msTReviQnZo",
};

interface ProductForm {
  name: string;
  sizes: string[];
  icon: string;
  gangsoNote?: string;
}

interface ProductFinish {
  name: string;
  type: "polished" | "non-polished";
  desc: string;
}

interface ProductData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  forms: ProductForm[];
  finishes: ProductFinish[];
  specs: { label: string; value: string }[];
  varieties: string[];
}

const PRODUCTS: ProductData[] = [
  {
    id: "granite",
    name: "Granite",
    tagline: "Nature's Hardest Surface",
    description:
      "Granite is an igneous rock formed from slowly cooled magma, prized for its exceptional hardness, durability, and crystalline beauty. Ideal for high-traffic areas and kitchen countertops.",
    image: IMAGES.granite,
    forms: [
      {
        name: "Slabs",
        sizes: ["240 × 120 cm", "300 × 180 cm", "300 × 200 cm"],
        icon: "crop_landscape",
      },
      {
        name: "Tiles",
        sizes: ["60 × 60 cm", "60 × 30 cm", "30 × 30 cm"],
        icon: "grid_view",
      },
      {
        name: "Gangso",
        sizes: ["Random lengths & widths", "Custom mill cuts"],
        icon: "construction",
        gangsoNote: "Available in both polished and non-polished (natural/rough) finishes",
      },
    ],
    finishes: [
      { name: "Polished", type: "polished", desc: "Mirror-like high gloss, brings out full color depth" },
      { name: "Honed", type: "non-polished", desc: "Smooth matte with a soft, velvety texture" },
      { name: "Flamed", type: "non-polished", desc: "Heat-textured for slip resistance, ideal for exteriors" },
      { name: "Leather / Bush-hammered", type: "non-polished", desc: "Naturally dimpled surface with rustic character" },
    ],
    specs: [
      { label: "Hardness", value: "6–7 Mohs" },
      { label: "Density", value: "2.6–2.8 g/cm³" },
      { label: "Water Absorption", value: "<0.5%" },
      { label: "Compressive Strength", value: "100–250 MPa" },
    ],
    varieties: ["Absolute Black", "Tan Brown", "Kashmir White", "Galaxy Black", "Steel Grey", "Black Pearl"],
  },
  {
    id: "marble",
    name: "Marble",
    tagline: "Timeless Elegance Carved by Time",
    description:
      "Marble is a metamorphic rock renowned for its luminous veining and warm translucency. Each slab tells a unique geological story, making it the preferred choice for luxury interiors and statement surfaces.",
    image: IMAGES.marble,
    forms: [
      {
        name: "Slabs",
        sizes: ["240 × 120 cm", "300 × 180 cm", "300 × 200 cm"],
        icon: "crop_landscape",
      },
      {
        name: "Tiles",
        sizes: ["60 × 60 cm", "60 × 30 cm", "80 × 80 cm", "30 × 30 cm"],
        icon: "grid_view",
      },
      {
        name: "Gangso",
        sizes: ["Irregular shapes", "Custom profiles"],
        icon: "construction",
        gangsoNote: "Available in both polished and non-polished (honed/tumbled) finishes",
      },
    ],
    finishes: [
      { name: "Polished", type: "polished", desc: "Classic high gloss that reveals the full veining pattern" },
      { name: "Honed", type: "non-polished", desc: "Matte finish with subdued elegance, hides wear" },
      { name: "Sandblasted", type: "non-polished", desc: "Rough texture for non-slip outdoor applications" },
      { name: "Tumbled / Antiqued", type: "non-polished", desc: "Aged, weathered look with soft rounded edges" },
    ],
    specs: [
      { label: "Hardness", value: "3–5 Mohs" },
      { label: "Density", value: "2.5–2.7 g/cm³" },
      { label: "Water Absorption", value: "0.2–0.5%" },
      { label: "Compressive Strength", value: "50–170 MPa" },
    ],
    varieties: ["Makrana White", "Indian Green", "Rainforest Brown", "Portoro Gold", "Fantasy Brown", "Statuario"],
  },
  {
    id: "tiles",
    name: "Tiles",
    tagline: "Vitrified · Porcelain · Wall · Digital",
    description:
      "We offer a comprehensive range of tiles covering every application — from high-traffic vitrified floors to decorative digital-print wall tiles. Each type is engineered for specific environments with varying porosity, strength, and aesthetic profiles.",
    image: IMAGES.tiles,
    forms: [
      {
        name: "Vitrified Tiles",
        sizes: ["60 × 60 cm", "60 × 120 cm", "80 × 80 cm", "80 × 160 cm", "120 × 120 cm", "120 × 240 cm"],
        icon: "window",
        gangsoNote: "GVT, PGVT, Double Charge, Full Body — near-zero porosity for floors & heavy traffic",
      },
      {
        name: "Porcelain Tiles",
        sizes: ["60 × 60 cm", "60 × 120 cm", "30 × 60 cm", "80 × 80 cm"],
        icon: "grid_on",
        gangsoNote: "Dense-body, through-body color — ideal for outdoor, wet areas & frost-prone climates",
      },
      {
        name: "Wall Tiles",
        sizes: ["30 × 60 cm", "30 × 45 cm", "25 × 75 cm", "30 × 90 cm"],
        icon: "view_quilt",
        gangsoNote: "Ceramic & glazed body — lighter weight for interior wall cladding & backsplashes",
      },
      {
        name: "Digital Tiles",
        sizes: ["60 × 120 cm", "80 × 160 cm", "120 × 240 cm"],
        icon: "image",
        gangsoNote: "HD inkjet printed — marble, wood, stone & custom pattern replicas with photo-realism",
      },
    ],
    finishes: [
      { name: "Glossy / Polished", type: "polished" as const, desc: "High-shine reflective surface, marble-like appearance" },
      { name: "Matt / Matte", type: "non-polished" as const, desc: "Non-reflective elegant finish for contemporary spaces" },
      { name: "Sugar / Rustic", type: "non-polished" as const, desc: "Crystalline texture with micro-sparkle effect" },
      { name: "Carving / Lapato", type: "non-polished" as const, desc: "Semi-polished zones creating contrast texture" },
      { name: "Satin / Silk", type: "polished" as const, desc: "Soft sheen between gloss and matte for refined interiors" },
    ],
    specs: [
      { label: "Water Absorption", value: "<0.05%" },
      { label: "Breaking Strength", value: ">2000 N" },
      { label: "Scratch Resistance", value: "Grade 5 (PEI)" },
      { label: "Chemical Resistance", value: "Class A" },
    ],
    varieties: ["Statuario Look", "Onyx Design", "Wood Plank", "Concrete Effect", "Calacatta", "Travertine Look"],
  },
  {
    id: "quartz",
    name: "Quartz",
    tagline: "Engineered Stone, Natural Beauty",
    description:
      "Engineered quartz combines 90-95% natural quartz crystals with polymer resins, creating surfaces with the beauty of natural stone but with superior consistency, stain resistance, and zero maintenance requirements.",
    image: IMAGES.quartz,
    forms: [
      {
        name: "Slabs",
        sizes: ["300 × 140 cm", "300 × 160 cm", "320 × 160 cm"],
        icon: "crop_landscape",
      },
      {
        name: "Cut-to-Size",
        sizes: ["Custom dimensions", "CNC profiled edges"],
        icon: "content_cut",
      },
    ],
    finishes: [
      { name: "Polished", type: "polished", desc: "Ultra-smooth mirror finish, most popular choice" },
      { name: "Honed / Matte", type: "non-polished", desc: "Velvety smooth without gloss for modern aesthetics" },
      { name: "Rough / Textured", type: "non-polished", desc: "Leather-like surface for tactile warmth" },
    ],
    specs: [
      { label: "Hardness", value: "7 Mohs" },
      { label: "Flexural Strength", value: ">40 MPa" },
      { label: "Water Absorption", value: "<0.02%" },
      { label: "Stain Resistance", value: "Non-porous" },
    ],
    varieties: ["Calacatta Gold", "Carrara White", "Concrete Grey", "Pure White", "Midnight Black", "Emerald Green"],
  },
];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const product = PRODUCTS[activeTab];

  return (
    <section id="products" className="py-32 bg-transparent">
      <div className="container mx-auto px-8 md:px-24">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <span className="text-primary font-label text-xs uppercase tracking-[0.4em] font-bold">
            Our Materials
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface">
            Premium Surfaces for Every Application
          </h2>
          <p className="text-on-surface-variant max-w-2xl font-light text-lg">
            Each material is available in multiple forms, sizes, and finishes to meet
            the demands of any architectural vision.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-outline-variant/30 pb-0">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(i)}
              className={`px-8 py-4 font-label text-sm uppercase tracking-widest font-bold transition-all relative ${
                activeTab === i
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {p.name}
              {activeTab === i && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-[0.125rem] overflow-hidden tonal-shadow relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="font-headline text-3xl text-white">{product.name}</h3>
                <p className="text-white/70 text-sm mt-1 italic">{product.tagline}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 space-y-10">
            <p className="text-on-surface-variant leading-relaxed text-lg font-light">
              {product.description}
            </p>

            {/* Available Forms & Sizes */}
            <div>
              <h4 className="font-headline text-xl text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">straighten</span>
                Available Forms & Sizes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.forms.map((form) => (
                  <div
                    key={form.name}
                    className="border border-outline-variant/20 p-6 rounded-[0.125rem] hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {form.icon}
                      </span>
                      <h5 className="font-label text-sm uppercase tracking-widest font-bold text-on-surface">
                        {form.name}
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.sizes.map((size) => (
                        <span
                          key={size}
                          className="text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    {form.gangsoNote && (
                      <p className="text-xs text-primary italic mt-3 border-l-2 border-primary/30 pl-3">
                        {form.gangsoNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Finishes */}
            <div>
              <h4 className="font-headline text-xl text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">texture</span>
                Surface Finishes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.finishes.map((finish) => (
                  <div key={finish.name} className="flex items-start gap-3 py-3">
                    <span
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        finish.type === "polished"
                          ? "bg-primary"
                          : "bg-outline-variant border-2 border-on-surface-variant"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-label text-sm font-bold text-on-surface">
                          {finish.name}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold ${
                            finish.type === "polished"
                              ? "bg-primary/10 text-primary"
                              : "bg-surface-container text-on-surface-variant"
                          }`}
                        >
                          {finish.type === "polished" ? "Polished" : "Non-Polished"}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">{finish.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-surface-container-low p-4 rounded-[0.125rem] text-center"
                >
                  <p className="font-headline text-lg text-on-surface">{spec.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1 font-label font-bold">
                    {spec.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Popular varieties */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs text-on-surface-variant font-label uppercase tracking-widest mr-2 self-center">
                Popular:
              </span>
              {product.varieties.map((v) => (
                <span
                  key={v}
                  className="text-xs border border-outline-variant/30 px-4 py-1.5 rounded-full text-on-surface hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  {v}
                </span>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-4 rounded-[0.125rem] font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-colors"
            >
              Browse {product.name} Collection
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
