"use client";

import { useState, useCallback, useEffect } from "react";

const USE_CASE_IMAGES = {
  kitchen: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAh2f1dIiZdtOy15POc1ZxLpwu69j_OnGJcbG2lrlyDu4EAqnfsYJq1U8qaE4oVXdQRE3rvf8UOEmJzfp9axbops62Biu6ZfCymWEo1zwg8Tah4QXeJw6Sy5YcJCu3U9kCr30H5WaSoqBHu2WkxhByhTbDOUmF4Fh7CC1Gcm8-sk6eF8EYecsOa5r0znbCHUFLnt4NEQ6tOOAxvlO_aiBGSalRDKrbplYkoETXPhdPgzLuPrpbckWBNk_k8udfzYxcuE8bG6FcVvfxZ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWADQJ93A_02JzVzfXairNl2k3sBWCR-OF25CkoQi8YaZyERa3jl5IcHuYJQfFS-TiRWBl_spJlBoVtZswWEWewiyzKNAQiZKEvtpbnHBp1GeJZBojFNnf_Y8oU1Hbn0jeK1DqCKTGozxUw475YWG0-y8rVIH9Ed17UAQhhZh5i4qxL8O4uXI7t4y6Xu0YdOj2ouWZEQ5yj9jKB-oU2rF9cWPE5jy2earABliIETnc6T_QAGcEkLzIQ-cnDWvxYn9R4msTReviQnZo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgJRhbxAKqMijDIu5rkuzslBm4VyjNRvjRymvBLU3pz0WrLlYCYgBtMMEy5lPXptqIgFZtP4ZZzHOxnThTKH29IlRrQeG0kzMf8Cb0M8j_Gq3rNwabXqGYNIYoIfhqeNy6el_gXFz15N429zLWgwdFzInz5Qh1eGeXqncR4Mzmp5or7zuSJECkv18zILPw2iTyxIVDcXWCMizPO6kt771QwpuPwTiOdflztv1MAKN01OpGpot0pCI8rP1GmFliKhzTBcIAtGAlfj",
  ],
  flooring: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAp49VmZPdLRgHIqsOWIaRoRRMQ406jSBZiLLBA8mgML1N2e0epW9munvCjCUk5ArptJy125mmQvtG7D69Jal5tMg0PF_q-k97e70L9yuNb32YclpM74MdoyZVO-Czh8Q_Ig5QdCQT1IkqQ9-yuR9zqY5MDnM-ZdrizKz_76ZNyWkybOB3_03_yZz4ImR6wTz0S1VSZrZyIxx6Jlc4FfATfl1NYJUteOhuKfp3KdVLPtEaOD6BPWA6KkAAalkc396vIfianIvE8ampw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB5hkcytrl-wZhEDxlc1xevakHj2iaZaZ9ONiJrB8mYB2wvh7lZa0vcS1eE_W_YChMLxgapspcuxmnuYPasdO6w8z3McVUQ_5DiLOvWdsY1SLUlyu-vfzrCOcA74veEs76N5_9_zQBPWjKbMEU4ZVnqvFz_GO6mfeYnlbg-K70i8ac0v9c7ss9-nUfUJSJzvVAlR0GdKbZa32HVcfe5zFHwd3XAw-4wHdr5MhYyjP1i_th1290ZNF7LhjP1j4eyQcZ8DHu0OMVC-8vz",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp",
  ],
  bathroom: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC3wfKsRnyUwuCsV9tcnO8Ap0Gmcyya0_2Fy-CVXO3HDWEym8jkMWbaVNyEfVJ0Wpcfo3dJksYt6j055hXothBgB7HY-fli63n9UUqwUddit9MBtU1JKe_fe6StUbHaZ1XFsIjU095855BZ2zCtn9XcXknn4n2tTJg3ffHN8kmrt69LAGBrceqaDqFnInYMQN7UDi1cp2S3nyDimN3HmXq8FQp44EQOt-yG1SPi0rQ3QnbnftpHtrr7zt9N9nQ6o-PxYYIpI0J_W7Bf",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB5hkcytrl-wZhEDxlc1xevakHj2iaZaZ9ONiJrB8mYB2wvh7lZa0vcS1eE_W_YChMLxgapspcuxmnuYPasdO6w8z3McVUQ_5DiLOvWdsY1SLUlyu-vfzrCOcA74veEs76N5_9_zQBPWjKbMEU4ZVnqvFz_GO6mfeYnlbg-K70i8ac0v9c7ss9-nUfUJSJzvVAlR0GdKbZa32HVcfe5zFHwd3XAw-4wHdr5MhYyjP1i_th1290ZNF7LhjP1j4eyQcZ8DHu0OMVC-8vz",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgJRhbxAKqMijDIu5rkuzslBm4VyjNRvjRymvBLU3pz0WrLlYCYgBtMMEy5lPXptqIgFZtP4ZZzHOxnThTKH29IlRrQeG0kzMf8Cb0M8j_Gq3rNwabXqGYNIYoIfhqeNy6el_gXFz15N429zLWgwdFzInz5Qh1eGeXqncR4Mzmp5or7zuSJECkv18zILPw2iTyxIVDcXWCMizPO6kt771QwpuPwTiOdflztv1MAKN01OpGpot0pCI8rP1GmFliKhzTBcIAtGAlfj",
  ],
  wallCladding: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoXdMRFWWdJnULQ_TXmGh2TVcepmAHvF_eB9_047fjgCnsUI4fVe0y4ISpTrqL3JGBZlEwkal9RYuD-plObgw-CzgiabgrytCVPhMvOf00quAX9V-w15Zr_c-20YA6fTLQWEdyQS0ihczVjwp4Fck7q0xpzI2iZHgcBAuM0YQuKjO2hypZMaFU9G4duZxSLlDWpQejONNO6w9h-b3vdP5k3zroc0Ae5nrcJO3pPfxqb3sSdOg7dLBvEqV8yAaz7DBKAZqpFXEEaNjJ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWADQJ93A_02JzVzfXairNl2k3sBWCR-OF25CkoQi8YaZyERa3jl5IcHuYJQfFS-TiRWBl_spJlBoVtZswWEWewiyzKNAQiZKEvtpbnHBp1GeJZBojFNnf_Y8oU1Hbn0jeK1DqCKTGozxUw475YWG0-y8rVIH9Ed17UAQhhZh5i4qxL8O4uXI7t4y6Xu0YdOj2ouWZEQ5yj9jKB-oU2rF9cWPE5jy2earABliIETnc6T_QAGcEkLzIQ-cnDWvxYn9R4msTReviQnZo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAp49VmZPdLRgHIqsOWIaRoRRMQ406jSBZiLLBA8mgML1N2e0epW9munvCjCUk5ArptJy125mmQvtG7D69Jal5tMg0PF_q-k97e70L9yuNb32YclpM74MdoyZVO-Czh8Q_Ig5QdCQT1IkqQ9-yuR9zqY5MDnM-ZdrizKz_76ZNyWkybOB3_03_yZz4ImR6wTz0S1VSZrZyIxx6Jlc4FfATfl1NYJUteOhuKfp3KdVLPtEaOD6BPWA6KkAAalkc396vIfianIvE8ampw",
  ],
  staircase: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgJRhbxAKqMijDIu5rkuzslBm4VyjNRvjRymvBLU3pz0WrLlYCYgBtMMEy5lPXptqIgFZtP4ZZzHOxnThTKH29IlRrQeG0kzMf8Cb0M8j_Gq3rNwabXqGYNIYoIfhqeNy6el_gXFz15N429zLWgwdFzInz5Qh1eGeXqncR4Mzmp5or7zuSJECkv18zILPw2iTyxIVDcXWCMizPO6kt771QwpuPwTiOdflztv1MAKN01OpGpot0pCI8rP1GmFliKhzTBcIAtGAlfj",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC3wfKsRnyUwuCsV9tcnO8Ap0Gmcyya0_2Fy-CVXO3HDWEym8jkMWbaVNyEfVJ0Wpcfo3dJksYt6j055hXothBgB7HY-fli63n9UUqwUddit9MBtU1JKe_fe6StUbHaZ1XFsIjU095855BZ2zCtn9XcXknn4n2tTJg3ffHN8kmrt69LAGBrceqaDqFnInYMQN7UDi1cp2S3nyDimN3HmXq8FQp44EQOt-yG1SPi0rQ3QnbnftpHtrr7zt9N9nQ6o-PxYYIpI0J_W7Bf",
  ],
  facade: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZveG7RI4m7vmnEEcJRuHckPIr7q6r2gRuax5NJheW5ZHWsksBGVNhu4cxKhLVB7ovL9vapFUNhpW_DXn8-5-liGdFrM28ju3kQpuhWr-NHObA9qOqQXKCebVhhtbMhHVutb1gWBAQi6TOwAxQJSLEbjJgm1BviLWhVApjuoF9Zx6-m--d2xwse-Lmbb30ynNDQqklc1RyU-yUodKcy-fMLoIiVKG0SF2ViVxgtxiFy3y-U8tLsFh0uLHFgrq23DA17At5_6GdrMQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoXdMRFWWdJnULQ_TXmGh2TVcepmAHvF_eB9_047fjgCnsUI4fVe0y4ISpTrqL3JGBZlEwkal9RYuD-plObgw-CzgiabgrytCVPhMvOf00quAX9V-w15Zr_c-20YA6fTLQWEdyQS0ihczVjwp4Fck7q0xpzI2iZHgcBAuM0YQuKjO2hypZMaFU9G4duZxSLlDWpQejONNO6w9h-b3vdP5k3zroc0Ae5nrcJO3pPfxqb3sSdOg7dLBvEqV8yAaz7DBKAZqpFXEEaNjJ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb",
  ],
};

interface UseCase {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  gallery: string[];
  materials: string[];
  featured?: boolean;
}

const USE_CASES: UseCase[] = [
  {
    id: "kitchen",
    title: "Kitchen Countertops",
    subtitle: "Our #1 application — durable surfaces that withstand daily use while elevating your culinary space.",
    icon: "countertops",
    image: USE_CASE_IMAGES.kitchen[0],
    gallery: USE_CASE_IMAGES.kitchen,
    materials: ["Granite", "Marble", "Quartz"],
    featured: true,
  },
  {
    id: "flooring",
    title: "Floorings",
    subtitle: "Large-format tiles and slabs that ground expansive spaces with crystalline depth and permanence.",
    icon: "grid_on",
    image: USE_CASE_IMAGES.flooring[0],
    gallery: USE_CASE_IMAGES.flooring,
    materials: ["Granite", "Marble", "Vitrified Tiles"],
    featured: true,
  },
  {
    id: "bathroom",
    title: "Bathrooms",
    subtitle: "Transform private spaces into serene retreats with moisture-resistant stone and tile.",
    icon: "bathroom",
    image: USE_CASE_IMAGES.bathroom[0],
    gallery: USE_CASE_IMAGES.bathroom,
    materials: ["Marble", "Vitrified Tiles", "Quartz"],
  },
  {
    id: "wall-cladding",
    title: "Wall Cladding",
    subtitle: "Accent walls and full-height applications that add depth and luxury to any room.",
    icon: "view_quilt",
    image: USE_CASE_IMAGES.wallCladding[0],
    gallery: USE_CASE_IMAGES.wallCladding,
    materials: ["Marble", "Granite", "Vitrified Tiles"],
  },
  {
    id: "staircase",
    title: "Staircases",
    subtitle: "Grand entrances with polished stone treads and risers that command attention.",
    icon: "stairs",
    image: USE_CASE_IMAGES.staircase[0],
    gallery: USE_CASE_IMAGES.staircase,
    materials: ["Granite", "Marble"],
  },
  {
    id: "facade",
    title: "Facades & Exteriors",
    subtitle: "Weather-resistant cladding that protects while making an architectural statement.",
    icon: "apartment",
    image: USE_CASE_IMAGES.facade[0],
    gallery: USE_CASE_IMAGES.facade,
    materials: ["Granite", "Marble"],
  },
];

export default function UseCases() {
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = useCallback((uc: UseCase) => {
    setSelectedCase(uc);
    setGalleryIndex(0);
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedCase(null);
  }, []);

  const navigateGallery = useCallback(
    (dir: "prev" | "next") => {
      if (!selectedCase) return;
      const len = selectedCase.gallery.length;
      setGalleryIndex((i) => (dir === "next" ? (i + 1) % len : (i - 1 + len) % len));
    },
    [selectedCase]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedCase) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") navigateGallery("prev");
      if (e.key === "ArrowRight") navigateGallery("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedCase, closeGallery, navigateGallery]);

  return (
    <section id="use-cases" className="py-32 bg-surface-container-lowest/50 backdrop-blur-sm">
      <div className="container mx-auto px-8 md:px-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-primary font-label text-xs uppercase tracking-[0.4em] font-bold">
            Applications
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface mt-2">
            Designed for Every Space
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 font-light text-lg">
            From kitchen countertops to grand facades — click any application to explore
            detailed project images.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {USE_CASES.map((uc) => (
            <div
              key={uc.id}
              className={`relative group cursor-pointer overflow-hidden rounded-[0.125rem] ${
                uc.featured ? "md:col-span-6 h-[500px]" : "md:col-span-4 h-[360px]"
              }`}
              onClick={() => openGallery(uc)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uc.image}
                alt={uc.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary-fixed text-2xl">
                    {uc.icon}
                  </span>
                  {uc.featured && (
                    <span className="text-[9px] uppercase tracking-widest bg-primary text-on-primary px-3 py-1 font-bold rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>
                <h3 className="font-headline text-2xl text-white">{uc.title}</h3>
                <p className="text-white/70 text-sm mt-2 max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {uc.subtitle}
                </p>
                <div className="flex gap-2 mt-4">
                  {uc.materials.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] uppercase tracking-widest text-white/60 border border-white/20 px-2 py-0.5"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="material-symbols-outlined text-sm">photo_library</span>
                  Click to view {uc.gallery.length} project images
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
          onClick={closeGallery}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            onClick={closeGallery}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {/* Title bar */}
          <div className="absolute top-6 left-6 z-10">
            <h3 className="font-headline text-xl text-white">{selectedCase.title}</h3>
            <p className="text-white/50 text-sm mt-1">
              {galleryIndex + 1} of {selectedCase.gallery.length} images
            </p>
          </div>

          {/* Main image */}
          <div
            className="relative w-full max-w-5xl px-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedCase.gallery[galleryIndex]}
              alt={`${selectedCase.title} - Image ${galleryIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("prev");
            }}
          >
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("next");
            }}
          >
            <span className="material-symbols-outlined text-white">arrow_forward</span>
          </button>

          {/* Thumbnails */}
          <div
            className="mt-6 flex gap-2 overflow-x-auto max-w-3xl px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedCase.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setGalleryIndex(idx)}
                className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                  idx === galleryIndex
                    ? "border-primary opacity-100 scale-105"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
