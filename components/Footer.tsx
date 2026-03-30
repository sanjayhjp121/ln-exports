export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 md:px-24 py-20 w-full max-w-[1920px] mx-auto">
        {/* Brand */}
        <div className="space-y-8">
          <div className="font-headline text-xl font-semibold text-stone-800 uppercase tracking-widest">
            LN EXPORTS
          </div>
          <p className="font-body text-sm tracking-tight text-stone-500 leading-relaxed max-w-xs">
            Curators of Indian geological excellence. Sourcing, processing, and exporting the world&apos;s most resilient artifacts.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Website" className="text-stone-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a href="mailto:info@lnexports.com" aria-label="Email" className="text-stone-400 hover:text-primary transition-colors">
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
          <ul className="space-y-3">
            {["Exotic Marbles", "Structural Granite", "Heritage Sandstone", "Architectural Slate"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="/products"
                    className="text-stone-500 font-body text-sm tracking-tight hover:translate-x-1 hover:text-stone-900 transition-all block"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
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
              className="w-full bg-transparent border-b border-stone-400 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-stone-400 text-stone-800"
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
