"use client";

import { useState } from "react";
import Link from "next/link";

interface Material {
  id: string;
  name: string;
  image: string;
  desc: string;
  href: string;
}

const MATERIALS: Material[] = [
  {
    id: "granite",
    name: "Granite",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgJRhbxAKqMijDIu5rkuzslBm4VyjNRvjRymvBLU3pz0WrLlYCYgBtMMEy5lPXptqIgFZtP4ZZzHOxnThTKH29IlRrQeG0kzMf8Cb0M8j_Gq3rNwabXqGYNIYoIfhqeNy6el_gXFz15N429zLWgwdFzInz5Qh1eGeXqncR4Mzmp5or7zuSJECkv18zILPw2iTyxIVDcXWCMizPO6kt771QwpuPwTiOdflztv1MAKN01OpGpot0pCI8rP1GmFliKhzTBcIAtGAlfj",
    desc: "Igneous rock, 6–7 Mohs hardness",
    href: "/products?category=granite",
  },
  {
    id: "marble",
    name: "Marble",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb",
    desc: "Metamorphic, luminous veining",
    href: "/products?category=marble",
  },
  {
    id: "tiles",
    name: "Tiles",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5hkcytrl-wZhEDxlc1xevakHj2iaZaZ9ONiJrB8mYB2wvh7lZa0vcS1eE_W_YChMLxgapspcuxmnuYPasdO6w8z3McVUQ_5DiLOvWdsY1SLUlyu-vfzrCOcA74veEs76N5_9_zQBPWjKbMEU4ZVnqvFz_GO6mfeYnlbg-K70i8ac0v9c7ss9-nUfUJSJzvVAlR0GdKbZa32HVcfe5zFHwd3XAw-4wHdr5MhYyjP1i_th1290ZNF7LhjP1j4eyQcZ8DHu0OMVC-8vz",
    desc: "Vitrified · Porcelain · Wall · Digital",
    href: "/products?category=tiles",
  },
  {
    id: "sandstone",
    name: "Sandstone",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoXdMRFWWdJnULQ_TXmGh2TVcepmAHvF_eB9_047fjgCnsUI4fVe0y4ISpTrqL3JGBZlEwkal9RYuD-plObgw-CzgiabgrytCVPhMvOf00quAX9V-w15Zr_c-20YA6fTLQWEdyQS0ihczVjwp4Fck7q0xpzI2iZHgcBAuM0YQuKjO2hypZMaFU9G4duZxSLlDWpQejONNO6w9h-b3vdP5k3zroc0Ae5nrcJO3pPfxqb3sSdOg7dLBvEqV8yAaz7DBKAZqpFXEEaNjJ",
    desc: "Sedimentary, warm earth tones",
    href: "/products?category=sandstone",
  },
  {
    id: "limestone",
    name: "Limestone",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp",
    desc: "Soft elegance, classic warmth",
    href: "/products?category=limestone",
  },
  {
    id: "engineered-quartzite",
    name: "Engineered Quartzite",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWADQJ93A_02JzVzfXairNl2k3sBWCR-OF25CkoQi8YaZyERa3jl5IcHuYJQfFS-TiRWBl_spJlBoVtZswWEWewiyzKNAQiZKEvtpbnHBp1GeJZBojFNnf_Y8oU1Hbn0jeK1DqCKTGozxUw475YWG0-y8rVIH9Ed17UAQhhZh5i4qxL8O4uXI7t4y6Xu0YdOj2ouWZEQ5yj9jKB-oU2rF9cWPE5jy2earABliIETnc6T_QAGcEkLzIQ-cnDWvxYn9R4msTReviQnZo",
    desc: "Non-porous, zero maintenance",
    href: "/products?category=quartzite",
  },
  {
    id: "slatestone",
    name: "Slatestone",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp49VmZPdLRgHIqsOWIaRoRRMQ406jSBZiLLBA8mgML1N2e0epW9munvCjCUk5ArptJy125mmQvtG7D69Jal5tMg0PF_q-k97e70L9yuNb32YclpM74MdoyZVO-Czh8Q_Ig5QdCQT1IkqQ9-yuR9zqY5MDnM-ZdrizKz_76ZNyWkybOB3_03_yZz4ImR6wTz0S1VSZrZyIxx6Jlc4FfATfl1NYJUteOhuKfp3KdVLPtEaOD6BPWA6KkAAalkc396vIfianIvE8ampw",
    desc: "Foliated, natural cleft surface",
    href: "/products?category=slatestone",
  },
  {
    id: "quartzite-stone",
    name: "Quartzite Stone",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3wfKsRnyUwuCsV9tcnO8Ap0Gmcyya0_2Fy-CVXO3HDWEym8jkMWbaVNyEfVJ0Wpcfo3dJksYt6j055hXothBgB7HY-fli63n9UUqwUddit9MBtU1JKe_fe6StUbHaZ1XFsIjU095855BZ2zCtn9XcXknn4n2tTJg3ffHN8kmrt69LAGBrceqaDqFnInYMQN7UDi1cp2S3nyDimN3HmXq8FQp44EQOt-yG1SPi0rQ3QnbnftpHtrr7zt9N9nQ6o-PxYYIpI0J_W7Bf",
    desc: "Natural quartz, extreme hardness",
    href: "/products?category=quartzite-stone",
  },
  {
    id: "pebbles-cobbles",
    name: "Pebbles & Cobbles",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZveG7RI4m7vmnEEcJRuHckPIr7q6r2gRuax5NJheW5ZHWsksBGVNhu4cxKhLVB7ovL9vapFUNhpW_DXn8-5-liGdFrM28ju3kQpuhWr-NHObA9qOqQXKCebVhhtbMhHVutb1gWBAQi6TOwAxQJSLEbjJgm1BviLWhVApjuoF9Zx6-m--d2xwse-Lmbb30ynNDQqklc1RyU-yUodKcy-fMLoIiVKG0SF2ViVxgtxiFy3y-U8tLsFh0uLHFgrq23DA17At5_6GdrMQ",
    desc: "Landscaping & pathway stones",
    href: "/products?category=pebbles-cobbles",
  },
  {
    id: "panels",
    name: "Panels",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh2f1dIiZdtOy15POc1ZxLpwu69j_OnGJcbG2lrlyDu4EAqnfsYJq1U8qaE4oVXdQRE3rvf8UOEmJzfp9axbops62Biu6ZfCymWEo1zwg8Tah4QXeJw6Sy5YcJCu3U9kCr30H5WaSoqBHu2WkxhByhTbDOUmF4Fh7CC1Gcm8-sk6eF8EYecsOa5r0znbCHUFLnt4NEQ6tOOAxvlO_aiBGSalRDKrbplYkoETXPhdPgzLuPrpbckWBNk_k8udfzYxcuE8bG6FcVvfxZ",
    desc: "Wall panels & feature cladding",
    href: "/products?category=panels",
  },
  {
    id: "mosaics",
    name: "Mosaic Tiles",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb",
    desc: "Intricate patterns & accents",
    href: "/products?category=mosaics",
  },
];

export default function MaterialGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-transparent relative">
      <div className="container mx-auto px-8 md:px-24">
        <div className="mb-16 space-y-4">
          <span className="text-primary font-label text-xs uppercase tracking-[0.4em] font-bold">
            What We Offer
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface">Material Gallery</h2>
          <p className="text-on-surface-variant max-w-2xl font-light text-lg">
            A curated selection of the Earth&apos;s finest minerals — from granite slabs
            to mosaic accents — graded for architectural permanence.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {MATERIALS.map((mat) => (
            <Link
              key={mat.id}
              href={mat.href}
              className="group relative overflow-hidden rounded-[0.125rem] aspect-[3/4] block"
              onMouseEnter={() => setHoveredId(mat.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mat.image}
                alt={mat.name}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  hoveredId && hoveredId !== mat.id ? "brightness-50 scale-100" : "brightness-100 group-hover:scale-110"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <h3 className="font-headline text-base md:text-lg text-white leading-tight">{mat.name}</h3>
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-label leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {mat.desc}
                </p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-white/70 text-lg">arrow_outward</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-outline-variant/30 text-on-surface px-10 py-4 rounded-[0.125rem] font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-on-primary hover:border-primary transition-colors"
          >
            View All Products
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
