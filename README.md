# 📇 DevStream

A sleek, developer-focused app built with **Next.js 14 App Router** that lets users:

- Upload their resume
- Automatically generate a clean, recruiter-ready **timeline-based portfolio**
- Preview & showcase their developer journey (GitHub integration coming soon)

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
---

## 🚀 Features

- 🖼️ Drag-and-drop resume uploader
- 🧭 Timeline-style portfolio UI
- 🎨 Tailwind CSS + Heroicons
- 🌗 Dark mode support
- 🔌 Ready for API integration
- 🔐 User authentication (coming soon)
- 📎 GitHub activity support (coming soon)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Language**: TypeScript

---

## 🧑‍💻 Local Development

### 1. Clone the repo

```bash
git clone https://github.com/akshatparashar22/devstream.git
cd devstream
```

---
### 1. Intall dependencies
``` bash
pnpm i
```

---
### 3. Start the dev server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev  # recommended
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
---
## 📁 Folder Structure (Partial)
```bash
/app
  /ui             → Fonts + Components
  /page.tsx       → Landing page + uploader
  /layout.tsx     → Root layout
  /globals.css    → Tailwind + global css
/public           → Assets like icons/images

```
