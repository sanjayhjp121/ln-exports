import EnquiryForm from "@/components/EnquiryForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with LN Exports — email laxminath2005@yahoo.com or call +91 9820105837 for pricing, availability or custom stone orders.",
};

const CONTACT = {
  email: "laxminath2005@yahoo.com",
  phone1: "+91 9820105837",
  phone2: "+91 9920105837",
  whatsapp: "919820105837",
  website: "www.lnexports.com",
};

export default function ContactPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-stone-900 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Get In Touch
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-stone-400 mt-2 text-sm max-w-xl">
            Looking for a specific stone? Need a custom size or finish? Our team is ready to help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-stone-800 mb-5">Reach Us Directly</h2>
              <div className="space-y-4">

                {/* Email */}
                <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors mt-0.5">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 font-medium tracking-wide uppercase mb-0.5">Email</div>
                    <div className="text-sm text-stone-700 group-hover:text-amber-700 transition-colors">
                      {CONTACT.email}
                    </div>
                  </div>
                </a>

                {/* Phone 1 */}
                <a href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors mt-0.5">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 font-medium tracking-wide uppercase mb-0.5">Mobile</div>
                    <div className="text-sm text-stone-700 group-hover:text-amber-700 transition-colors">
                      {CONTACT.phone1}
                    </div>
                  </div>
                </a>

                {/* Phone 2 */}
                <a href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors mt-0.5">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 font-medium tracking-wide uppercase mb-0.5">
                      Alternate Mobile
                    </div>
                    <div className="text-sm text-stone-700 group-hover:text-amber-700 transition-colors">
                      {CONTACT.phone2}
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 font-medium tracking-wide uppercase mb-0.5">WhatsApp</div>
                    <div className="text-sm text-stone-700 group-hover:text-green-700 transition-colors">
                      {CONTACT.phone1}
                    </div>
                    <div className="text-xs text-stone-400">Typically replies within 1 hour</div>
                  </div>
                </a>

                {/* Website */}
                <a
                  href={`https://${CONTACT.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors mt-0.5">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 font-medium tracking-wide uppercase mb-0.5">Website</div>
                    <div className="text-sm text-stone-700 group-hover:text-amber-700 transition-colors">
                      {CONTACT.website}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* What to expect */}
            <div className="bg-white rounded-xl border border-stone-100 p-5">
              <h3 className="text-sm font-semibold text-stone-700 mb-3">What happens next?</h3>
              <ol className="space-y-2.5 text-sm text-stone-600">
                {[
                  "We review your enquiry within 24 hours",
                  "Our team sends you product samples & pricing",
                  "We arrange a call or virtual meeting if needed",
                  "Confirm your order — we handle the rest",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-stone-800 mb-1">Send an Enquiry</h2>
            <p className="text-stone-500 text-sm mb-6">
              Tell us about your project and we&apos;ll help you find the perfect stone.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
