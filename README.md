# LN Exports — Natural Stone Catalog

A Next.js 16 (App Router) stone catalog website for marble, granite, sandstone and quartzite — powered by **Sanity CMS** and deployed on **Vercel**.

---

## Setup Guide

### 1. Create a Sanity project

1. Go to [sanity.io](https://sanity.io) and sign up / log in
2. Create a new project — choose "Production" dataset
3. Copy your **Project ID** from the project settings

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id   # from sanity.io
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=                                  # optional, for private datasets

NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210                # your WhatsApp number (no +)
NEXT_PUBLIC_COMPANY_EMAIL=info@yourcompany.com

REVALIDATION_SECRET=some_random_secret                  # used for ISR webhooks
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Open Sanity Studio

Go to [http://localhost:3000/studio](http://localhost:3000/studio) to add products and categories.

**Suggested categories to create first:** Marble, Granite, Sandstone, Quartzite, Limestone, Travertine

### 5. Deploy to Vercel

```bash
npx vercel --prod
```

Add all `.env.local` variables to Vercel project settings under **Settings → Environment Variables**.

### 6. Configure ISR webhook in Sanity (optional)

In Sanity → API → Webhooks, add a new webhook:
- URL: `https://your-domain.vercel.app/api/revalidate?secret=your_secret`
- Trigger on: Create, Update, Delete

---

## Project Structure

```
app/
  page.tsx                    # Home page
  products/
    page.tsx                  # Catalog listing
    [slug]/page.tsx           # Product detail
  contact/page.tsx            # Contact/enquiry page
  studio/[[...tool]]/page.tsx # Sanity Studio (embedded)
  api/revalidate/route.ts     # ISR revalidation endpoint
components/
  Navbar.tsx
  Footer.tsx
  ProductCard.tsx
  ImageGallery.tsx
  EnquiryForm.tsx
  WhatsAppButton.tsx
sanity/
  schemas/
    product.ts                # Product schema
    category.ts               # Category schema
  lib/
    client.ts                 # Sanity client
    image.ts                  # Image URL builder
    queries.ts                # GROQ queries
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
