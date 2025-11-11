# Quick Setup Guide for Joëlle Shekinah Memorial Website

## Step 1: View the Website Locally

The website is already built and ready to view! To see it:

```bash
cd C:\PROJ\joel-shekinah-memorial
npm run dev
```

Then open your browser and go to: http://localhost:3000

Press `Ctrl+C` in the terminal to stop the server when done.

## Step 2: Add Photos

### Where to Put Photos

All photos should go in the `public/images` folder. Create these subfolders:

```
public/images/
├── childhood/       (Photos from 1984-2000s)
├── education/       (School and university photos)
├── professional/    (Conference and work photos)
├── wedding/         (Wedding photos from 2016)
├── family/          (Photos with Kelilah, Daniela, Precious)
└── celebrations/    (Special occasions)
```

### How to Create These Folders

**Windows (File Explorer):**
1. Navigate to `C:\PROJ\joel-shekinah-memorial\public\images`
2. Right-click → New → Folder
3. Create folders: childhood, education, professional, wedding, family, celebrations

**Using Command Line:**
```bash
cd C:\PROJ\joel-shekinah-memorial\public
mkdir images\childhood images\education images\professional images\wedding images\family images\celebrations
```

### Adding Photos to the Website

After placing photos in these folders, you'll need to update the PhotoGallery component:

1. Open `components\PhotoGallery.tsx` in a text editor
2. Find the section you want to add photos to (e.g., "Childhood Years")
3. Replace the placeholder `<div>` with image code

**Example - Adding childhood photos:**

Find this section:
```tsx
{/* Photo placeholder */}
<div className="relative h-64 bg-gradient-to-br from-[#c4a585]/20 to-[#8b7355]/20 flex items-center justify-center">
  ...
</div>
```

Replace with:
```tsx
<div className="relative h-64">
  <img
    src="/images/childhood/photo1.jpg"
    alt="Joëlle as a child in Bertoua"
    className="w-full h-full object-cover"
  />
</div>
```

## Step 3: Add LinkedIn Profile

1. Open `components\Professional.tsx`
2. Find line with `href="#"` (around line 120)
3. Replace with actual LinkedIn URL:

```tsx
<a
  href="https://www.linkedin.com/in/joelle-k-70949880/"
  className="inline-flex items-center gap-2 ..."
>
```

## Step 4: Customize Content (Optional)

All content can be edited in the `components` folder:

- **Hero.tsx** - Main header with photo and introduction
- **Biography.tsx** - Full life story
- **Timeline.tsx** - Life events (add/edit events here)
- **Professional.tsx** - Career and education info
- **PhotoGallery.tsx** - Photo sections
- **Footer.tsx** - Bottom of page

## Step 5: Deploy Online

### Option A: Vercel (Easiest - Free)

**What you need:**
- GitHub account
- This project pushed to GitHub

**Steps:**

1. **Create GitHub account** (if you don't have one):
   - Go to https://github.com
   - Click "Sign up"

2. **Install Git** (if not installed):
   - Download from https://git-scm.com/download/win
   - Install with default settings

3. **Push project to GitHub:**
   ```bash
   cd C:\PROJ\joel-shekinah-memorial
   git init
   git add .
   git commit -m "Initial memorial website"

   # Create a new repository on GitHub.com first, then:
   git remote add origin https://github.com/YOUR-USERNAME/joel-shekinah-memorial.git
   git push -u origin main
   ```

4. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Sign Up" → "Continue with GitHub"
   - Click "New Project"
   - Select your `joel-shekinah-memorial` repository
   - Click "Deploy"
   - Wait ~2 minutes for deployment

Your website will be live at: `https://joel-shekinah-memorial.vercel.app` (or similar)

### Option B: Netlify (Alternative - Free)

Very similar to Vercel:

1. Push code to GitHub (same as above)
2. Go to https://netlify.com
3. Sign up with GitHub
4. Click "Add new site" → "Import an existing project"
5. Select your repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy"

### Option C: Custom Domain

If you have your own domain:

1. Build static version:

   Edit `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
   };
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Upload the `out` folder contents to your web host via FTP

## Step 6: Making Updates After Deployment

### If using Vercel/Netlify:

1. Make changes to your files locally
2. Test with `npm run dev`
3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Updated photos and content"
   git push
   ```
4. Vercel/Netlify will automatically rebuild and redeploy (takes ~2 minutes)

## Common Tasks

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --background: #fdfcf9;      /* Main background */
  --foreground: #2c2c2c;      /* Text color */
  --accent: #8b7355;          /* Primary accent color */
  --accent-light: #c4a585;    /* Light accent */
  --soft-gray: #f5f3f0;       /* Soft background */
}
```

### Add a New Timeline Event

Edit `components/Timeline.tsx`, add to the `events` array:
```typescript
{
  year: "2025",
  date: "December 25, 2025",
  title: "Memorial Event",
  description: "Description of the event",
  location: "Buea, Cameroon",
  category: 'memorial'
}
```

### Update Biography

Edit `components/Biography.tsx` - add or modify the text sections.

## Troubleshooting

**"npm: command not found"**
- Install Node.js from https://nodejs.org
- Choose the LTS version
- Restart your terminal

**Build errors:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
# Opens on http://localhost:3001 instead
```

**Changes not showing:**
- Stop the dev server (Ctrl+C)
- Clear browser cache (Ctrl+Shift+Delete)
- Restart: `npm run dev`

## Need Help?

1. Check the main `README.md` file
2. Visit Next.js docs: https://nextjs.org/docs
3. Visit Tailwind docs: https://tailwindcss.com/docs

---

**Note:** This guide assumes basic familiarity with using the command line. If you're not comfortable with these steps, consider asking a technically inclined family member or friend to help with the initial setup and deployment.

All code and instructions have been documented so that anyone can pick up where you left off.
