# How to Add Photos to the Gallery

This guide shows you how to easily add more photos to the memorial website gallery.

---

## Quick Steps

### 1. Add Your Photo Files

Place your photos in the `/public/images/` folder:

```
public/
  images/
    wedding/         (existing - 3 photos already here)
    childhood/       (create this folder for childhood photos)
    family/          (create this folder for family photos)
    professional/    (create this folder for work/conference photos)
```

**Example:**
- Copy `joelle-child-1.jpg` to `public/images/childhood/`
- Copy `fire-conference.jpg` to `public/images/professional/`

---

### 2. Edit PhotoGalleryEnhanced.tsx

Open: `components/PhotoGalleryEnhanced.tsx`

Find the `photos` array (around line 24):

```typescript
const photos: Photo[] = [
  {
    src: '/images/wedding/IMG-20170819-WA0015.jpg',
    alt: 'Joëlle and Lionel wedding ceremony',
    width: 800,
    height: 600,
    title: language === 'fr' ? 'Cérémonie de Mariage' : 'Wedding Ceremony',
    description: language === 'fr'
      ? "Beau moment de la cérémonie de mariage de Joëlle et Lionel en juin 2017"
      : "Beautiful moment from Joëlle and Lionel's wedding ceremony in June 2017"
  },
  // Add more photos here...
];
```

---

### 3. Add New Photo Entry

**Copy this template** and paste it at the end of the array (before the closing `]`):

```typescript
{
  src: '/images/YOUR_FOLDER/YOUR_PHOTO.jpg',
  alt: 'Description for accessibility',
  width: 800,
  height: 600,
  title: language === 'fr' ? 'French Title' : 'English Title',
  description: language === 'fr'
    ? 'French description of the photo'
    : 'English description of the photo'
},
```

---

## Complete Example: Adding Childhood Photo

### Before (original 3 wedding photos):

```typescript
const photos: Photo[] = [
  {
    src: '/images/wedding/IMG-20170819-WA0015.jpg',
    alt: 'Joëlle and Lionel wedding ceremony',
    width: 800,
    height: 600,
    title: language === 'fr' ? 'Cérémonie de Mariage' : 'Wedding Ceremony',
    description: language === 'fr'
      ? "Beau moment de la cérémonie de mariage de Joëlle et Lionel en juin 2017"
      : "Beautiful moment from Joëlle and Lionel's wedding ceremony in June 2017"
  },
  // ... 2 more wedding photos
];
```

### After (added childhood photo):

```typescript
const photos: Photo[] = [
  {
    src: '/images/wedding/IMG-20170819-WA0015.jpg',
    alt: 'Joëlle and Lionel wedding ceremony',
    width: 800,
    height: 600,
    title: language === 'fr' ? 'Cérémonie de Mariage' : 'Wedding Ceremony',
    description: language === 'fr'
      ? "Beau moment de la cérémonie de mariage de Joëlle et Lionel en juin 2017"
      : "Beautiful moment from Joëlle and Lionel's wedding ceremony in June 2017"
  },
  // ... 2 more wedding photos

  // NEW PHOTO ADDED HERE:
  {
    src: '/images/childhood/joelle-child-1.jpg',
    alt: 'Young Joëlle in Bertoua',
    width: 800,
    height: 600,
    title: language === 'fr' ? 'Jeunesse à Bertoua' : 'Childhood in Bertoua',
    description: language === 'fr'
      ? 'Joëlle enfant à Bertoua, Cameroun, années 1990'
      : 'Young Joëlle in Bertoua, Cameroon, 1990s'
  },
];
```

**Don't forget the comma** after each photo entry except the last one!

---

## Real-World Examples

### Example 1: Professional/Conference Photo

```typescript
{
  src: '/images/professional/fire-conference-2020.jpg',
  alt: 'Joëlle interpreting at Fire Conference',
  width: 800,
  height: 600,
  title: language === 'fr' ? 'Fire Conference Limbe' : 'Fire Conference Limbe',
  description: language === 'fr'
    ? 'Joëlle en train d\'interpréter lors de la Fire Conference à Limbe'
    : 'Joëlle interpreting at the Fire Conference in Limbe'
},
```

### Example 2: Family Photo

```typescript
{
  src: '/images/family/joelle-with-daughters.jpg',
  alt: 'Joëlle with Kelilah and Daniela',
  width: 800,
  height: 600,
  title: language === 'fr' ? 'Maman et Filles' : 'Mother and Daughters',
  description: language === 'fr'
    ? 'Joëlle avec ses filles Kelilah et Daniela'
    : 'Joëlle with her daughters Kelilah and Daniela'
},
```

### Example 3: University Days

```typescript
{
  src: '/images/education/university-buea-graduation.jpg',
  alt: 'Joëlle graduation from University of Buea',
  width: 800,
  height: 600,
  title: language === 'fr' ? 'Remise de Diplôme' : 'Graduation Day',
  description: language === 'fr'
    ? 'Remise de diplôme de maîtrise à l\'Université de Buea'
    : 'Master\'s degree graduation at University of Buea'
},
```

---

## Tips for Good Photos

### File Names
- ✅ Good: `joelle-childhood-1990.jpg`, `wedding-ceremony-2017.jpg`
- ❌ Avoid: `IMG_12345.jpg`, `photo (1).jpg`, `image copy.jpg`

### File Size
- **Recommended**: 500KB - 2MB per photo
- **Maximum**: 5MB per photo
- Use JPG format for photos (smaller file size)
- Use PNG only if you need transparency

### Image Dimensions
- **Minimum**: 800x600 pixels
- **Recommended**: 1200x900 pixels or higher
- **Maximum**: 4000x3000 pixels (larger = slower loading)

### Quality
- Use clear, well-lit photos
- Avoid blurry or very dark images
- Landscape (horizontal) or portrait (vertical) both work

---

## Organizing Photos by Category

Create folders for different life stages:

```
public/images/
  ├── childhood/          # 1983-2000s
  │   ├── bertoua-1990.jpg
  │   └── bamenda-1995.jpg
  │
  ├── education/          # School & University
  │   ├── lycee-buea.jpg
  │   └── asti-graduation.jpg
  │
  ├── professional/       # Work & Conferences
  │   ├── fire-conference-2020.jpg
  │   ├── king-interpreters-team.jpg
  │   └── world-bank-event.jpg
  │
  ├── wedding/            # Marriage 2017 (already has 3 photos)
  │   ├── IMG-20170819-WA0015.jpg
  │   ├── IMG_1751.JPG
  │   └── IMG_1914.JPG
  │
  └── family/             # With daughters & family
      ├── with-kelilah-2017.jpg
      ├── with-daniela-2021.jpg
      └── family-gathering.jpg
```

---

## Changing Photo Order

The photos appear in the order you list them in the array.

**To reorder**, simply move the photo entries up or down:

```typescript
const photos: Photo[] = [
  // This photo will appear FIRST
  {
    src: '/images/childhood/young-joelle.jpg',
    // ...
  },

  // This photo will appear SECOND
  {
    src: '/images/wedding/ceremony.jpg',
    // ...
  },

  // This photo will appear THIRD
  {
    src: '/images/family/with-daughters.jpg',
    // ...
  },
];
```

---

## Removing Photos

To remove a photo, simply **delete its entire entry** from the array:

**Before:**
```typescript
const photos: Photo[] = [
  {
    src: '/images/wedding/photo1.jpg',
    // ...
  },
  {
    src: '/images/wedding/photo2.jpg',  // ← Remove this one
    // ...
  },
  {
    src: '/images/wedding/photo3.jpg',
    // ...
  },
];
```

**After:**
```typescript
const photos: Photo[] = [
  {
    src: '/images/wedding/photo1.jpg',
    // ...
  },
  // Photo 2 removed
  {
    src: '/images/wedding/photo3.jpg',
    // ...
  },
];
```

**Don't forget** to check the commas - the last entry should NOT have a comma after it.

---

## Testing Your Changes

After adding photos:

1. **Save the file** (`components/PhotoGalleryEnhanced.tsx`)
2. **The page auto-refreshes** (if dev server is running)
3. **Check the gallery** - your new photos should appear
4. **Click each photo** to test the lightbox
5. **Toggle language** (EN ↔ FR) to verify bilingual text

---

## Common Mistakes & Fixes

### ❌ Photo doesn't show

**Problem**: File path is wrong
```typescript
src: '/images/wedding/photo.jpg',  // ❌ Wrong - file doesn't exist
```

**Fix**: Make sure the file actually exists in that location
```typescript
src: '/images/wedding/IMG_1751.JPG',  // ✅ Correct - file exists
```

### ❌ Syntax error

**Problem**: Missing comma
```typescript
{
  src: '/images/photo1.jpg',
  title: 'Photo 1'
}  // ❌ Missing comma here
{
  src: '/images/photo2.jpg',
  title: 'Photo 2'
}
```

**Fix**: Add comma between entries
```typescript
{
  src: '/images/photo1.jpg',
  title: 'Photo 1'
},  // ✅ Comma added
{
  src: '/images/photo2.jpg',
  title: 'Photo 2'
}
```

### ❌ Gallery shows broken image icon

**Problem 1**: Wrong file extension
```typescript
src: '/images/wedding/IMG_1751.jpg',  // ❌ Actual file is .JPG (uppercase)
```

**Fix**: Match the exact file extension
```typescript
src: '/images/wedding/IMG_1751.JPG',  // ✅ Matches actual file
```

**Problem 2**: File is in wrong folder
```typescript
src: '/images/wedding/photo.jpg',  // ❌ But photo is actually in /images/family/
```

**Fix**: Use correct path
```typescript
src: '/images/family/photo.jpg',  // ✅ Correct folder
```

---

## Need Help?

- **Check the existing wedding photos** in the array as reference
- **Copy-paste the template** and just change the values
- **Test after each photo** you add to catch errors early
- **Remember**: English on left of `?`, French on right of `:`

---

## Quick Reference Template

Copy this every time you add a photo:

```typescript
{
  src: '/images/FOLDER/FILENAME.jpg',
  alt: 'Describe what's in the photo',
  width: 800,
  height: 600,
  title: language === 'fr' ? 'Titre Français' : 'English Title',
  description: language === 'fr'
    ? 'Description en français de la photo'
    : 'English description of the photo'
},
```

**Change:**
- `FOLDER` - childhood, wedding, family, professional, education
- `FILENAME.jpg` - actual file name
- `alt` - accessibility description
- `'Titre Français'` - French title
- `'English Title'` - English title
- `'Description en français...'` - French description
- `'English description...'` - English description

That's it! You're ready to add photos to the gallery! 🎉
