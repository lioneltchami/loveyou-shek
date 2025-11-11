# In Loving Memory of Joëlle Shekinah Tchami

A beautiful memorial website honoring the life and legacy of Joëlle Shekinah Tchami (December 19, 1984 - October 2025).

## About This Website

This memorial website celebrates the remarkable life of Joëlle Shekinah, an international conference interpreter, loving mother, and woman of faith. The website features:

- **Hero Section**: Beautiful introduction with photo placeholder
- **Biography**: Detailed life story covering all major events and accomplishments
- **Interactive Timeline**: Chronological journey through her life with categorized events
- **Professional Legacy**: Career highlights, education, and professional accomplishments
- **Photo Gallery**: Organized sections for photos from different life stages (to be populated)
- **LinkedIn Integration**: Link to professional profile

## Technology Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Build Tool**: Next.js built-in compiler

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)

### Installation

1. Navigate to the project folder:
```bash
cd joel-shekinah-memorial
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

### Starting the Production Server

After building, start the production server:
```bash
npm start
```

## Adding Photos

To add photos to the memorial website:

1. Place your photos in the `/public/images` folder
2. Organize them by category:
   - `childhood/` - Photos from childhood years
   - `education/` - School and university photos
   - `professional/` - Work and conference photos
   - `wedding/` - Wedding and marriage photos
   - `family/` - Family moments with children
   - `celebrations/` - Special occasions and gatherings

3. Update the PhotoGallery component (`/components/PhotoGallery.tsx`) to display the images

Example:
```tsx
// Replace the placeholder div with an actual image
<img
  src="/images/childhood/photo1.jpg"
  alt="Description"
  className="w-full h-64 object-cover"
/>
```

## Customization

### Adding LinkedIn Profile

To add the LinkedIn profile URL:

1. Open `/components/Professional.tsx`
2. Find the LinkedIn button (around line 120)
3. Replace the `href="#"` with the actual LinkedIn URL:
```tsx
<a href="https://www.linkedin.com/in/profile-url" ...>
```

### Updating Content

- **Hero Section**: Edit `/components/Hero.tsx`
- **Biography**: Edit `/components/Biography.tsx`
- **Timeline**: Edit `/components/Timeline.tsx` - Add/modify events in the `events` array
- **Professional Info**: Edit `/components/Professional.tsx`
- **Photo Gallery**: Edit `/components/PhotoGallery.tsx`
- **Footer**: Edit `/components/Footer.tsx`

### Styling

The website uses a warm, elegant color palette:
- Primary: `#8b7355` (warm brown)
- Accent: `#c4a585` (light tan)
- Background: `#fdfcf9` (off-white)
- Soft gray: `#f5f3f0`

To modify colors, update `/app/globals.css` and Tailwind class names in components.

## Project Structure

```
joel-shekinah-memorial/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Hero.tsx            # Hero section with photo and intro
│   ├── Biography.tsx       # Detailed life story
│   ├── Timeline.tsx        # Interactive timeline of life events
│   ├── Professional.tsx    # Career and education highlights
│   ├── PhotoGallery.tsx    # Photo gallery sections
│   └── Footer.tsx          # Footer with summary info
├── public/
│   └── images/            # Place photos here
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── next.config.ts        # Next.js configuration
```

## Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "New Project"
5. Import your GitHub repository
6. Click "Deploy"

Your website will be live at `https://your-project-name.vercel.app`

### Option 2: Netlify (Free)

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Sign up with GitHub
4. Click "Add new site" → "Import an existing project"
5. Select your repository
6. Build command: `npm run build`
7. Publish directory: `.next`
8. Click "Deploy"

### Option 3: Traditional Web Hosting

1. Build the project:
```bash
npm run build
```

2. Export as static site by updating `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
};
```

3. Build again - this creates an `out/` folder
4. Upload the contents of `out/` to your web hosting via FTP

## Maintenance

### Adding New Timeline Events

Edit `/components/Timeline.tsx` and add new entries to the `events` array:

```typescript
{
  year: "2025",
  date: "Optional specific date",
  title: "Event Title",
  description: "Event description",
  location: "Optional location",
  category: 'life' // or 'birth', 'education', 'career', 'family', 'miracle', 'memorial'
}
```

### Updating Biography

Edit `/components/Biography.tsx` to modify or add new sections to the life story.

## Support

For technical issues or questions about this memorial website:
- Review this README
- Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Check Tailwind CSS documentation: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## License

This is a private memorial website created for the Tchami family. All rights reserved.

---

**Created with love by the Tchami family**

*In loving memory of Joëlle Shekinah Tchami*
*December 19, 1984 - October 2025*

*Forever in our hearts*
