# Image Requirements for SEO & Social Media

This document outlines all the images needed for optimal SEO, social media sharing, and branding of the Joëlle Shekinah Memorial website.

## 📋 OVERVIEW

The following images are referenced in the website code but need to be created:

- **Favicon files** (for browser tabs and bookmarks)
- **Open Graph images** (for Facebook, LinkedIn, etc.)
- **Twitter Card images** (for Twitter/X sharing)
- **Apple Touch Icon** (for iOS devices)
- **Web Manifest Icon** (for PWA support)

---

## 🎨 REQUIRED IMAGES

### 1. Favicon Files

#### `public/favicon.ico`
- **Format**: ICO
- **Size**: 32×32px or 16×16px (multi-size ICO recommended)
- **Purpose**: Classic favicon for older browsers
- **Design**: Simple memorial symbol or initials "JST"

#### `public/icon.svg`
- **Format**: SVG
- **Purpose**: Modern, scalable favicon for modern browsers
- **Design**: Clean, recognizable symbol that works at small sizes
- **Example content**:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#8b7355"/>
  <text x="50" y="65" font-size="40" text-anchor="middle" fill="white" font-family="Georgia, serif">JS</text>
</svg>
```

---

### 2. Social Media Images

#### `public/images/og-image.jpg`
- **Dimensions**: 1200×630px (Required by Facebook/LinkedIn)
- **Format**: JPG or PNG
- **File Size**: Under 1MB (recommended under 300KB)
- **Purpose**: Image shown when sharing the website on Facebook, LinkedIn, WhatsApp
- **Design Suggestions**:
  - Use a beautiful photo of Joëlle
  - Add text overlay: "In Loving Memory of Joëlle Shekinah Tchami"
  - Include dates: "December 19, 1983 - October 2025"
  - Use the website's warm color palette (#8b7355)
  - Ensure text is readable at smaller sizes

#### `public/images/twitter-card.jpg`
- **Dimensions**: 1200×600px (Twitter's recommended size)
- **Format**: JPG or PNG
- **File Size**: Under 5MB (recommended under 1MB)
- **Purpose**: Image shown when sharing on Twitter/X
- **Design**: Can be similar to og-image.jpg but with 2:1 aspect ratio

---

### 3. Mobile & PWA Icons

#### `public/apple-touch-icon.png`
- **Dimensions**: 180×180px (Apple's recommended size)
- **Format**: PNG
- **Purpose**: Icon shown when website is saved to iOS home screen
- **Design**: Clean, simple design that works well at this size

#### `public/icon-192.png`
- **Dimensions**: 192×192px
- **Format**: PNG
- **Purpose**: Android home screen icon (part of PWA manifest)

#### `public/icon-512.png`
- **Dimensions**: 512×512px
- **Format**: PNG
- **Purpose**: High-resolution PWA icon for splash screens

---

## 🛠️ HOW TO CREATE THESE IMAGES

### Option 1: Using Canva (Recommended for beginners)
1. Go to [canva.com](https://canva.com)
2. Use these preset sizes:
   - "Facebook Post" (1200×630px) for og-image
   - "Twitter Post" (1200×600px) for twitter-card
   - "Logo" for icon files
3. Upload Joëlle's photo
4. Add text overlays with memorial information
5. Download as PNG/JPG

### Option 2: Using Photoshop/GIMP
1. Create new document with required dimensions
2. Import and position Joëlle's photo
3. Add text layers with memorial information
4. Export optimized for web (Save for Web in Photoshop)

### Option 3: Using Online Tools
- **Favicon Generator**: https://realfavicongenerator.net/
  - Upload a square image
  - It generates all favicon formats automatically

- **OG Image Generator**: https://www.opengraph.xyz/
  - Create beautiful Open Graph images with templates

### Option 4: Simple Placeholder (Temporary)
If you don't have photos yet, create simple text-based images:
1. Use solid color background (#8b7355 or #fdfcf9)
2. Add text: "In Loving Memory of Joëlle Shekinah Tchami"
3. Add dates and simple decorative elements

---

## 📝 DESIGN GUIDELINES

### Color Palette (from website)
- Primary: `#8b7355` (warm brown)
- Accent: `#c4a585` (light tan)
- Background: `#fdfcf9` (off-white)
- Text: `#2c2c2c` (dark gray)

### Typography
- Main font: Georgia, serif
- Elegant, readable, classic style

### Content to Include on Social Images
- Full name: "Joëlle Shekinah Tchami"
- Dates: "December 19, 1983 - October 2025"
- Title: "International Conference Interpreter"
- Optional: "Loving Mother | Faithful Believer"

---

## ✅ CHECKLIST

After creating images, verify:
- [ ] All files are in correct locations (`public/` folder)
- [ ] File sizes are optimized (compress images if needed)
- [ ] Images look good at various sizes
- [ ] Text is readable on social media previews
- [ ] Colors match website theme
- [ ] Test social sharing on Facebook, Twitter, LinkedIn

---

## 🧪 TESTING YOUR IMAGES

### Test Open Graph Images:
1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Enter your website URL
   - See how it will appear when shared

2. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
   - Check how your page appears on LinkedIn

3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Verify Twitter card is working correctly

### Test Favicons:
1. View your site in browser
2. Check the browser tab icon
3. Bookmark the page and check bookmark icon
4. Test on mobile devices (iOS and Android)

---

## 📦 QUICK START: Temporary Placeholders

If you need to deploy quickly without custom images, create simple placeholders:

### Temporary Favicon (SVG):
Save this to `public/icon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#8b7355"/>
  <text x="50" y="60" font-size="35" text-anchor="middle" fill="white" font-family="Georgia, serif" font-weight="bold">JS</text>
  <text x="50" y="85" font-size="12" text-anchor="middle" fill="#fdfcf9" font-family="Georgia, serif">1983-2025</text>
</svg>
```

### Temporary Social Image:
Use a service like [placeholder.com](https://placeholder.com) or create a simple colored rectangle with text using any image editor.

---

## 📞 NEED HELP?

If you need assistance creating these images:
1. Ask a family member with design skills
2. Hire a designer on Fiverr or Upwork (usually $20-50 for a set)
3. Use the automated tools listed above
4. Contact the developer who built this website

---

## 🚀 AFTER ADDING IMAGES

1. **Test the website locally**:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 and verify images load

2. **Rebuild and deploy**:
   ```bash
   npm run build
   npm start
   ```

3. **Verify on deployed site**:
   - Share on social media to test OG images
   - Check favicon in browser tab
   - Test on mobile devices

---

**Last Updated**: November 2025
**Status**: Images need to be created and added to public folder
