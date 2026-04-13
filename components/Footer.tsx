const CONTACT = {
  email: "laxminath2005@yahoo.com",
  phone1: "+91 9820105837",
  phone2: "+91 9920105837",
  whatsapp: "919820105837",
  website: "www.lnexports.com",
};

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 md:px-24 py-20 w-full max-w-[1920px] mx-auto">
        {/* Brand */}
        <div className="space-y-6">
          <Image
            src="/logo.png"
            alt="LN Exports"
            width={120}
            height={120}
            className="h-20 w-auto object-contain"
          />
          <p className="font-body text-sm tracking-tight text-stone-500 leading-relaxed max-w-xs">
            Curators of Indian geological excellence. Sourcing, processing, and exporting the world&apos;s most resilient artifacts.
          </p>
          <div className="space-y-2 text-sm text-stone-500">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">mail</span>
              {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">phone</span>
              {CONTACT.phone1}
            </a>
            <a href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">phone</span>
              {CONTACT.phone2}
            </a>
            <a href={`https://${CONTACT.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">public</span>
              {CONTACT.website}
            </a>
          </div>
          <div className="flex gap-4 pt-2">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-stone-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chat</span>
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email" className="text-stone-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a href="#" aria-label="Documents" className="text-stone-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">description</span>
            </a>
          </div>
        </div>

        {/* Materials */}
        <div className="space-y-6">
          <h4 className="font-headline text-sm font-bold text-stone-800 uppercase tracking-widest">
            Materials
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Granite", href: "/products?category=granite" },
              { label: "Marble", href: "/products?category=marble" },
              { label: "Tiles", href: "/products?category=tiles" },
              { label: "Sandstone", href: "/products?category=sandstone" },
              { label: "Limestone", href: "/products?category=limestone" },
              { label: "Engineered Quartzite", href: "/products?category=quartzite" },
              { label: "Slatestone", href: "/products?category=slatestone" },
              { label: "Panels & Mosaics", href: "/products?category=panels" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-stone-500 font-body text-sm tracking-tight hover:translate-x-1 hover:text-stone-900 transition-all block"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <h4 className="font-headline text-sm font-bold text-stone-800 uppercase tracking-widest pt-4">
            Also Trading
          </h4>
          <ul className="space-y-3">
            {["TMT Bars & Steel", "Food Exports"].map((item) => (
              <li key={item}>
                <a
                  href="/contact"
                  className="text-stone-500 font-body text-sm tracking-tight hover:translate-x-1 hover:text-stone-900 transition-all block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-6">
          <h4 className="font-headline text-sm font-bold text-stone-800 uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-3">
            {[
              { label: "Global Presence", href: "/#logistics" },
              { label: "Shipping & Logistics", href: "/#logistics" },
              { label: "Stone Care Guide", href: "#" },
              { label: "Sourcing Ethics", href: "/#heritage" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-stone-500 font-body text-sm tracking-tight hover:translate-x-1 hover:text-stone-900 transition-all block"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="font-headline text-sm font-bold text-stone-800 uppercase tracking-widest">
            Newsletter
          </h4>
          <p className="text-stone-500 font-body text-xs tracking-tight">
            Receive seasonal sourcing updates and inventory alerts.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-stone-400 py-3 text-sm focus:outline-none focus:border-[#8B1515] transition-colors placeholder:text-stone-400 text-stone-800"
            />
            <button className="absolute right-0 bottom-3 text-primary uppercase font-bold text-[10px] tracking-widest">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 md:px-24 py-10 border-t border-stone-300 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1920px] mx-auto">
        <p className="text-stone-500 font-body text-xs tracking-tight">
          &copy; {new Date().getFullYear()} LN Exports. Crafted Heritage. All Rights Reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-stone-500 font-body text-xs tracking-tight hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-stone-500 font-body text-xs tracking-tight hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
