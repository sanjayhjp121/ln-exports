"use client";

import { useState, FormEvent } from "react";

interface EnquiryFormProps {
  productTitle?: string;
}

export default function EnquiryForm({ productTitle }: EnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "laxminath2005@yahoo.com";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const userEmail = data.get("email") as string;
    const phone = data.get("phone") as string;
    const message = data.get("message") as string;
    const product = data.get("product") as string;

    const subject = product
      ? `Enquiry: ${product}`
      : "Stone Catalog Enquiry";

    const body = `Name: ${name}
Email: ${userEmail}
Phone: ${phone}
${product ? `Product: ${product}\n` : ""}
Message:
${message}`;

    // Open email client as fallback
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {productTitle && (
        <input type="hidden" name="product" value={productTitle} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enq-name" className="block text-sm font-medium text-stone-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-name"
            name="name"
            type="text"
            required
            placeholder="John Smith"
            className="w-full border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 placeholder:text-stone-400"
          />
        </div>
        <div>
          <label htmlFor="enq-email" className="block text-sm font-medium text-stone-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 placeholder:text-stone-400"
          />
        </div>
      </div>
      <div>
        <label htmlFor="enq-phone" className="block text-sm font-medium text-stone-700 mb-1">
          Phone / WhatsApp
        </label>
        <input
          id="enq-phone"
          name="phone"
          type="tel"
          placeholder="+91 98765 43210"
          className="w-full border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 placeholder:text-stone-400"
        />
      </div>
      <div>
        <label htmlFor="enq-message" className="block text-sm font-medium text-stone-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="enq-message"
          name="message"
          required
          rows={4}
          placeholder={productTitle ? `I'm interested in ${productTitle}. Please send pricing and availability...` : "Tell us what you're looking for..."}
          className="w-full border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 placeholder:text-stone-400 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-400 text-white font-medium py-3 rounded-md transition-colors text-sm tracking-wide"
      >
        {status === "sending" ? "Opening email client..." : status === "sent" ? "Enquiry Sent!" : "Send Enquiry"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-green-700 text-center">
          Your email client should have opened. We look forward to hearing from you!
        </p>
      )}
    </form>
  );
}
